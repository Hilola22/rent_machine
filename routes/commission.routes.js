const {
  addCommission,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/commission.controller");
const router = require("express").Router();

router.post("/", addCommission);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
