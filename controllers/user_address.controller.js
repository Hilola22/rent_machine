const UserAddress = require("../models/user_address");
const User = require("../models/user.model");
const { sendErrorResponse } = require("../helpers/send.error.response");
const Role = require("../models/role.model");

const addUserAddress = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorResponse({ message: "Bunday user mavjud emas" }, res);
    }

    const newUserAddress = await UserAddress.create({
      name,
      address,
      userId,
    });

    res
      .status(201)
      .send({ message: "New user address added!", newUserAddress });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const userAddresses = await UserAddress.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        }
      ],
      attributes: ["name", "address"],
    });
    res.status(200).send({ data: userAddresses });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const userAddress = await UserAddress.findOne({
      where: { id },
      include: User,
    });
    if (!userAddress) {
      return res.status(404).send({ message: "User address not found" });
    }
    res.status(200).send({ data: userAddress });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateUserAddress = await UserAddress.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({
      message: "User address updated successfully!",
      data: updateUserAddress,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUserAddress = await UserAddress.destroy({
      where: { id },
    });

    if (!deleteUserAddress) {
      return res.status(404).send({ message: "User address not found" });
    }

    res.status(200).send({ message: "User address deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUserAddress,
  findAll,
  findOne,
  update,
  remove,
};
