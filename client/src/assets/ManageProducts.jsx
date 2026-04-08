import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageProducts.css";
import EditProducts from "./EditProducts";
import DeleteProduct from "./DeleteProduct";

function ManageProducts() {

    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    const handleEdit = (product) => {
        setEditProduct(product);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/all");
            setProducts(response.data);
        }
        catch (error){
            console.log("error fetching products", error);
        }
    };

    useEffect(() => {fetchProducts();}, []);

    return (
        <div className="manage-container">
            <h2 className="manage-title">Manage Products</h2>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>

                                    <td>
                                        <img
                                            src={`http://localhost:5000/uploads/${product.image}`}
                                            alt={product.name}
                                            style={{ width: "100px" }}
                                        />
                                    </td>

                                    <td className="actions">

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>

                                        <DeleteProduct
                                            productId={product._id}
                                            fetchProducts={fetchProducts}
                                        />

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}

            {editProduct && (
                <EditProducts
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                    fetchProducts={fetchProducts}
                />
            )}

        </div>
    );
}

export default ManageProducts;