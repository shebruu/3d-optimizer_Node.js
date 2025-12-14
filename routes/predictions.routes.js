

const { Router } = require('express');
const router = Router();
const predictionController = require('../controller/prediction.controller');


router.post("/ml", predictionController.predictResine);

// router.get('/', predictionController.findAll);
// router.get('/:id', predictionController.findOne);
// router.post('/', predictionController.create);
// router.put('/:id', predictionController.update);
// router.delete('/:id', predictionController.remove);

module.exports = router
