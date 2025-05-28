const { sendErrorResponse } = require("../helpers/send.error.response");
const Status = require("../models/status.model");

const addStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newStatus = await Status.create({ name });

    res.status(201).send({ message: "New status created!", newStatus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).send({ data: statuses });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const status = await Status.findOne({ where: { id } });
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }
    res.status(200).send({ data: status });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateStatus = await Status.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res
      .status(200)
      .send({ message: "Status updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStatus = await Status.destroy({
      where: { id },
    });

    if (!deleteStatus) {
      return res.status(404).send({ message: "Status not found" });
    }

    res.status(200).send({ message: "Status deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStatus,
  findAll,
  findOne,
  update,
  remove,
};
