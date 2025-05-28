const { sendErrorResponse } = require("../helpers/send.error.response");
const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });

    res.status(201).send({ message: "New category created!", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ data: categories });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ data: category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res
      .status(200)
      .send({ message: "Category updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.destroy({
      where: { id },
    });

    if (!deleteCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCategory,
  findAll,
  findOne,
  update,
  remove,
};
