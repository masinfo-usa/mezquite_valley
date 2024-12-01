import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true,
        unique: true 
    },
    price : {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;