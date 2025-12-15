

const { Router } = require('express');
const router = Router();
const predictionController = require('../controller/prediction.controller');


router.post("/ml", predictionController.predictResine);


module.exports = router
