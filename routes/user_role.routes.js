const {
  findAll,
  findOne,
  update,
  remove,
  addUserRole,
  removeUserRole,
} = require("../controllers/user_role.controller");
const router = require("express").Router();

router.post("/", addUserRole);
router.post("/remove", removeUserRole);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);


module.exports = router;
