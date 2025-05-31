const {
  addMachine,
  findAll,
  findOne,
  update,
  remove,
  getMachinesByPlaceName,
  getMachinesByContract,
  getMachinesByImage,
} = require("../controllers/machine.controller");
const router = require("express").Router();

router.post("/", addMachine);
router.get("/", findAll);
router.get("/by-name", getMachinesByPlaceName);
router.get("/by-contract", getMachinesByContract);
router.get("/by-image", getMachinesByImage);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
