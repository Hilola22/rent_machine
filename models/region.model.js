const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Region = sequelize.define(
  "region",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


module.exports = Region;
