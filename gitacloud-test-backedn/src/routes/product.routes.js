const express = require("express");
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controllers");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.post("/add-product", authMiddleware, createProduct);
router.get("/get-product", authMiddleware, getProducts);
router.post("/update-product/:id", authMiddleware, updateProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

module.exports = router;
