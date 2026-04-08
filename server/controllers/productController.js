const Product = require("../models/Products");

const getProducts = async (req, res) => {
try {
const category = req.query.category;
const products = await Product.find(category ? {category} : {});

res.json(products);
}
catch (error){
    res.status(500).json({message: error.message});
}
};

module.exports = { getProducts };

