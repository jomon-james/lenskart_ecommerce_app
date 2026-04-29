const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lenskart-products",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
  },
});



const upload = multer({ storage: storage });

const { getProducts } = require("../controllers/productController");


router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? req.file.path : ""
    });

    await newProduct.save();
    res.status(201).json({ message: "Product Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/all", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/",getProducts);

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const products = await Product.find({
  $or: [
    { name: { $regex: query, $options: "i" } },
    { category: { $regex: query, $options: "i" } }
  ]
});

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({message: "product not found "});
    }
    res.json(product)
  } 
  catch (err) {
    res.status(500).json({ error: err.message })
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id",upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description
    };

    if (req.file) {
  updateData.image = req.file.path;
}

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { returnDocument: "after" }
  );

  res.json(updatedProduct);
} 
catch (error) {
  res.status(500).json({error: error.message});
}
});
module.exports = router;