
const serviceCallResult = require("../responses/serviceCallResult");
const clusterRepository = require("../repository/clusters");

async function findAll(filters = {}) {
    const { cluster_label } = filters;
    const where = {};
    if (cluster_label !== undefined) {
        where.cluster_label = cluster_label;
    }
    const result = await clusterRepository.findAll(where);
    return serviceCallResult.ok(result);
}

async function findOneById(id) {
    const cluster = await clusterRepository.findById(id);
    if (!cluster) return serviceCallResult.notFound(`cluster with id #${id} not found`);
    return serviceCallResult.ok(cluster);
}

async function create(cluster = {}) {

    await clusterRepository.create(cluster);
    return serviceCallResult.created();
}
async function update(id, newCluster = {}) {
    const cluster = await clusterRepository.findById(id);
    if (!cluster) return serviceCallResult.notFound(`cluster with id #${id} not found`);
    await clusterRepository.update(cluster, newCluster);
    return serviceCallResult.noContent();
}

async function remove(id) {
    const cluster = await clusterRepository.findById(id);
    if (!cluster) return serviceCallResult.notFound(`cluster with id #${id} not found`);
    await clusterRepository.remove(cluster);
    return serviceCallResult.noContent();
}

module.exports = {
    findAll,
    findOneById,
    create,
    update,
    remove,
};
