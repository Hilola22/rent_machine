const { sendErrorResponse } = require("../helpers/send.error.response");
const Image = require("../models/image.model");
const Machine = require("../models/machine.model");

const addImage = async (req, res) => {
  try {
    const { image_url, uploaded_at, machineId } = req.body;
    const newImage = await Image.create({ image_url, uploaded_at, machineId });

    res.status(201).send({ message: "New image created!", newImage });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const images = await Image.findAll({ include: [
      {
        model: Machine,
      }
    ]});
    res.status(200).send({ data: images });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findOne({ where: { id } });
    if (!image) {
      return res.image(404).send({ message: "Image not found" });
    }
    res.status(200).send({ data: image });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateImage = await Image.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Image updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteImage = await Image.destroy({
      where: { id },
    });

    if (!deleteImage) {
      return res.image(404).send({ message: "Image not found" });
    }

    res.status(200).send({ message: "Image deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addImage,
  findAll,
  findOne,
  update,
  remove,
};
