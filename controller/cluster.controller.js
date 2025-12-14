const clusterService = require("../service/clusters.service");
const apiCallResult = require("../responses/apiCallResult");

const findAll = async (req, res) => {

    const clusters = await clusterService.findAll(req.query);
    apiCallResult(res, clusters);
};

const findOne = async (req, res) => {
    const foundCluster = await clusterService.findOneById(req.params.id);
    a
};

const create = async (req, res) => {
    const newCluster = await clusterService.create(req.body);
    return apiCallResult(res, newCluster);
};

const update = async (req, res) => {
    const updatedCluster = await clusterService.update(req.params.id, req.body);
    return apiCallResult(res, updatedCluster);
};


const remove = async (req, res) => {

    const result = await clusterService.remove(req.params.id);
    return apiCallResult(res, result);
};
module.exports = {
    findAll,
    findOne,
    create,
    update,
    remove,
};