const serviceCallResult = require("../responses/serviceCallResult");
const pieceRepository = require("../repository/pieces");
const { extractStlFeatures, computeDerivedFeatures } = require('./features.extractor');

const { models } = require("../models");
const Piece = models.pieces;
const Cluster = models.clusters;

async function findAll(filters = {}) {
    const { cluster, limit = 100, offset = 0 } = filters;

    const include = [
        {
            model: Cluster,
            as: "clusters",
            attributes: [],
            required: cluster !== undefined,
            where: cluster !== undefined ? { cluster_label: cluster } : undefined,
        },
    ];

    const result = await Piece.findAll({
        attributes: ["volume", "surface_area", "mass", "bbox_x", "bbox_y", "bbox_z"],
        include,
    });

    return serviceCallResult.ok(result);
}

async function findOneById(id) {
    const result = await Piece.findByPk(id, {
        attributes: ["volume", "surface_area", "mass", "bbox_x", "bbox_y", "bbox_z"],
        include: [
            {
                model: Cluster,
                as: "clusters",
                attributes: ["cluster_label"],
            },
        ],
    });

    return result
        ? serviceCallResult.ok(result)
        : serviceCallResult.notFound("Pièce introuvable");
}

async function extractFromStl(params = {}) {
    try {
        const { stl_filename, stlPath } = params;

        if (!stlPath) {
            return serviceCallResult.badRequest("Le chemin du fichier STL est requis");
        }

        let absStlPath = path.isAbsolute(stlPath)
            ? stlPath
            : path.resolve(__dirname, "..", stlPath);

        if (!fs.existsSync(absStlPath)) {
            return serviceCallResult.badRequest(
                `Le fichier STL n'existe pas : ${absStlPath}`
            );
        }


        if (!path.extname(absStlPath)) {
            const newPath = absStlPath + ".stl";
            fs.copyFileSync(absStlPath, newPath);
            absStlPath = newPath;
        }
        const stlFeatures = extractStlFeatures(absStlPath);
        const { stlPath: _, ...manualData } = params;
        const piece = { ...stlFeatures, ...manualData };

        const fullPiece = computeDerivedFeatures(piece);

        return serviceCallResult.ok(fullPiece);
    } catch (err) {
        return serviceCallResult.badRequest(
            err.message || "Erreur lors de l'extraction STL"
        );
    }
}


/**
 * Crée une pièce
 * @param {object} params - { stlPath, ...pieceData }
 * @returns {object} - serviceCallResult
 */
const fs = require('fs');
const path = require('path');

async function createPiece(params = {}) {

    const { mass, stl_filename, stlPath } = params;
    let error = "";
    if (!mass && !stl_filename) error = "La pièce doit avoir une masse et un nom de fichier STL";
    else if (!mass) error = "La pièce doit avoir une masse";
    else if (!stl_filename) error = "La pièce doit avoir un nom de fichier STL";
    if (error) return serviceCallResult.badRequest(error);

    if (stlPath) {
        if (path.extname(stlPath).toLowerCase() !== '.stl') {
            return serviceCallResult.badRequest('Le fichier doit être au format STL');
        }
        if (!fs.existsSync(stlPath)) {
            return serviceCallResult.badRequest('Le fichier STL n\'existe pas');
        }
    }

    try {
        let piece = { ...params };
        if (stlPath) {
            const path = require('path');
            const stlFilePath = path.join('uploads', params.stl_filename);
            const stlFeatures = extractStlFeatures(stlFilePath);

            const { stlPath, ...manualData } = params;
            piece = { ...stlFeatures, ...manualData };
        }
        // Calcul des features dérivées (density, ratios, etc.)
        const fullPiece = computeDerivedFeatures(piece);
        const created = await pieceRepository.create(fullPiece);
        return serviceCallResult.created(created);
    } catch (err) {
        return serviceCallResult.error(err.message || 'Erreur lors de la création de la pièce');
    }
}

async function update(id, newPiece = {}) {
    const piece = await pieceRepository.findById(id);
    if (!piece) return serviceCallResult.notFound(`piece with id #${id} not found`);
    await pieceRepository.update(piece, newPiece);
    return serviceCallResult.noContent();
}

async function remove(id) {
    const piece = await pieceRepository.findById(id);
    if (!piece) return serviceCallResult.notFound(`piece with id #${id} not found`);
    await pieceRepository.remove(piece);
    return serviceCallResult.noContent();
}

module.exports = {
    findAll,
    findOneById,
    createPiece,
    extractFromStl,
    update,
    remove,
};
