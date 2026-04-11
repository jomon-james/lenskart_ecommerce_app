import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageUsers.css";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

function ManageUsers() {

    const [users, setUsers] =useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {fetchUsers();}, []);

     const fetchUsers = async () => {
        try {
            const res = await axios.get("https://lenskart-ecommerce-app.onrender.com/api/users/getusers");
            console.log(res.data);
            setUsers(res.data);
        }
        catch (error){
            console.log("error fetching products", error);
        }
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user =>user._id !== id));
    };

    const handleUpdateUser = (updatedUser) => {
        setUsers(users.map((user) => user._id === updatedUser._id ? updatedUser : user));
    };

    return (
        <div className="manage-users">
            <h2>Manage Users</h2>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="action-buttons">
                            
                            <button  className="edit-btn2" onClick={() => setEditingUser(user)}>
                                Edit
                            </button>

                            <DeleteUser
                                userId={user._id}
                                onDelete={handleDeleteUser}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
            {editingUser && (
                <EditUser
                user={editingUser}
                onUpdate={handleUpdateUser}
                onClose={() => setEditingUser(null)}
                />
            )}

        </div>
    );
}

export default ManageUsers;