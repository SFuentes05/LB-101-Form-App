import mongoose from "mongoose";
const companyHistorySchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    companyID: {
        type: String,
        required: false,
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
    version: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
export default mongoose.model("CompanyHistory", companyHistorySchema);
//# sourceMappingURL=CompanyHistory.js.map