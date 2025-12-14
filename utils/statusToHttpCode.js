const serviceStatus = require('./serviceStatus.enum');
module.exports = (status) => {
  switch(status){
    case serviceStatus.OK: return 200;
    case serviceStatus.CREATED: return 201;
    case serviceStatus.NOCONTENT: return 204;
    case serviceStatus.BADREQUEST: return 400;
    case serviceStatus.NOTFOUND: return 404;
    default: return 500;
  }
}