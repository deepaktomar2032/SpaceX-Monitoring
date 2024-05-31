const statusCode = require("./../utils/status-code.js");
const message = require("./../utils/locale.js");
const LogErrorMessage = require("./../utils/error-handler.js");

const requestParams = {
    headers: {
        Accept: "application/json",
        method: "GET",
    },
};

const getMonitoringData = async (req, res) => {
    let spaceData;
    const url = "https://api.spacexdata.com/v5/launches/";
    try {
        spaceData = await fetch(url, requestParams);
        const spaceDataParsed = await spaceData.json();
        return res.status(statusCode.successful_request).send({ successful: false, Message: message.Fetched_successfully, spaceDataParsed });
    } catch (error) {
        console.log(LogErrorMessage(error));
        return res.status(statusCode.internal_server_error).send({ successful: false, Message: message.Something_went_wrong });
    }
};

module.exports = getMonitoringData;
