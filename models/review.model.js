const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model")
const Machine = require("./machine.model");

const Review = sequelize.define(
  "review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.STRING(400),
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Review)
Review.belongsTo(User)

Machine.hasMany(Review)
Review.belongsTo(Machine)

module.exports = Review;
