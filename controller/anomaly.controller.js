const anomalyService = require("../service/anomaly.service");
const apiCallResult = require("../responses/apiCallResult");

async function detect(req, res) {
    console.log("body =", req.body);
    const result = await anomalyService.detectAnomalyFromFeatures(req.body);
    return apiCallResult(res, result);
}

module.exports = { detect };
