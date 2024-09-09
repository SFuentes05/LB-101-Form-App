import mongoose from "mongoose";

const IndustrialProcess = new mongoose.Schema({
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
    produceAmount: {
        type: Number,
    },
    residueInventory: {
        type: Number,
    },
    relativeHumidity: {
        type: Number,
    },
    density: {
        type: Number,
    },
    treatmentMethod: {
        type: String,
    },
    residueSupply: {
        type: String,
    },
    residueDisposition: { 
        type: String,
    },
    electricityConsumption: {
        type: Number,
    },
    operationHours: {
        type: Number,
    },
    frequency: {
        type: String,
    },
    voltage: {
        type: Number,
    },
    energyCost: {
        type: Number,
    },
    energyPrice: {
        type: Number,
    },
    powerPrice: {
        type: Number,
    },
    transformerCapacity: {
        type: Number,
    },
    PPACounterpart: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    fuelConsumption: {
        type: Number,
    },
    fuelConsumptionPeriod: {
        type: String,
    },
    thermalInstallation: {
        type: Number,
    },
    thermalEnergyDemand: {
        type: Number,
    },
    energyThermalPeriod: {
        type: String,
    },
    steamPressure: {
        type: Number,
    },
    fuelPrice: {
        type: Number,
    },
    fuelThermalConsumption: {
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
})

export default mongoose.model("IndustrialProcess", IndustrialProcess);