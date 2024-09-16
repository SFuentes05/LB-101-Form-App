import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
    },
    desiredProduct: {
        type: Array,
    },
    commercialAddress: {
        type: String,
    },
    plantAddress: {
        type: String,
    },
    seaLevel: {
        type: String,
    },
    taxID: {
        type: String,
    },
    webURL: {
        type: String,
    },
    processDescription: {
        type: String,
    },
    countriesExport: {
        type: Array,
    },
    exportPercentage: {
        type: Number,
    },
    comments: {
        type: String,
    },
})

companySchema.index({ userID: 1 });

export default mongoose.model("Company", companySchema);