import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }],
    progress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }]
});

const User = mongoose.model("User", userSchema);

export default User;
