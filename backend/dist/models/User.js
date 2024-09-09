import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId, // Adjust the type to ObjectId
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    jobTitle: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    permissions: {
        type: Array,
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map