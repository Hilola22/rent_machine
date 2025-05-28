const {
  addImage,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/image.controller");
const router = require("express").Router();

router.post("/", addImage);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
