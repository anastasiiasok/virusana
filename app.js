require('dotenv').config()
const express = require('express');
const path = require('path');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const hbs = require('hbs');
const methodOverride = require('method-override');
const logger = require('morgan');


const app = express();


const indexRouter = require('./src/routes/index');
const dashboardRouter = require('./src/routes/dashboard');


const dbConnect = require('./src/config/dbConnect');

const PORT = process.env.PORT || 3000
dbConnect();

app.set('session cookie name', 'sid')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

const FileStore = sessionFileStore(session) 
app.use(session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: new FileStore({
    secret: process.env.SESSION_SECRET,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  },
}));


app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);



app.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})



