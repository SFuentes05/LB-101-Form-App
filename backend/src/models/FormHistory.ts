import mongoose from "mongoose";
const formHistorySchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Company"
    },
    dateCreated: {
        type: Date,
    },
    biomass: {
        type: String,
    },
    annualProductionQuantity: {
        type: Number,
    },
    energyGenerationType: {
        type: String,
    },
    thermalDemand: {
        type: Number,
    }, 
    electricalDemand: {
        type: Number,
    },
    annualOperatingHours: {
        type: Number,
    },
    fuelType: {
        type: String,
    },
    fuelConsumption: {
        type: Number,
    },
    fuelMarketPrice: {
        type: Number,
    },
    boilerModel: {
        type: String,
    },
    burnerPlate: {
        type: String,
    },
    energyCost: {
        type: Number,
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
    },
    version: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
export default mongoose.model("FormHistory", formHistorySchema);