const message = require("./locale.js");

const LogErrorMessage = (error) => {
    let errorMessage;

    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        errorMessage = message.Something_went_wrong;
    }
    return errorMessage;
};

module.exports = LogErrorMessage;
