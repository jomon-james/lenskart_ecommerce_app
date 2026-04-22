import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin-login");
    }

    return (
        <div className="admin-dashboard-container">
            <div className="admin-navbar">
                <div className="admin-logo">Lenskart</div>
            
                <div className="admin-nav-links">
                    <span onClick={() => navigate("/admin/products")}>Add Products</span>
                    <span onClick={() => navigate("/admin/manage-products")}>Manage Products</span>
                    <span onClick={() => navigate("/admin/users")}>Manage Users</span>
                    <span onClick={() => navigate("/admin/orders")}>Manage Orders</span>
                    <span onClick={() => navigate("/admin/sales")}>Sales Dashboard</span>
                    <span className="logout" onClick={handleLogout}>Logout</span>
                </div>
            
            </div>
        </div>
    );
}

export default AdminDashboard;