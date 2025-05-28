const {
  addRegion,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/region.controller");
const router = require("express").Router();

router.post("/", addRegion);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
