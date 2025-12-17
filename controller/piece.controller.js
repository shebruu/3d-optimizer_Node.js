const piecesService = require("../service/pieces.service");
const apiCallResult = require("../responses/apiCallResult");
const serviceCallResult = require("../responses/serviceCallResult");

const findAll = async (req, res) => {

  const pieces = await piecesService.findAll(req.query);
  apiCallResult(res, pieces);
};


const findOne = async (req, res) => {
  const foundPiece = await piecesService.findOneById(req.params.id);
  apiCallResult(res, piece);
};

const create = async (req, res) => {
  const newPiece = await piecesService.create(req.body);
  return apiCallResult(res, newPiece);
};

const update = async (req, res) => {
  const updatedPiece = await piecesService.update(req.params.id, req.body);
  return apiCallResult(res, updatedPiece);
};


const remove = async (req, res) => {

  const result = await piecesService.remove(req.params.id);
  return apiCallResult(res, result);
};


const uploadStl = async (req, res) => {
  try {
    console.log("req.file =", req.file);
    console.log("req.body =", req.body);

    if (!req.file) {
      const result = serviceCallResult.badRequest("Aucun fichier STL fourni.");
      return apiCallResult(res, result);
    }
    const stl_filename = req.file.filename;
    const stlPath = req.file.path;

    const params = { ...req.body, stl_filename, stlPath };

    const result = await piecesService.extractFromStl(params);

    return apiCallResult(res, result);
  } catch (err) {
    console.error("Erreur uploadStl :", err);
    const result = serviceCallResult.badRequest(
      err.message || "Erreur lors de l'extraction STL"
    );
    return apiCallResult(res, result);
  }
};
module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  uploadStl
};