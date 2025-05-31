const {
  findAll,
  findOne,
  update,
  remove,
  addContract,
  getContractsByStatus,
} = require("../controllers/contract.controller");
const router = require("express").Router();

router.post("/", addContract);
router.get("/", findAll);
router.get("/by-status", getContractsByStatus);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;