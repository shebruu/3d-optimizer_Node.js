const predictionService = require("../service/predictions.service");
const apiCallResult = require("../responses/apiCallResult");
// const serviceCallResult = require("../responses/serviceCallResult");

const findAll = async (req, res) => {

    const predictions = await predictionService.findAll(req.query);
    return apiCallResult(res, predictions);
};

const findOne = async (req, res) => {
    const prediction = await predictionService.findOneById(req.params.id);
    return apiCallResult(res, prediction);
};

const create = async (req, res) => {
    const newPrediction = await predictionService.create(req.body);
    return apiCallResult(res, newPrediction);
};

const update = async (req, res) => {
    const updatedPrediction = await predictionService.update(req.params.id, req.body);
    return apiCallResult(res, updatedPrediction);
};


const remove = async (req, res) => {

    const result = await predictionService.remove(req.params.id);
    return apiCallResult(res, result);
};

// Handler 
const predictResine = async (req, res) => {
    const result = await predictionService.predictResine(req.body);
    return apiCallResult(res, result);
};
module.exports = {
    findAll,
    findOne,
    create,
    update,
    remove,
    predictResine
};