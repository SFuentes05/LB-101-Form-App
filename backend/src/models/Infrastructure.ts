import mongoose from "mongoose";

const infrastructureSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId, // Ensure this is ObjectId
        required: true,
        ref: "Company"
    },
    dateCreated: {
        type: Date, 
    },
    availableSpace: {
        type: String,
    },
    maxDistance: {
        type: String,
    },
    constructure: {
        type: String,
    },
    basicServices: {
        type: String,
    },
    dirtQuality: {
        type: String,
    },
    voltageRegulator: {
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

infrastructureSchema.index({ companyID: 1 });
infrastructureSchema.index({ userID: 1 });

export default mongoose.model("Infrastructure", infrastructureSchema);