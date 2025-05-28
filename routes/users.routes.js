const {
  findAll,
  findOne,
  update,
  remove,
  addUser,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/", addUser);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
