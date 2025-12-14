const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clusters', {
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
    cluster_label: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clusters',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "clusters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
