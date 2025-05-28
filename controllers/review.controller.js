const { sendErrorResponse } = require("../helpers/send.error.response");
const Review = require("../models/review.model");


const addReview = async (req, res) => {
  try {
    const { rating, comment, machineId, userId } = req.body;

    const newReview = await Review.create({
      rating,
      comment,
      machineId,
      userId,
    });

    res.status(201).send({ message: "New review added!", newReview });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { 
          model: User,
        }],
    });
    res.status(200).send({ data: reviews });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findOne({ where: { id } });
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updateReview = await User.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    );
    res.status(200).send({ message: "Review updated successfully!" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await Review.destroy({
      where: { id },
    });

    if (!deleteReview) {
      return res.status(404).send({ message: "Review not found" });
    }

    res.status(200).send({ message: "Review deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addReview,
  findAll,
  findOne,
  update,
  remove,
};
