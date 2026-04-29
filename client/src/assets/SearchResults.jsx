import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://lenskart-ecommerce-app.onrender.com/api/products/search?q=${query}`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for "{query}"</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "200px",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/product/${p._id}`)}
            >
              <img
                src={p.image}
                alt={p.name}
                width="150"
              />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;