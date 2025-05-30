const { sendErrorResponse } = require("../helpers/send.error.response");
const Commission = require("../models/commision.model");
const Contract = require("../models/contract.model");
const Machine = require("../models/machine.model");
const Status = require("../models/status.model");
const User = require("../models/user.model");

const addContract = async (req, res) => {
  try {
    const {
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    } = req.body;

    const newContract = await Contract.create({
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    });

    res.status(201).send({ message: "New contract added!", newContract });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name", "price_per_hour, is_available"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
        {
          model: Commission,
          attributes: ["percent"],
        },
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
    });
    res.status(200).send({ data: contracts });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contract.findOne({ where: { id } });
    if (!contract) {
      return res.status(404).send({ message: "Contract not found" });
    }
    res.status(200).send({ data: contract });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateContract = await Contract.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Contract updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContract = await Contract.destroy({
      where: { id },
    });

    if (!deleteContract) {
      return res.status(404).send({ message: "Contract not found" });
    }

    res.status(200).send({ message: "Contract deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addContract,
  findAll,
  findOne,
  update,
  remove,
};
