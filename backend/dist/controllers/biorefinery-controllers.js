import Infrastructure from "../models/Infrastructure.js";
import IndustrialProcess from "../models/IndustrialProcess.js";
import InfrastructureHistory from "../models/InfrastructureHistory.js";
import IndustrialProcessHistory from "../models/IndustrialProcessHistory.js";
import DesiredProduct from "../models/DesiredProduct.js";
import DesiredProductHistory from "../models/DesiredProductHistory.js";
import mongoose from "mongoose";
import Form from "../models/Form.js";
import FormHistory from "../models/FormHistory.js";
const calculateProgress = (formData, totalFields, excludeFields = ['companyID', 'userID', 'dateCreated']) => {
    const relevantFields = Object.entries(formData).filter(([key, value]) => !excludeFields.includes(key));
    const filledFields = relevantFields.filter(([key, value]) => value !== null && value !== undefined && value !== '' && value !== 0).length;
    const progress = ((filledFields / totalFields) * 100).toFixed(1); // Round to one decimal point
    return { progress: parseFloat(progress), filledFields, totalFields };
};
// Get all forms
export const getAllForms = async (req, res, next) => {
    try {
        const forms = await Form.find();
        return res.status(200).json({
            message: "Forms retrieved successfully",
            forms,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error listing forms",
            cause: error.message,
        });
    }
};
// Create a new form
export const createForm = async (req, res, next) => {
    try {
        const { companyID, userID } = req.body;
        const existingForm = await Form.findOne({ companyID });
        if (existingForm)
            return res.status(401).send("This company already has a form registered");
        const today = new Date();
        const form = new Form({
            companyID,
            userID,
            dateCreated: today,
            progress: 0, // Progress set to 0 on creation
            filledFields: 0,
            totalFields: 13,
        });
        await form.save();
        return res.status(201).json({ message: "Form created successfully", form });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating form", cause: error.message });
    }
};
export const editForm = [
    async (req, res, next) => {
        try {
            const { companyID, userID, dateCreated, biomass, annualProductionQuantity, energyGenerationType, thermalDemand, electricalDemand, annualOperatingHours, fuelType, fuelConsumption, fuelMarketPrice, boilerModel, energyCost, comments } = req.body;
            // Convert string IDs to ObjectId
            const companyObjectId = new mongoose.Types.ObjectId(companyID);
            const userObjectId = new mongoose.Types.ObjectId(userID);
            const existingForm = await Form.findOne({ companyID: companyObjectId });
            if (!existingForm) {
                return res.status(404).send("Form not found");
            }
            const latestVersion = await FormHistory.findOne({ companyID: companyObjectId }).sort({ version: -1 }).select("version");
            const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;
            const newVersion = new FormHistory({
                ...existingForm.toObject(),
                _id: undefined,
                version: newVersionNumber,
                timestamp: new Date(),
                userID: userObjectId,
            });
            await newVersion.save();
            // Determine total fields based on energy type
            const totalFields = energyGenerationType === 'Energía Eléctrica' ? 7 : 11;
            const { progress, filledFields, totalFields: fields } = calculateProgress(req.body, totalFields);
            Object.assign(existingForm, { biomass, annualProductionQuantity, energyGenerationType, thermalDemand, electricalDemand, annualOperatingHours, fuelType, fuelConsumption, fuelMarketPrice, boilerModel, burnerPlate: req.body.burnerPlate, energyCost, comments, progress, filledFields, totalFields: fields, userID: userObjectId });
            await existingForm.save();
            return res.status(200).json({ message: "Form updated successfully", form: existingForm });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error editing form", cause: error.message });
        }
    }
];
// Verify form by companyID
export const verifyForm = async (req, res, next) => {
    try {
        // Get the company's _id from the token
        const companyId = res.locals.jwtData.companyID;
        // Find the form by the companyID
        const form = await Form.findOne({ companyID: companyId });
        if (!form) {
            return res.status(401).send("Form not registered or company ID mismatch");
        }
        return res.status(200).json({
            message: "OK",
            companyID: form.companyID,
            userID: form.userID,
            dateCreated: form.dateCreated,
            biomassType: form.biomassType,
            biomass: form.biomass,
            annualProductionQuantity: form.annualProductionQuantity,
            energyGenerationType: form.energyGenerationType,
            thermalDemand: form.thermalDemand,
            electricalDemand: form.electricalDemand,
            annualOperatingHours: form.annualOperatingHours,
            fuelType: form.fuelType,
            fuelConsumption: form.fuelConsumption,
            fuelMarketPrice: form.fuelMarketPrice,
            boilerModel: form.boilerModel,
            burnerPlate: form.burnerPlate,
            energyCost: form.energyCost,
            comments: form.comments,
            progress: form.progress,
            filledFields: form.filledFields,
            totalFields: form.totalFields,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const getAllInfrastructure = async (req, res, next) => {
    try {
        // Get all Infrastructure directly from the database
        const infrastructure = await Infrastructure.find();
        return res.status(200).json({ message: "Infrastructure form retrieved successfully", infrastructure });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error listing infrastructure: ", cause: error.message });
    }
};
export const createInfrastructure = async (req, res, next) => {
    try {
        // Create Company
        const { companyID, dateCreated, availableSpace, maxDistance, constructure, basicServices, dirtQuality, voltageRegulator, comments } = req.body;
        const existingInfrastructure = await Infrastructure.findOne({ companyID });
        if (existingInfrastructure)
            return res.status(401).send("This company already has an Infrastructure form registered");
        const today = new Date();
        today.setDate(today.getDate());
        const infrastructure = new Infrastructure({
            companyID,
            dateCreated: today,
            availableSpace: null,
            maxDistance: null,
            constructure: null,
            basicServices: null,
            dirtQuality: null,
            voltageRegulator: null,
            progress: 0, // Progress set to 0 on creation
            filledFields: 0,
            totalFields: 8,
            comments: null
        });
        await infrastructure.save();
        return res.status(201).json({ message: "Infrastructure form created successfully", infrastructure: infrastructure.companyID });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating infrastructure form: ", cause: error.message });
    }
};
export const editInfrastructure = async (req, res, next) => {
    try {
        const { companyID, userID, dateCreated, availableSpace, maxDistance, constructure, basicServices, dirtQuality, voltageRegulator, comments } = req.body;
        // Convert string IDs to ObjectId
        const companyObjectId = new mongoose.Types.ObjectId(companyID);
        const userObjectId = new mongoose.Types.ObjectId(userID);
        const existingInfrastructure = await Infrastructure.findOne({ companyID: companyObjectId });
        if (!existingInfrastructure) {
            return res.status(404).send("Infrastructure form not found");
        }
        const latestVersion = await InfrastructureHistory.findOne({ companyID: companyObjectId }).sort({ version: -1 }).select("version");
        const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;
        const newVersion = new InfrastructureHistory({
            ...existingInfrastructure.toObject(),
            _id: undefined,
            version: newVersionNumber,
            timestamp: new Date(),
            userID: userObjectId, // Save the ID of the user making the update
        });
        await newVersion.save();
        const totalFields = 8; // Adjust based on your form
        const { progress, filledFields, totalFields: fields } = calculateProgress(req.body, totalFields);
        Object.assign(existingInfrastructure, { availableSpace, maxDistance, constructure, basicServices, dirtQuality, voltageRegulator, comments, progress, filledFields, totalFields: fields, userID: userObjectId }); // Save the userID of the updater
        await existingInfrastructure.save();
        return res.status(200).json({ message: "Infrastructure form updated successfully", form: existingInfrastructure });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error editing infrastructure", cause: error.message });
    }
};
export const verifyInfrastructure = async (req, res, next) => {
    try {
        // Get the user's _id from the token
        const companyId = res.locals.jwtData.companyID;
        // Find the infrastructure form by the companyID
        const infrastructure = await Infrastructure.findOne({ companyID: companyId });
        if (!infrastructure) {
            return res.status(401).send("Infrastructure form not registered or company ID mismatch");
        }
        return res.status(200).json({
            message: "OK",
            userID: infrastructure.userID,
            companyID: infrastructure.companyID,
            dateCreated: infrastructure.dateCreated,
            availableSpace: infrastructure.availableSpace,
            maxDistance: infrastructure.maxDistance,
            constructure: infrastructure.constructure,
            basicServices: infrastructure.basicServices,
            dirtQuality: infrastructure.dirtQuality,
            voltageRegulator: infrastructure.voltageRegulator,
            comments: infrastructure.comments,
            progress: infrastructure.progress,
            filledFields: infrastructure.filledFields,
            totalFields: infrastructure.totalFields,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// Get all industrial process forms
export const getAllIndustrialProcesses = async (req, res, next) => {
    try {
        const industrialProcesses = await IndustrialProcess.find();
        return res.status(200).json({
            message: "Industrial process forms retrieved successfully",
            industrialProcesses,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error listing industrial processes",
            cause: error.message,
        });
    }
};
// Create an industrial process form
export const createIndustrialProcess = async (req, res, next) => {
    try {
        const { companyID } = req.body;
        const existingProcess = await IndustrialProcess.findOne({ companyID });
        if (existingProcess)
            return res.status(401).send("This company already has an industrial process form registered");
        const today = new Date();
        const industrialProcess = new IndustrialProcess({
            companyID,
            dateCreated: today,
            produceAmount: null,
            residueInventory: null,
            relativeHumidity: null,
            density: null,
            treatmentMethod: null,
            residueSupply: null,
            residueDisposition: null,
            electricityConsumption: null,
            operationHours: null,
            frequency: null,
            voltage: null,
            energyCost: null,
            energyPrice: null,
            powerPrice: null,
            transformerCapacity: null,
            PPACounterpart: null,
            fuelType: null,
            fuelConsumption: null,
            fuelConsumptionPeriod: null,
            thermalInstallation: null,
            thermalEnergyDemand: null,
            energyThermalPeriod: null,
            steamPressure: null,
            fuelPrice: null,
            fuelThermalConsumption: null,
            comments: null,
            progress: 0 // Progress set to 0 on creation
        });
        await industrialProcess.save();
        return res.status(201).json({ message: "Industrial process form created successfully", industrialProcess: industrialProcess.companyID });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating industrial process form", cause: error.message });
    }
};
// Edit an existing industrial process form
export const editIndustrialProcess = async (req, res, next) => {
    try {
        const { companyID, ...formData } = req.body;
        const existingProcess = await IndustrialProcess.findOne({ companyID });
        if (!existingProcess)
            return res.status(404).send("Industrial process form not found");
        const latestVersion = await IndustrialProcessHistory.findOne({ companyID }).sort({ version: -1 }).select("version");
        const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;
        const newVersion = new IndustrialProcessHistory({
            ...existingProcess.toObject(),
            _id: undefined,
            version: newVersionNumber,
            timestamp: new Date(),
        });
        await newVersion.save();
        const totalFields = 24; // Adjust based on your form
        const { progress, filledFields, totalFields: fields } = calculateProgress(formData, totalFields);
        // Update userID with the user who made the edit
        const userID = res.locals.jwtData.id;
        Object.assign(existingProcess, formData, { userID, progress, filledFields, totalFields: fields });
        await existingProcess.save();
        return res.status(200).json({ message: "Industrial process form updated successfully", form: existingProcess });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error editing industrial process form", cause: error.message });
    }
};
// Verify industrial process form by companyID
export const verifyIndustrialProcess = async (req, res, next) => {
    try {
        // Get the company's _id from the token
        const companyId = res.locals.jwtData.companyID;
        // Find the industrial process form by the companyID
        const industrialProcess = await IndustrialProcess.findOne({ companyID: companyId });
        if (!industrialProcess) {
            return res.status(401).send("Industrial process form not registered or company ID mismatch");
        }
        return res.status(200).json({
            message: "OK",
            companyID: industrialProcess.companyID,
            dateCreated: industrialProcess.dateCreated,
            produceAmount: industrialProcess.produceAmount,
            residueInventory: industrialProcess.residueInventory,
            relativeHumidity: industrialProcess.relativeHumidity,
            density: industrialProcess.density,
            treatmentMethod: industrialProcess.treatmentMethod,
            residueSupply: industrialProcess.residueSupply,
            residueDisposition: industrialProcess.residueDisposition,
            electricityConsumption: industrialProcess.electricityConsumption,
            operationHours: industrialProcess.operationHours,
            frequency: industrialProcess.frequency,
            voltage: industrialProcess.voltage,
            energyCost: industrialProcess.energyCost,
            energyPrice: industrialProcess.energyPrice,
            powerPrice: industrialProcess.powerPrice,
            transformerCapacity: industrialProcess.transformerCapacity,
            PPACounterpart: industrialProcess.PPACounterpart,
            fuelType: industrialProcess.fuelType,
            fuelConsumption: industrialProcess.fuelConsumption,
            fuelConsumptionPeriod: industrialProcess.fuelConsumptionPeriod,
            thermalInstallation: industrialProcess.thermalInstallation,
            thermalEnergyDemand: industrialProcess.thermalEnergyDemand,
            energyThermalPeriod: industrialProcess.energyThermalPeriod,
            steamPressure: industrialProcess.steamPressure,
            fuelPrice: industrialProcess.fuelPrice,
            fuelThermalConsumption: industrialProcess.fuelThermalConsumption,
            comments: industrialProcess.comments,
            progress: industrialProcess.progress,
            filledFields: industrialProcess.filledFields,
            totalFields: industrialProcess.totalFields,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// Get all desired product forms
export const getAllDesiredProducts = async (req, res, next) => {
    try {
        const desiredProducts = await DesiredProduct.find();
        return res.status(200).json({
            message: "Desired product forms retrieved successfully",
            desiredProducts,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error listing desired products",
            cause: error.message,
        });
    }
};
// Create a desired product form
export const createDesiredProduct = async (req, res, next) => {
    try {
        const { companyID } = req.body;
        const existingProduct = await DesiredProduct.findOne({ companyID });
        if (existingProduct)
            return res.status(401).send("This company already has a desired product form registered");
        const today = new Date();
        const desiredProduct = new DesiredProduct({
            companyID,
            dateCreated: today,
            electricity: null,
            thermalEnergy: null,
            coGeneration: null,
            warmWater: null,
            warmAir: null,
            requiredUptime: null,
            comments: null,
            progress: 0 // Progress set to 0 on creation
        });
        await desiredProduct.save();
        return res.status(201).json({ message: "Desired product form created successfully", desiredProduct: desiredProduct.companyID });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating desired product form", cause: error.message });
    }
};
// Edit an existing desired product form
export const editDesiredProduct = async (req, res, next) => {
    try {
        const { companyID, ...formData } = req.body;
        const existingProduct = await DesiredProduct.findOne({ companyID });
        if (!existingProduct)
            return res.status(404).send("Desired product form not found");
        const latestVersion = await DesiredProductHistory.findOne({ companyID }).sort({ version: -1 }).select("version");
        const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;
        const newVersion = new DesiredProductHistory({
            ...existingProduct.toObject(),
            _id: undefined,
            version: newVersionNumber,
            timestamp: new Date(),
        });
        await newVersion.save();
        const totalFields = 7; // Adjust based on your form
        const { progress, filledFields, totalFields: fields } = calculateProgress(formData, totalFields);
        // Update userID with the user who made the edit
        const userID = res.locals.jwtData.id;
        Object.assign(existingProduct, formData, { userID, progress, filledFields, totalFields: fields });
        await existingProduct.save();
        return res.status(200).json({ message: "Desired product form updated successfully", form: existingProduct });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error editing desired product form", cause: error.message });
    }
};
// Verify desired product form by companyID
export const verifyDesiredProduct = async (req, res, next) => {
    try {
        // Get the company's _id from the token
        const companyId = res.locals.jwtData.companyID;
        // Find the desired product form by the companyID
        const desiredProduct = await DesiredProduct.findOne({ companyID: companyId });
        if (!desiredProduct) {
            return res.status(401).send("Desired product form not registered or company ID mismatch");
        }
        return res.status(200).json({
            message: "OK",
            companyID: desiredProduct.companyID,
            dateCreated: desiredProduct.dateCreated,
            electricity: desiredProduct.electricity,
            thermalEnergy: desiredProduct.thermalEnergy,
            coGeneration: desiredProduct.coGeneration,
            warmWater: desiredProduct.warmWater,
            warmAir: desiredProduct.warmAir,
            requiredUptime: desiredProduct.requiredUptime,
            comments: desiredProduct.comments,
            progress: desiredProduct.progress, // Include progress in the response
            filledFields: desiredProduct.filledFields,
            totalFields: desiredProduct.totalFields,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=biorefinery-controllers.js.map