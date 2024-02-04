// middleware.js
const express = require('express');
const path = require('path');

const setupMiddleware = (app) => {
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.urlencoded({ extended: true }));
};

module.exports = setupMiddleware;
