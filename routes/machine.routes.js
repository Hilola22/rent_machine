const {
  addMachine,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/machine.controller");
const router = require("express").Router();

router.post("/", addMachine);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
