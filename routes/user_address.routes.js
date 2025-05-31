const {
  findAll,
  findOne,
  update,
  remove,
  addUserAddress,
} = require("../controllers/user_address.controller");
const router = require("express").Router();
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const selfGuard = require("../middlewares/guards/self.guard");

router.post("/",authGuard, selfGuard, addUserAddress);
router.get("/", authGuard, roleGuard(["admin", "user"]), findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
