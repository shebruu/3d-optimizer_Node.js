const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pieces', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    volume: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    surface_area: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bbox_x: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bbox_y: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bbox_z: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mass: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    density: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    surface_volume_ratio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    bbox_volume_ratio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    scale: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    euler_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stl_filename: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pieces',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pieces_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
