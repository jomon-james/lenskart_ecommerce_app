import { useState } from "react";
import axios from "axios";

function EditProducts({ editProduct, setEditProduct, fetchProducts }) {

    const [previewImage, setPreviewImage] = useState(null);

    const handleUpdate = async () => {

        const formData = new FormData();

        formData.append("name", editProduct.name);
        formData.append("category", editProduct.category);
        formData.append("price", editProduct.price);
        formData.append("description", editProduct.description);
        formData.append("image", editProduct.image);

        try {

            await axios.put(
                `https://lenskart-ecommerce-app.onrender.com/api/products/${editProduct._id}`,
                formData
            );

            fetchProducts();
            setEditProduct(null);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="modal-overlay">
            <div className="modal-content">

                <div className="edit-form">

                    <h3>Edit Product</h3>

                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={editProduct.name}
                        onChange={(e) =>
                            setEditProduct({
                                ...editProduct,
                                name: e.target.value
                            })
                        }
                    />

                    <div className="form-group">
                        <label>Category:</label>

                        <select
                            value={editProduct.category}
                            onChange={(e) =>
                                setEditProduct({
                                    ...editProduct,
                                    category: e.target.value
                                })
                            }
                        >
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
                            value={editProduct.price}
                            onChange={(e) =>
                                setEditProduct({
                                    ...editProduct,
                                    price: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>

                        <textarea
                            value={editProduct.description}
                            onChange={(e) =>
                                setEditProduct({
                                    ...editProduct,
                                    description: e.target.value
                                })
                            }
                        ></textarea>
                    </div>

                    <div className="form-group">

                        <label>Current Image</label>
                        <br />

                        <img
                            src={
                                previewImage
                                    ? previewImage
                                    : editProduct.image
                            }
                            alt="product"
                            style={{ width: "120px", marginBottom: "10px", borderRadius: "5px" }}
                        />

                        <input
                            type="file"
                            onChange={(e) => {

                                const file = e.target.files[0];

                                setEditProduct({
                                    ...editProduct,
                                    image: file
                                });

                                setPreviewImage(URL.createObjectURL(file));
                            }}
                        />

                    </div>

                    <div className="form-group">
                        <button onClick={handleUpdate}>
                            Update Product
                        </button>
                    </div>

                    <div className="form-group">
                        <button onClick={() => setEditProduct(null)}>
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditProducts;