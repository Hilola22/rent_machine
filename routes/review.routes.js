const {
  findAll,
  findOne,
  update,
  remove,
  addReview,
} = require("../controllers/review.controller");
const router = require("express").Router();

router.post("/", addReview);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
