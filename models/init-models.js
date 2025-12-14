var DataTypes = require("sequelize").DataTypes;


var _clusters = require("./clusters");
var _pieces = require("./pieces");
var _predictions = require("./predictions");

function initModels(sequelize) {
  var clusters = _clusters(sequelize, DataTypes);
  var pieces = _pieces(sequelize, DataTypes);
  var predictions = _predictions(sequelize, DataTypes);

  clusters.belongsTo(pieces, { as: "piece", foreignKey: "piece_id" });
  pieces.hasMany(clusters, { as: "clusters", foreignKey: "piece_id" });
  predictions.belongsTo(pieces, { as: "piece", foreignKey: "piece_id" });
  pieces.hasMany(predictions, { as: "predictions", foreignKey: "piece_id" });

  return {
    clusters,
    pieces,
    predictions,
  };
}


module.exports = initModels;
