const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Region = require("./region.model");

const District = sequelize.define(
  "district",
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
Region.hasMany(District);
District.belongsTo(Region);

module.exports = District;
