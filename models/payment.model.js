const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contract.model");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
    },
    payment_date: {
      type: DataTypes.STRING(15),
    },
    payment_status: {
      type: DataTypes.STRING(30),
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
    },
    status: {
      type: DataTypes.STRING(30),
    },
  },
  {
    freezeTableName: true,
  }
);

Payment.belongsTo(Contract, { foreignKey: "contract_id" });

module.exports = Payment;
