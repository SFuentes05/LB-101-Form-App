import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import Company from "../models/Company.js";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import SolarPanel from "../models/SolarPanel.js";
import Infrastructure from "../models/Infrastructure.js";
import IndustrialProcess from "../models/IndustrialProcess.js";
import DesiredProduct from "../models/DesiredProduct.js";
import Form from "../models/Form.js";

// Existing User Controllers
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error listing users: ", cause: error.message });
    }
};

const BACKEND_URL = 'https://lb-101-form-app-api.vercel.app';

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verificationToken = randomBytes(32).toString("hex");

        const { firstName, lastName, company, country, jobTitle, phoneNumber, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User with this email is already registered");

        const hashedPassword = await hash(password, 10);

        // Create the user without companyID first
        const user = new User({
            firstName,
            lastName,
            company,
            country,
            jobTitle,
            phoneNumber,
            permissions: ['admin'], // Admin role for the creator
            email,
            password: hashedPassword,
            verificationToken,
            isVerified: false
        });
        await user.save();

        const today = new Date();
        today.setDate(today.getDate());

        // Create the Company form with userID
        const newCompany = new Company({
            userID: user._id,
            dateCreated: today,
            name: company || null,
            desiredProduct: [], // Initialize as empty array or null
            commercialAddress: null,
            plantAddress: null,
            seaLevel: null,
            taxID: null,
            webURL: null,
            processDescription: null,
            countriesExport: [], // Initialize as empty array or null
            exportPercentage: null,
            comments: null
        });
        await newCompany.save();

        // Assign the companyID back to the user
        user.companyID = newCompany._id;
        await user.save(); // Save the user again with the companyID

        // Now create associated forms, passing the companyID from the user
        const solarPanel = new SolarPanel({
            userID: user._id,
            companyID: user.companyID, // Use the companyID from the user
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
            progress: 0, // Initialize progress
            filledFields: 0, // Initialize filled fields
            totalFields: 18 // Total number of fields
        });
        await solarPanel.save();

        const infrastructure = new Infrastructure({
            userID: user._id,
            companyID: user.companyID, // Use the companyID from the user
            dateCreated: today,
            availableSpace: null,
            maxDistance: null,
            constructure: null,
            basicServices: null,
            dirtQuality: null,
            voltageRegulator: null,
            comments: null,
            progress: 0, // Initialize progress
            filledFields: 0, // Initialize filled fields
            totalFields: 8
        });
        await infrastructure.save();

        const industrialProcess = new IndustrialProcess({
            userID: user._id,
            companyID: user.companyID, // Use the companyID from the user
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
            comments: null
        });
        await industrialProcess.save();

        const desiredProduct = new DesiredProduct({
            userID: user._id,
            companyID: user.companyID, // Use the companyID from the user
            dateCreated: today,
            electricity: null,
            thermalEnergy: null,
            coGeneration: null,
            warmWater: null,
            warmAir: null,
            requiredUptime: null,
            comments: null
        });
        await desiredProduct.save();

        // Create the Form associated with the user and company
        const form = new Form({
            userID: user._id,
            companyID: user.companyID, // Use the companyID from the user
            dateCreated: today,
            biomass: null,
            annualProductionQuantity: null,
            energyGenerationType: null,
            thermalDemand: null,
            electricalDemand: null,
            annualOperatingHours: null,
            fuelType: null,
            fuelConsumption: null,
            fuelMarketPrice: null,
            boilerModel: null,
            burnerPlate: null,
            energyCost: null,
            comments: null,
            progress: 0, // Initialize progress
            filledFields: 0, // Initialize filled fields
            totalFields: 13 // Total number of fields in the Form
        });
        await form.save();

        // Set up cookie and token with companyID included
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, user.companyID.toString(), "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({ message: "User, company, and forms created successfully", name: user.firstName, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating user: ", cause: error.message });
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, user.companyID.toString(), "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", name: user.firstName, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error logging in user: ", cause: error.message });
    }
};

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({
            message: "OK",
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            company: user.company,
            companyID: user.companyID,
            country: user.country,
            jobTitle: user.jobTitle,
            phoneNumber: user.phoneNumber,
            email: user.email,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });

        return res.status(200).json({ message: "OK", firstName: user.firstName, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const editUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { firstName, lastName, company, country, jobTitle, phoneNumber, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("User not found for email:", email);
            return res.status(404).send("User not found");
        }

        if (firstName) existingUser.firstName = firstName;
        if (lastName) existingUser.lastName = lastName;
        if (company) existingUser.company = company;
        if (country) existingUser.country = country;
        if (jobTitle) existingUser.jobTitle = jobTitle;
        if (phoneNumber) existingUser.phoneNumber = phoneNumber;

        await existingUser.save();

        return res.status(200).json({ message: "User updated successfully", user: existingUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error editing user", cause: error.message });
    }
};

export const addTeammate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, country, jobTitle, phoneNumber, email, password } = req.body;
        const currentUserId = res.locals.jwtData.id;
        
        const currentUser = await User.findById(currentUserId);
        if (!currentUser) return res.status(404).send("Current user not found");

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User with this email is already registered");

        const hashedPassword = await hash(password, 10);
        const teammate = new User({
            firstName,
            lastName,
            company: currentUser.company,
            companyID: currentUser.companyID,
            country,
            jobTitle,
            phoneNumber,
            permissions: ['teammate'], // Assign 'teammate' role
            email,
            password: hashedPassword,
            isVerified: false
        });
        await teammate.save();

        res.status(201).json({ message: "Teammate created successfully", teammate });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating teammate: ", cause: error.message });
    }
};
