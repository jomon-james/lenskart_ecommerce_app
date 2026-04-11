import { useState } from "react";
import axios from "axios";
import "./EditUser.css";

function EditUser({ user, onUpdate, onClose }) {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const [editingUser, setEditingUser] = useState(null);

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`https://lenskart-ecommerce-app.onrender.com/api/users/update/${user._id}`,{ name, email });
            onUpdate(res.data);
            onClose();
        }
        catch (error) {
            console.log("error updating user",error);
        }
    };
    return (
        <div className="edit-user-container">
            <div className="modal-box">

            <h3>Edit User</h3>

            <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)}/>
            <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            
            <div className="edit-buttons">
            <button className="save-btn" onClick={handleUpdate}>
                Save
            </button>
            <button className="cancel-btn" onClick={onClose}>
                Cancel
            </button>

            </div>
        </div>
    </div>

    );
}

export default EditUser;