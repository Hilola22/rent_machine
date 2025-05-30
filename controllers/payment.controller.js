const { sendErrorResponse } = require("../helpers/send.error.response");
const Contract = require("../models/contract.model");
const Payment = require("../models/payment.model");

const addPayment = async (req, res) => {
  try {
    const { contract_id, payment_date, payment_status, amount, status } = req.body;

    const newPayment = await Payment.create({
      contract_id,
      payment_date,
      payment_status,
      amount,
      status,
    });

    res.status(201).send({ message: "New payment added!", newPayment });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Contract,
          attributes: ["total_price", "date", "total_time"],
        },
      ],
    });
    res.status(200).send({ data: payments });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findOne({ where: { id } });
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.status(200).send({ data: payment });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updatePayment = await Payment.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Payment updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePayment = await Payment.destroy({
      where: { id },
    });

    if (!deletePayment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    res.status(200).send({ message: "Payment deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addPayment,
  findAll,
  findOne,
  update,
  remove,
};
