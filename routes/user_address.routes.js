const {
  findAll,
  findOne,
  update,
  remove,
  addUserAddress,
} = require("../controllers/user_address.controller");
const router = require("express").Router();

router.post("/", addUserAddress);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
