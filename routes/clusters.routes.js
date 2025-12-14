

const { Router } = require('express');
const router = Router();
const clusterController = require('../controller/cluster.controller');


router.get('/', clusterController.findAll);
router.get('/:id', clusterController.findOne);
router.post('/', clusterController.create);
router.put('/:id', clusterController.update);
router.delete('/:id', clusterController.remove);

module.exports = router
