const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("../models/category.model");
const User = require("./user.model");
const Region = require("./region.model");
const District = require("./district.model");
const Image = require("./image.model");

const Machine = sequelize.define(
  "machine",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(15, 2),
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
    },
    min_hour: {
      type: DataTypes.STRING(20),
    },
    min_price: {
      type: DataTypes.DECIMAL(15, 2),
    },
  },
  {
    freezeTableName: true,
    createdAt: true,
  }
);

Category.hasMany(Machine)
Machine.belongsTo(Category)

User.hasMany(Machine)
Machine.belongsTo(User)

Region.hasMany(Machine)
Machine.belongsTo(Region)

District.hasMany(Machine)
Machine.belongsTo(District)

Machine.hasMany(Image)
Image.belongsTo(Machine)

module.exports = Machine;
