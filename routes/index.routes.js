const router = require("express").Router();
const categoryRouter = require("../routes/category.routes");
const regionRouter = require("../routes/region.routes");
const districtRouter = require("../routes/district.routes");
const commissionRouter = require("../routes/commission.routes");
const statusRouter = require("../routes/status.routes");
const imageRouter = require("../routes/image.routes");

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/commission", commissionRouter);
router.use("/status", statusRouter);
router.use("/image", imageRouter);

module.exports = router;
