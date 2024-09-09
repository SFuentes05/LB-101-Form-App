import mongoose from "mongoose";

const solarPanelSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId, // Ensure this is ObjectId
        required: true,
        ref: "Company"
    },
    dateCreated: {
        type: Date,
    },
    installationLocation: {
        type: String,
    },
    agroProduction: {
        type: String, 
    },
    energyConsumption: {
        type: String,
    },
    consumptionPattern: {
        type: String,
    },
    monthlyEnergyCost: {
        type: Number,
    },
    primaryEnergySource: {
        type: String,
    },
    visitAvailability: {
        type: Date,
    },
    contactPreference: {
        type: String,
    },
    availableSpace: {
        type: String,
    },
    ceilingType: {
        type: String,
    },
    climateCondition: {
        type: String,
    },
    electricInfrastructure: {
        type: String,
    },
    financingAvailability: {
        type: String,
    },
    ROI: {
        type: String,
    },
    subsidies: {
        type: String,
    },
    desiredInstallationTime: {
        type: String,
    },
    dueDate: {
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

    },
})

export default mongoose.model("SolarPanel", solarPanelSchema);