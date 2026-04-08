const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
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
      image: req.file.filename,
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

    const imagePath = "uploads/" + product.image;

    
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("Error deleting image:", err);
      }
    });

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and image deleted successfully" });

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

  const product = await Product.findById(req.params.id);

  if (product.image) {
    const oldImagePath = "uploads/" + product.image;

    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.log("Error deleting old image:", err);
      }
    });
  }

  updateData.image = req.file.filename;
}

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    {new: true}
  );

  res.json(updatedProduct);
} 
catch (error) {
  res.status(500).json({error: error.message});
}
});
module.exports = router;