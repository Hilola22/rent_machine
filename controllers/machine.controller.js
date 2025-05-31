const { sendErrorResponse } = require("../helpers/send.error.response");
const Category = require("../models/category.model");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const User = require("../models/user.model");
const Image = require("../models/image.model");
const sequelize = require("../config/db");
const { Op, fn } = require("sequelize");
const Contract = require("../models/contract.model");

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

const getMachinesByContract = async (req, res) => {
  try {
    //---------------SQL QUERY-----------------------//
    // const { start_time, end_time, full_name, category_name } = req.body;
    // const results = await sequelize.query(
    //   `
    //   SELECT  u.full_name, m.name as machine_name, m."categoryId", c.start_time, c.end_time, c.total_time, c.total_price
    //   FROM machine m
    //   JOIN contract c ON m.id = c."machineId"
    //   JOIN category ca ON m."categoryId" = ca.id
    //   JOIN users u ON u.id = c."userId"
    //   WHERE ca.name = :category_name AND c.start_time <= :start_time AND c.end_time >= :end_time AND u."full_name" = :full_name
    //   `,
    //   {
    //     replacements: { start_time, end_time, full_name, category_name },
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );

    //---------------Sequalize request-----------------------//
    const { start_time, end_time, full_name, category_name } = req.body;

    const results = await Machine.findAll({
      include: [
        {
          model: Category,
          where: {
            name: category_name,
          },
          attributes: [],
        },
        {
          model: Contract,
          where: {
            start_time: {
              [Op.lte]: start_time,
            },
            end_time: {
              [Op.gte]: end_time,
            },
          },
          attributes: ["start_time", "end_time", "total_time", "total_price"],
          include: [
            {
              model: User,
              where: {
                full_name: full_name,
              },
              attributes: ["full_name"],
            },
          ],
        },
      ],
      attributes: ["name", "categoryId"],
    });

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

const getMachinesByPlaceName = async (req, res) => {
  try {
    //---------------SQL QUERY-----------------------//
    // const { region_name, district_name } = req.body;
    // const results = await sequelize.query(
    //   `
    //   SELECT  m.name as machine_name
    //   FROM machine m
    //   JOIN region r ON m."regionId" = r.id
    //   JOIN district d ON m."districtId" = d.id
    //   WHERE r.name LIKE :region_name AND d.name LIKE :district_name
    //   `,
    //   {
    //     replacements: {
    //       region_name: `%${region_name}%`,
    //       district_name: `%${district_name}%`,
    //     },
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );

    //---------------Sequalize request-----------------------//
    const { region_name, district_name } = req.body;

    const results = await Machine.findAll({
      include: [
        {
          model: Region,
          where: {
            name: { [Op.iLike]: `%${region_name}%` },
          },
          attributes: [],
        },
        {
          model: District,
          where: {
            name: { [Op.iLike]: `%${district_name}%` },
          },
          attributes: [],
        },
      ],
      attributes: ["name"],
    });
    if (!results) {
      return res
        .status(404)
        .send({ message: "Contract not found in this user's information" });
    }
    res.status(200).send({ data: results });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getMachinesByImage = async (req, res) => {
  try {
    //---------------SQL QUERY-----------------------//
    // const results = await sequelize.query(
    //   `
    //   SELECT m.name, COUNT(i.id) AS image_count
    //   FROM machine m
    //   JOIN image i ON m.id = i."machineId"
    //   GROUP BY module.name
    //   HAVING COUNT(i.id) > 3
    //   `,
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );

    //---------------Sequalize request-----------------------//
    const results = await Machine.findAll({
      include: [
        {
          model: Image,
          attributes: [],
        },
      ],
      attributes: [
        "name",
        [sequelize.fn("COUNT", sequelize.col("Images.id")), "imageCount"],
      ],
      group: ["Machine.id"],
      having: sequelize.literal(`COUNT("Images"."id") > 3`),
    });

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
  getMachinesByContract,
  getMachinesByPlaceName,
  getMachinesByImage,
  update,
  remove,
};
