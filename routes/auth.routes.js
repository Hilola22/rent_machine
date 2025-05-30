const {
  login,
  logout,
  refreshToken
} = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
// router.get("/", findAll);
// router.get("/:id", findOne);
// router.patch("/:id", update);
// router.delete("/:id", remove);

module.exports = router;
