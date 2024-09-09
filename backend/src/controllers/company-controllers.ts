import { NextFunction, Request, Response } from "express";
import Company from "../models/Company.js";
import CompanyHistory from "../models/CompanyHistory.js";

export const getAllCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get all company forms directly from the database
        const companies = await Company.find();
        return res.status(200).json({ message: "Company forms retrieved successfully", companies });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error listing companies: ", cause: error.message });
    }
};

export const createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Create company form
        const { userID, dateCreated, name, desiredProduct, commercialAddress, plantAddress, seaLevel, taxID, webURL, processDescription, countriesExport, exportPercentage, comments } = req.body;

        const existingCompany = await Company.findOne({ userID });
        if (existingCompany) return res.status(401).send("This user already has a company form registered");

        const today = new Date();
        today.setDate(today.getDate());

        const company = new Company({
            userID: userID,
            dateCreated: today,
            name: name || null,
            desiredProduct: desiredProduct || [],
            commercialAddress: commercialAddress || null,
            plantAddress: plantAddress || null,
            seaLevel: seaLevel || null,
            taxID: taxID || null,
            webURL: webURL || null,
            processDescription: processDescription || null,
            countriesExport: countriesExport || [],
            exportPercentage: exportPercentage || null,
            comments: comments || null
        });
        await company.save();

        return res.status(201).json({ message: "Company form created successfully", company: company.userID });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating company form: ", cause: error.message });
    }
};

export const editCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            userID,
            dateCreated,
            name,
            desiredProduct,
            commercialAddress,
            plantAddress,
            seaLevel,
            taxID,
            webURL,
            processDescription,
            countriesExport,
            exportPercentage,
            comments,
        } = req.body;

        // Find the current form by userID
        const existingCompany = await Company.findOne({ userID });
        if (!existingCompany) {
            console.log("Company form not found for the userID provided:", userID);
            return res.status(404).send("Company form not found");
        }

        // Get the latest version number from the versions collection
        const latestVersion = await CompanyHistory.findOne({ userID })
            .sort({ version: -1 })
            .select("version");

        const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;

        // Save the current version of the form before updating
        const newVersion = new CompanyHistory({
            ...existingCompany.toObject(),
            _id: undefined,  // Ensure a new _id is generated
            version: newVersionNumber,
            timestamp: new Date(),
        });

        await newVersion.save();

        // Update the current form details
        if (dateCreated) existingCompany.dateCreated = dateCreated;
        if (name) existingCompany.name = name;
        if (desiredProduct) existingCompany.desiredProduct = desiredProduct;
        if (commercialAddress) existingCompany.commercialAddress = commercialAddress;
        if (plantAddress) existingCompany.plantAddress = plantAddress;
        if (seaLevel) existingCompany.seaLevel = seaLevel;
        if (taxID) existingCompany.taxID = taxID;
        if (webURL) existingCompany.webURL = webURL;
        if (processDescription) existingCompany.processDescription = processDescription;
        if (countriesExport) existingCompany.countriesExport = countriesExport;
        if (exportPercentage) existingCompany.exportPercentage = exportPercentage;
        if (comments) existingCompany.comments = comments;

        // Save the updated company form information
        await existingCompany.save();

        return res.status(200).json({
            message: "Company form updated successfully",
            form: existingCompany,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error editing company form",
            cause: error.message,
        });
    }
};

export const verifyCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get the user's _id from the token
        const userId = res.locals.jwtData.id;

        // Find the company form by the userID
        const company = await Company.findOne({ userID: userId });

        if (!company) {
            return res.status(401).send("Company not registered or user ID mismatch");
        }

        return res
            .status(200)
            .json({
                message: "OK",
                userID: company.userID,
                dateCreated: company.dateCreated,
                name: company.name,
                desiredProduct: company.desiredProduct,
                commercialAddress: company.commercialAddress,
                plantAddress: company.plantAddress,
                seaLevel: company.seaLevel,
                taxID: company.taxID,
                webURL: company.webURL,
                processDescription: company.processDescription,
                countriesExport: company.countriesExport,
                exportPercentage: company.exportPercentage,
                comments: company.comments,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
