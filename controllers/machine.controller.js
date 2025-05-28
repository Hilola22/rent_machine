const { sendErrorResponse } = require("../helpers/send.error.response");
const Category = require("../models/category.model");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const User = require("../models/user.model");
const Image = require("../models/image.model");

const addMachine = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
      imageId,
    } = req.body;

    const newMachine = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
      imageId,
    });

    res.status(201).send({ message: "New machine added!", newMachine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const machines = await Machine.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name", "phone", "email"],
        },
      ],
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
      ],
      include: [
        {
          model: District,
          attributes: ["name"],
        },
      ],
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      include: [
        {
          model: Image,
        },
      ],
    });
    res.status(200).send({ data: machines });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findOne({ where: { id } });
    if (!machine) {
      return res.status(404).send({ message: "Machine not found" });
    }
    res.status(200).send({ data: machine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateMachine = await Machine.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Machine updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMachine = await Machine.destroy({
      where: { id },
    });

    if (!deleteMachine) {
      return res.status(404).send({ message: "Machine not found" });
    }

    res.status(200).send({ message: "Machine deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addMachine,
  findAll,
  findOne,
  update,
  remove,
};
