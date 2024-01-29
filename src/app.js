const express = require("express");
const app = express();
const errorHandler = require("../lib/middleware/error-handler");
const getMonitoringData = require("./dataController");

app.get('/getData', (req, res) => {
    return getMonitoringData(req, res);
});

app.use(errorHandler());

module.exports = app;