import axios from "axios";

function DeleteUser({ userId, onDelete }){

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
            onDelete(userId);
        }
        catch (error) {
                console.log("error deleting user",error);
        }
    };
return (
        <button
            className="delete-btn2" onClick={handleDelete}>Delete
        </button>
    );
}

export default DeleteUser;