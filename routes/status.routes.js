const {
  addStatus,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/status.controller");
const router = require("express").Router();

router.post("/", addStatus);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
