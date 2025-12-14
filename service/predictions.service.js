const serviceCallResult = require("../responses/serviceCallResult");
const predictionRepository = require("../repository/predictions");



async function findAll(filters = {}) {
    const { model_name } = filters;
    const where = {};
    if (model_name !== undefined) {
        where.model_name = model_name;
    }
    const result = await predictionRepository.findAll(where);
    return serviceCallResult.ok(result);
}


async function findOneById(id) {
    const prediction = await predictionRepository.findById(id);
    if (!prediction) return serviceCallResult.notFound(`prediction with id #${id} not found`);
    return serviceCallResult.ok(prediction);
}

async function create(prediction = {}) {

    const created = await predictionRepository.create(prediction);
    return serviceCallResult.created(created);
}

async function update(id, newPrediction = {}) {
    const prediction = await predictionRepository.findById(id);
    if (!prediction) {
        return serviceCallResult.notFound(`prediction with id #${id} not found`);
    }
    await predictionRepository.update(prediction, newPrediction);
    return serviceCallResult.noContent();
}
async function remove(id) {
    const prediction = await predictionRepository.findById(id);
    if (!prediction) return serviceCallResult.notFound(`prediction with id #${id} not found`);
    await predictionRepository.remove(prediction);
    return serviceCallResult.noContent();
}


/**
 * Appel du modèle ML pour prédiction de la résine
 * @param {object} features { volume, surface_area, bbox_x, bbox_y, bbox_z, scale, euler_number }
 */
async function predictResine(features = {}) {

    try {

        const {
            volume,
            surface_area,
            bbox_x,
            bbox_y,
            bbox_z,
            scale,
            euler_number,
        } = features;

        // payload pour Flask
        const v = Number(volume) || 0;
        const s = Number(surface_area) || 0;
        const x = Number(bbox_x) || 0;
        const y = Number(bbox_y) || 0;
        const z = Number(bbox_z) || 0;
        const sc = Number(scale) || 1;
        const e = Number(euler_number) || 0;

        const payload = {
            volume: v,
            surface_area: s,
            bbox_x: x,
            bbox_y: y,
            bbox_z: z,
            scale: sc,
            surface_volume_ratio: v > 0 ? s / v : 0,
            bbox_volume_ratio: v > 0 ? v / (x * y * z || 1e-6) : 0,
            euler_number: e,
        };
        console.log("Features envoyées à Flask /predict :", payload);

        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            return serviceCallResult.badRequest(
                data.error || "Erreur lors de l'appel au modèle Flask"
            );
        }

        // data = { prediction, density }
        return serviceCallResult.ok(data);
    } catch (err) {
        return serviceCallResult.badRequest(
            err.message || "Erreur réseau vers le modèle Flask"
        );
    }
}



module.exports = {
    findAll,
    findOneById,
    create,
    update,
    remove,
    predictResine
};