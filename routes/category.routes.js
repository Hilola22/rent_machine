const {
  addCategory,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/category.controller");
const router = require("express").Router();

router.post("/", addCategory);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
