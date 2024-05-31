require("dotenv").config();
const express = require("express");
const routes = require("./routes.js");
const LogErrorMessage = require("./utils/error-handler.js");

const app = express();
const Port = process.env.Port || 8000;

const listenPort = (Port) => {
    app.listen(Port, () => console.log(`Server is up & running on http://localhost:${Port}`));
};

const createRoutes = () => {
    routes(app);
};

const start = async () => {
    try {
        if (process.env.NODE_ENV !== "test") {
            listenPort(Number(Port));
        }
        createRoutes();
        app.use(express.static("public"));
    } catch (error) {
        console.log(LogErrorMessage(error));
    }
};

module.exports = { start, app };
