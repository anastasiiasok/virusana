require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const Item = require('../models/item-model');

const salt = process.env.saltRounds || 10;


const serializeUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
};

const renderRegister = (req, res) => {
  res.render('register')
};

const renderLogin = (req, res) => {
  res.render('login')
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (email && name && password) {
    try {

      const hashPassword = await bcrypt.hash(password, Number(salt))
      // console.log('hashPassword: ', hashPassword);

      const newUser = new User({
        email,
        name,
        password: hashPassword
      });

      await newUser.save();

      req.session.user = serializeUser(newUser)

      res.redirect('/')

    } catch (e) {
      console.log(e)
      res.render('register', { error: 'Email is already exists. Please login!' })
    }

  } else {
    res.render('register', { error: 'Email, name and password cannot be blank!' })
  }
};


const login = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      const user = await User.findOne({ email }).lean()
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
          req.session.user = serializeUser(user)
          res.redirect('/')
        } else {
          res.render('login', { error: 'Email or Password is incorrect!' })
        }
      } else {
        res.render('login', { error: 'User does not exist. Please register!' })
        // res.redirect(401, '/users/login')
      }

    } catch (e) {
      res.redirect('/users/login')
    }

  } else {
    res.render('login', { error: 'Email and password cannot be blank!' })
  }
};

    const logout = (req, res) => {
    req.session.destroy(function (err) {
    if (err) throw new Error(err)
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  })
};

    const renderAccount = async (req, res) => {
  let user = await  User.findById(req.session.user.id).populate('items').lean();
  let items = user.items
  // console.log(items);
  res.render('account', {items})
    };

    const renderAdd = (req, res) => {
  res.render('add')
    };

    const add = async (req, res) => {
    const { title, condition, startDate, endDate, description } = req.body;
     const newItem = await new Item({
      title,
      condition,
      startDate,
      endDate,
      description
    });

    let user = await User.findById(req.session.user.id)
    // user.items.push(newItem.id)
    user.items.push(newItem)

    await user.save();
    await newItem.save();
    // console.log('user', user);
    // console.log('newItem', newItem);
    res.redirect('/users/account')
    };

    const renderEdit = async (req, res) => {
      let item = await Item.findById(req.params.id)
       console.log('item renderEdit', item);
      res.render('edit', {item})

    };

    const edit = async (req, res) => {
      let item = await Item.findById(req.params.id);
      console.log(req.params.id);
      console.log('item', item);
      // const { title, condition, startDate, endDate, description } = req.body;
      item.title = req.body.title;
      item.condition = req.body.condition;
      item.startDate = req.body.startDate;
      item.endDate = req.body.endDate;
      item.description = req.body.description;

     await item.save();
    //  console.log('item', item);
      // res.redirect(`/users/${item._id}`)
      res.redirect('/users/account')
    };

    const toDelete = async (req, res) => {
      await Item.deleteOne({ _id: req.params.id})
      res.redirect('/users/account')
    };

    const show = async (req, res) => {
      let item = await Item.findById(req.params.id);
      res.render('show', {item})
    };


module.exports = {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
  renderAccount,
  renderAdd,
  add,
  renderEdit,
  edit,
  toDelete,
  show
}
