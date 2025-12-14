const { cluster } = require("../models");

const findAll = () => {
    return cluster.findAll();
};

const findById = (id) => {
    return cluster.findByPk(id);
};

const create = (data) => {
    return cluster.create(data);
};

const update = (currentCluster, clusterData) => {
    currentCluster.piece_id = clusterData.piece_id ?? currentCluster.piece_id;
    currentCluster.cluster_label = clusterData.cluster_label ?? currentCluster.cluster_label;
    return currentCluster.save();
};


const remove = (currentCluster) => {
    return currentCluster.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
