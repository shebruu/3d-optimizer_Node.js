
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

const pieceController = require('../controller/piece.controller');
const { createPiece } = require('../service/pieces.service');


router.post('/upload-stl', upload.single('stl'), pieceController.uploadStl);


// CRUD 
router.get('/', pieceController.findAll);
router.get('/:id', pieceController.findOne);
router.post('/', pieceController.create);
router.put('/:id', pieceController.update);
router.delete('/:id', pieceController.remove);

module.exports = router;
