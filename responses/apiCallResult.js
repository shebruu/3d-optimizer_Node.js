const statusToHttp = require("../utils/statusToHttpCode");

//Result => {ok, status, data?, error?}
module.exports = (res, result) => {
    const httpCode = statusToHttp(result.status);
    switch (httpCode) {
        case 201:
        case 204:
            return res.status(httpCode).end();
        default:
            return res
                .status(httpCode)
                .json({ data: result.data, error: result.error });
    }
};
