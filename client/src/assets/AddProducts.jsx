import { useState } from "react";
import axios from "axios";
import "./AddProducts.css";

function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file,
      });

      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/products/add", data);
      alert("Product Added Successfully!");
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-products-container">
      <h2 className="add-products-heading">Add a Product</h2>

      <form
        className="add-products-form"
        onSubmit={handleSubmit}
       
      >
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select name="category" onChange={handleChange} required>
            <option value="">Select category</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="eyeglasses">Eyeglasses</option>
            <option value="contact-lenses">Contact Lenses</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Product Image</label>

          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              style={{ width: "120px", marginBottom: "10px", borderRadius: "5px" }}
            />
          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;