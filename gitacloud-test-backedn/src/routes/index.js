const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const newUserRoutes = require("./newuser.routes");
const productRoutes = require("./product.routes");

router.use("/auth", authRoutes);
router.use("/new-user", newUserRoutes);
router.use("/product", productRoutes);

module.exports = router;
