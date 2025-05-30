const { sendErrorResponse } = require("../helpers/send.error.response");
const Commission = require("../models/commision.model");

const addCommission = async (req, res) => {
  try {
    const { percent } = req.body;
    const newCommission = await Commission.create({ percent });

    res.status(201).send({ message: "New commission created!", newCommission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const commissions = await Commission.findAll();
    res.status(200).send({ data: commissions });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const commission = await Commission.findOne({ where: { id } });
    if (!commission) {
      return res.status(404).send({ message: "Commission not found" });
    }
    res.status(200).send({ data: commission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateCommission = await Commission.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({
      message: "Commission updated successfully!",
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCommission = await Commission.destroy({
      where: { id },
    });

    if (!deleteCommission) {
      return res.status(404).send({ message: "Commission not found" });
    }

    res.status(200).send({ message: "Commission deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCommission,
  findAll,
  findOne,
  update,
  remove,
};
