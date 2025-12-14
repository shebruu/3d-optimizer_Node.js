const Prediction = require("../models");


const findAll = () => {
    return Prediction.findAll();
};

const findById = (id) => {
    return Prediction.findByPk(id);
};

async function create(predictionData) {
    return Prediction.create(predictionData);
}

const update = (currentPrediction, predictionData) => {
    currentPrediction.piece_id =
        predictionData.piece_id ?? currentPrediction.piece_id;
    currentPrediction.model_name =
        predictionData.model_name ?? currentPrediction.model_name;
    currentPrediction.prediction_value =
        predictionData.prediction_value ?? currentPrediction.prediction_value;
    currentPrediction.prediction_label =
        predictionData.prediction_label ?? currentPrediction.prediction_label;

    return currentPrediction.save();
};


const remove = (currentPrediction) => {
    return currentPrediction.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
