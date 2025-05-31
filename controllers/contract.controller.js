const { sendErrorResponse } = require("../helpers/send.error.response");
const Commission = require("../models/commision.model");
const Contract = require("../models/contract.model");
const Machine = require("../models/machine.model");
const Status = require("../models/status.model");
const User = require("../models/user.model");
const sequelize = require("../config/db");
const { Op } = require("sequelize");

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

const getContractsByStatus = async (req, res) => {
  try {
    //---------------SQL QUERY-----------------------//
    //   const { start_time, end_time } = req.body;
    //   const results = await sequelize.query(
    //     `
    // SELECT
    //   c.*,
    //   s.name AS status_name
    // FROM contract c
    // JOIN status s ON s.id = c.status_id
    // WHERE  s.name = 'Bekor qilingan'
    // AND c.start_time >= :start_time
    // AND c.end_time <= :end_time
    // `,
    //    {
    //      replacements: { start_time, end_time },
    //      type: sequelize.QueryTypes.SELECT,
    //    }
    //  );

    //---------------Sequalize request-----------------------//
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
      return res
        .status(400)
        .send({ message: "start_time va end_time kiritilishi kerak." });
    }

    const results = await Contract.findAll({
      include: [
        {
          model: Status,
          where: { name: { [Op.iLike]: "%Bekor qilingan%" } },
          attributes: ["name"],
        },
        {
          model: Machine,
          attributes: ["name"]
        }
      ],
      where: {
        start_time: { [Op.gte]: start_time },
        end_time: { [Op.lte]: end_time },
      },
      attributes: ["id", "statusId", "start_time", "end_time", "total_price"],
    });
    
    console.log("results:", results);
    if (!results || results.length === 0) {
      return res
        .status(404)
        .send({ message: "No matching machine found for this user." });
    }

    res.status(200).send({ data: results });
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
  getContractsByStatus,
  findOne,
  update,
  remove,
};
