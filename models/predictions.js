const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('predictions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    piece_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pieces',
        key: 'id'
      }
    },
    model_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prediction_value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    prediction_label: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'predictions',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "predictions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
