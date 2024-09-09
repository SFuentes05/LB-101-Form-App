import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import SolarPanel from "../models/SolarPanel.js";
import { SolarPanelHistory } from "../models/SolarPanelHistory.js";

export const getAllSolarPanels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      // Get all Solar Panel forms directly from the database
      const infrastructure = await SolarPanel.find();
      return res.status(200).json({message:"Solar Panel form retrieved successfully", infrastructure });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error listing solar panel forms: ", cause:error.message });
  }
};

const calculateProgress = (formData, totalFields, excludeFields = ['companyID', 'userID', 'dateCreated']) => {
  const relevantFields = Object.entries(formData).filter(([key, value]) => !excludeFields.includes(key));
  const filledFields = relevantFields.filter(([key, value]) => value !== null && value !== undefined && value !== '').length;
  const progress = ((filledFields / totalFields) * 100).toFixed(1);  // Round to one decimal point
  return { progress: parseFloat(progress), filledFields, totalFields };
};

export const createSolarPanel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const { companyID } = req.body;

      // Convert companyID to ObjectId
      const companyObjectId = new mongoose.Types.ObjectId(companyID);

      const existingSolarPanel = await SolarPanel.findOne({ companyID: companyObjectId });
      if (existingSolarPanel) return res.status(401).send("This company already has a solar panel form registered");

      const today = new Date();

      const solarPanel = new SolarPanel({
          companyID: companyObjectId,
          dateCreated: today,
          installationLocation: null,
          agroProduction: null,
          energyConsumption: null,
          consumptionPattern: null,
          monthlyEnergyCost: null,
          primaryEnergySource: null,
          visitAvailability: null,
          contactPreference: null,
          availableSpace: null,
          ceilingType: null,
          climateCondition: null,
          electricInfrastructure: null,
          financingAvailability: null,
          ROI: null,
          subsidies: null,
          desiredInstallationTime: null,
          dueDate: null,
          comments: null,
          progress: 0, // Progress set to 0 on creation
          filledFields: 0,
          totalFields: 18,
      });

      await solarPanel.save();

      return res.status(201).json({ message: "Solar panel form created successfully", solarPanel: solarPanel.companyID });
  } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error creating solar panel form: ", cause: error.message });
  }
};

export const editSolarPanel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { 
      companyID, 
      userID, 
      installationLocation,
      agroProduction,
      energyConsumption,
      consumptionPattern,
      monthlyEnergyCost,
      primaryEnergySource,
      visitAvailability,
      contactPreference,
      availableSpace,
      ceilingType,
      climateCondition,
      electricInfrastructure,
      financingAvailability,
      ROI,
      subsidies,
      desiredInstallationTime,
      dueDate,
      comments
    } = req.body;

    // Convert string IDs to ObjectId
    const companyObjectId = new mongoose.Types.ObjectId(companyID);
    const userObjectId = new mongoose.Types.ObjectId(userID);

    const existingSolarPanel = await SolarPanel.findOne({ companyID: companyObjectId });
    if (!existingSolarPanel) {
      return res.status(404).send("Solar panel form not found");
    }

    const latestVersion = await SolarPanelHistory.findOne({ companyID: companyObjectId }).sort({ version: -1 }).select("version");
    const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;

    const newVersion = new SolarPanelHistory({
      ...existingSolarPanel.toObject(),
      _id: undefined,
      version: newVersionNumber,
      timestamp: new Date(),
      userID: userObjectId, // Save the ID of the user making the update
    });

    await newVersion.save();

    const totalFields = 18; // Adjust based on your form
    const { progress, filledFields, totalFields: fields } = calculateProgress(req.body, totalFields);

    Object.assign(existingSolarPanel, { 
      installationLocation,
      agroProduction,
      energyConsumption,
      consumptionPattern,
      monthlyEnergyCost,
      primaryEnergySource,
      visitAvailability,
      contactPreference,
      availableSpace,
      ceilingType,
      climateCondition,
      electricInfrastructure,
      financingAvailability,
      ROI,
      subsidies,
      desiredInstallationTime,
      dueDate,
      comments,
      progress, 
      filledFields, 
      totalFields: fields, 
      userID: userObjectId 
    });
    await existingSolarPanel.save();

    return res.status(200).json({ message: "Solar panel form updated successfully", form: existingSolarPanel });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error editing solar panel form", cause: error.message });
  }
};

export const verifySolarPanel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the company's _id from the token
    const companyID = res.locals.jwtData.companyID;

    // Convert companyID to ObjectId
    const companyObjectId = new mongoose.Types.ObjectId(companyID);

    // Find the solar panel form by the companyID
    const solarPanel = await SolarPanel.findOne({ companyID: companyObjectId });

    if (!solarPanel) {
      return res.status(401).send("Solar panel not registered or company ID mismatch");
    }
    
    return res.status(200).json({ 
        message: "OK",
        companyID: solarPanel.companyID,
        dateCreated: solarPanel.dateCreated,
        installationLocation: solarPanel.installationLocation,
        agroProduction: solarPanel.agroProduction,
        energyConsumption: solarPanel.energyConsumption,
        consumptionPattern: solarPanel.consumptionPattern,
        monthlyEnergyCost: solarPanel.monthlyEnergyCost,
        primaryEnergySource: solarPanel.primaryEnergySource,
        visitAvailability: solarPanel.visitAvailability,
        contactPreference: solarPanel.contactPreference,
        availableSpace: solarPanel.availableSpace,
        ceilingType: solarPanel.ceilingType,
        climateCondition: solarPanel.climateCondition,
        electricInfrastructure: solarPanel.electricInfrastructure,
        financingAvailability: solarPanel.financingAvailability,
        ROI: solarPanel.ROI,
        subsidies: solarPanel.subsidies,
        desiredInstallationTime: solarPanel.desiredInstallationTime,
        dueDate: solarPanel.dueDate,
        comments: solarPanel.comments,
        progress: solarPanel.progress,
        filledFields: solarPanel.filledFields,
        totalFields: solarPanel.totalFields,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};