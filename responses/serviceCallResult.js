const ServiceStatus = require("../utils/serviceStatus.enum")

const notFound = (error) => {
  return { ok: false, status: ServiceStatus.NOTFOUND, error };
};

const ok = (data) => {
  return { ok: true, status: ServiceStatus.OK, data };
};

const noContent = () => {
  return { ok: true, status: ServiceStatus.NOCONTENT };
};

const created = (data) => {
  return { ok: true, status: ServiceStatus.CREATED, data };
};

const badRequest = (error) => {
  return { ok: false, status: ServiceStatus.BADREQUEST, error };
};

module.exports = {
  notFound,
  ok,
  noContent,
  created,
  badRequest,
};
