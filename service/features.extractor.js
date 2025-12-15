
const path = require('path');
const { spawnSync } = require('child_process');

/**
 * Extraction des features STL via un script Python (trimesh recommandé)
 * @param {string} stlPath - Chemin du fichier STL
 * @returns {object} - Features extraites (volume, surface_area, bbox_x, bbox_y, bbox_z, euler_number)
 */
function extractStlFeatures(stlPath) {
    const fs = require('fs');
    const script = path.join(__dirname, './scripts/extract_stl_features.py');
    const absStlPath = path.isAbsolute(stlPath) ? stlPath : path.resolve(__dirname, '..', stlPath);
    if (!fs.existsSync(absStlPath)) {
        throw new Error(`Le fichier STL n'existe pas : ${absStlPath}`);
    }
    const result = spawnSync('python', [script, absStlPath], { encoding: 'utf-8' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(result.stderr || 'Erreur lors de l\'extraction STL');
    return JSON.parse(result.stdout);
}




/**
 * Calcul des features dérivées
 * @param {object} piece - Objet contenant les features de base
 * @returns {object} - Objet enrichi avec density, ratios, etc.
 */
function computeDerivedFeatures(piece) {
    const result = { ...piece };
    // Density
    if (piece.mass && piece.volume) {
        result.density = piece.mass / (piece.volume || 1e-6);
    }
    // Surface/Volume ratio
    if (piece.surface_area && piece.volume) {
        result.surface_volume_ratio = piece.surface_area / (piece.volume || 1e-6);
    }
    // Bounding box volume ratio
    if (piece.bbox_x && piece.bbox_y && piece.bbox_z && piece.volume) {
        const bboxVolume = piece.bbox_x * piece.bbox_y * piece.bbox_z;
        result.bbox_volume_ratio = piece.volume / (bboxVolume || 1e-6);
    }
    return result;
}

module.exports = {
    extractStlFeatures,
    computeDerivedFeatures,
};
