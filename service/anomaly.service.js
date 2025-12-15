const serviceCallResult = require("../responses/serviceCallResult");
const { computeDerivedFeatures } = require("./features.extractor");

const URL = process.env.URL || "http://localhost:5000";

async function detectAnomalyFromFeatures(input = {}) {
    try {
        const piece = computeDerivedFeatures(input);
        const mass = Number(input.mass) || 0;
        const volume = piece.volume || 0;

        const density_real =
            piece.density_real ??
            (volume > 0 ? mass / volume : 0);

        const payload = {
            euler_number: piece.euler_number,
            volume: piece.volume,
            surface_area: piece.surface_area,
            surface_volume_ratio: piece.surface_volume_ratio,
            bbox_volume_ratio: piece.bbox_volume_ratio,
            density_real,
        };


        console.log("Features envoyées à Flask /predict_anomaly :", payload);

        const response = await fetch(`${URL}/predict_anomaly`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            return serviceCallResult.badRequest(
                data.error || "Erreur lors de l'appel au modèle "
            );
        }

        const is_anomaly = data.anomalie === 1;

        return serviceCallResult.ok({
            is_anomaly,
            score: data.score ?? null,
        });
    } catch (err) {
        return serviceCallResult.badRequest(
            err.message || "Erreur réseau vers le modèle"
        );
    }
}

// provisoire:
// const is_anomaly = false;
// const score = 0.12;



module.exports = {
    detectAnomalyFromFeatures,
};
