require('url').URL
const express = require('express');
const fetch = require('node-fetch');
const renderDashboard= async (req, res) => {

const myKey = "5cf9dfd5-3449-485e-b5ae-70a60e997864";
           

const url = `https://api.covid19api.com/summary`


const covidDb = await fetch(url);

const covid = await covidDb.json();

// if (covid.Countries[0].TotalConfirmed > 4500){
//     console.log(covid.Countries[0].Country);
// }

// console.log(covid.Countries[0].Country);


return res.render('dashboard', {covid});

}

const renderBycountry = async (req, res) => {
    const { country } = req.body;
    const myKey = "5cf9dfd5-3449-485e-b5ae-70a60e997864";
  
    
    const url = `https://api.covid19api.com/dayone/country/${country}`;
    
    
    const response = await fetch(url);
    
    const result = await response.json();
    
    const lastIndex = result.length-1

    const total = result[lastIndex].Confirmed
      
    // console.log(result[lastIndex].Confirmed);
    
    return res.render('dashboard', {total});
    } 
    


module.exports = { renderDashboard, renderBycountry };




