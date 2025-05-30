const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Machine = require("./machine.model");
const Status = require("./status.model");
const User = require("./user.model");
const Commission = require("./commision.model");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(20),
    },
    start_time: {
      type: DataTypes.STRING(20),
    },
    end_time: {
      type: DataTypes.STRING(20),
    },
    total_time: {
      type: DataTypes.STRING(20),
    },
  },
  {
    freezeTableName: true,
  }
);

Machine.hasMany(Contract);
Contract.belongsTo(Machine);

Status.hasMany(Contract);
Contract.belongsTo(Status);

User.hasMany(Contract);
Contract.belongsTo(User);

Contract.belongsTo(Commission);

module.exports = Contract;
