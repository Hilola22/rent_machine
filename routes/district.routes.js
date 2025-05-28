const {
  addDistrict,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/district.controller");
const router = require("express").Router();

router.post("/", addDistrict);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
