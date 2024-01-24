const mongoose = require("mongoose");


// Setup product schema
const ProductsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        price: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ['Fashion', 'Clothes', 'Shooes', 'Jewellery'],
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

const ProductsModel = mongoose.model("products", ProductsSchema);
module.exports = { ProductsModel };
