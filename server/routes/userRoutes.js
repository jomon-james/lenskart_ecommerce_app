const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/getusers", async (req, res) => {
try{
    const users = await User.find();
    res.json(users);
}
catch (error) {
    res.status(500).json({ message: "error fetching users"});
}
});


router.delete("/delete/:id",async (req, res) => {
    try{
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        return res.status(404).json({message: "user not found"});
    }
    res.json({ message: "user deleted successfully"});
    }
    catch (error){
        res.status(500).json({message: "server error"});
    }
    
});


router.put("/update/:id", async (req, res) =>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    }
    catch (error){
        res.status(500).json({message: "error updating user"});
    }
});

module.exports = router;