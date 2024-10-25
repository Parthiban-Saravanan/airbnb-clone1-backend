import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favourties: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Properties",
        default: [],
    },
    bookings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Properties",
        default: [],
    },
},
    { timeStamps: true }

);

export default mongoose.model("User", UserSchema);