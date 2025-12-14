
const fs = require('fs');
const csv = require('csv-parser');
const { models, sequelize } = require('../models');
const path = './data/3d_print_miniatures_data.csv';

function toNumberOrNull(value, fieldName = '') {
    if (value === undefined || value === null) return null;
    const trimmed = String(value).trim();
    if (trimmed === '') return null;
    const n = Number(trimmed.replace(',', '.'));
    if (Number.isNaN(n)) {
        return null;
    }
    return n;
}

async function importPiecesFromCsv(path, t) {
    const rows = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (r) => {
                rows.push({
                    volume: toNumberOrNull(r.volume, 'volume'),
                    surface_area: toNumberOrNull(r.surface_area, 'surface_area'),
                    bbox_x: toNumberOrNull(r.bbox_x, 'bbox_x'),
                    bbox_y: toNumberOrNull(r.bbox_y, 'bbox_y'),
                    bbox_z: toNumberOrNull(r.bbox_z, 'bbox_z'),
                    mass: toNumberOrNull(r.mass, 'mass'),
                    density: toNumberOrNull(r.density_real, 'density_real'),
                    surface_volume_ratio: toNumberOrNull(r.surface_volume_ratio, 'surface_volume_ratio'),
                    bbox_volume_ratio: toNumberOrNull(r.bbox_volume_ratio, 'bbox_volume_ratio'),
                    scale: toNumberOrNull(r.scale, 'scale'),
                    euler_number: toNumberOrNull(r.euler_number, 'euler_number'),
                    stl_filename: null,
                });
            })
            .on('end', resolve)
            .on('error', reject);
    });



    await models.pieces.bulkCreate(rows, {
        validate: false,
        transaction: t,
    });
}

(async () => {
    try {

        await sequelize.authenticate();

        await sequelize.transaction(async (t) => {
            await importPiecesFromCsv(path, t);
        });


    } catch (err) {
        console.error('Erreur import :', err);
    }



    process.exit(0);
})();
