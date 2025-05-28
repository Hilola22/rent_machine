const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// const Machine = require("./machine.model");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    uploaded_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Machine.hasMany(Image);
// Image.belongsTo(Machine);

module.exports = Image;
