import mongoose from "mongoose";

const DesiredProduct = new mongoose.Schema({
    userID: {
        type: String,
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId, // Ensure this is ObjectId
        required: true,
        ref: "Company"
    },
    dateCreated: {
        type: Date,
    },
    electricity: {
        type: String,
    },
    thermalEnergy: {
        type: String,
    },
    coGeneration: {
        type: String,
    },
    warmWater: {
        type: String,
    }, 
    warmAir: {
        type: String,
    },
    requiredUptime: {
        type: String,
    },
    comments: {
        type: String,
    },
    progress: {
        type: Number,
        default: 0,
    },
    filledFields: {
        type: Number,
        default: 0
    },
    totalFields: {
        type: Number,
        default: 0

    }
})

export default mongoose.model("DesiredProduct", DesiredProduct);