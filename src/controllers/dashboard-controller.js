require('url').URL
const express = require('express');
const fetch = require('node-fetch');
const renderDashboard= async (req, res) => {

const myKey = "5cf9dfd5-3449-485e-b5ae-70a60e997864";
           

const url = `https://api.covid19api.com/summary`

const covidDb = await fetch(url);

const covid = await covidDb.json();

// console.log(covid.Global.NewConfirmed);


return res.render('dashboard', {covid});

}

module.exports = { renderDashboard };




