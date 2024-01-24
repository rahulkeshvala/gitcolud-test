const { ProductsModel } = require("../models/products.models");
const {
    findAll,
    updateDataById,
    deleteById,
    findByQuery,
} = require("../utils/helpers");

const createProduct = async (req, res) => {
    const body = req.body;
    body.user_id = req.user.id;
    try {
        const newProduct = new ProductsModel({
            ...body,
        });
        await newProduct.save();
        return res.status(200).send({ data: newProduct, status: "success" });
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while storing data.",
            status: "error",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await deleteById(ProductsModel, req.params.id);
        return res.status(200).send({ data: null, status: "success" });
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while deleting data.",
            status: "error",
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!",
            });
        }
        await updateDataById(ProductsModel, req.params.id, req.body)
            .then((data) => {
                if (!data) {
                    return res.status(500).send({
                        message: "Id not found!",
                        status: "error",
                    });
                }
                return res.status(200).send({ status: "success" });
            })
            .catch((err) => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while updating data.",
                    status: "error",
                });
            });
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while updating data.",
            status: "error",
        });
    }
};

const getProducts = async (req, res) => {
    try {
        let data = null;
        if (req.user.role === "admin") {
            data = await findAll(ProductsModel);
        } else {
            data = await findByQuery(ProductsModel, { user_id: req.user.id });
        }
        return res.status(200).send({ data: data, status: "success" });
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Some error occurred while fetching data.",
            status: "error",
        });
    }
};

module.exports = {
    getProducts,
    updateProduct,
    createProduct,
    deleteProduct,
};
