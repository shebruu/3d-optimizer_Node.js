const { piece } = require("../models");


const findAll = (where = {}) => {
    if (Object.keys(where).length === 0) {
        return piece.findAll();
    } else {
        return piece.findAll({ where });
    }
};


const findById = (id) => {
    return piece.findByPk(id);
};


const create = (pieceData) => {
    return piece.create(pieceData);
};


const update = (currentPiece, pieceData) => {
    currentPiece.volume = pieceData.volume ?? currentPiece.volume;
    currentPiece.surface_area = pieceData.surface_area ?? currentPiece.surface_area;
    currentPiece.bbox_x = pieceData.bbox_x ?? currentPiece.bbox_x;
    currentPiece.bbox_y = pieceData.bbox_y ?? currentPiece.bbox_y;
    currentPiece.bbox_z = pieceData.bbox_z ?? currentPiece.bbox_z;
    currentPiece.mass = pieceData.mass ?? currentPiece.mass;
    currentPiece.density = pieceData.density ?? currentPiece.density;
    currentPiece.surface_volume_ratio = pieceData.surface_volume_ratio ?? currentPiece.surface_volume_ratio;
    currentPiece.bbox_volume_ratio = pieceData.bbox_volume_ratio ?? currentPiece.bbox_volume_ratio;
    currentPiece.scale = pieceData.scale ?? currentPiece.scale;
    currentPiece.euler_number = pieceData.euler_number ?? currentPiece.euler_number;
    currentPiece.stl_filename = pieceData.stl_filename ?? currentPiece.stl_filename;
    return currentPiece.save();
};

const remove = (currentPiece) => {
    return currentPiece.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
