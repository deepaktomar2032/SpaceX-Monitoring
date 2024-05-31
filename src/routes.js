const getMonitoringData = require("./controller/fetchData.controller.js");

const routes = (router) => {
    router.get("/api/data", getMonitoringData);
};

module.exports = routes;
