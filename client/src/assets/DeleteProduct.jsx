import axios from "axios";

function DeleteProduct({ productId, fetchProducts }) {

    const handleDelete = async () => {

        try {

            await axios.delete(
                `https://lenskart-ecommerce-app.onrender.com/api/products/delete/${productId}`
            );

            alert("Product Deleted Successfully!");
            fetchProducts();

        } catch (error) {

            console.log("error deleting product", error);

        }
    };

    return (
        <button
            className="delete-btn"
            onClick={handleDelete}
        >
            Delete
        </button>
    );
}

export default DeleteProduct;