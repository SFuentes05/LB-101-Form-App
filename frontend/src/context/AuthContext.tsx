import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { 
    checkUserAuthStatus, 
    checkSolarPanelAuthStatus, 
    checkInfrastructureAuthStatus, 
    checkCompanyAuthStatus,
    checkFormAuthStatus, 
    editCompany, 
    editSolarPanel, 
    editInfrastructure, 
    editForm, 
    getAllForms,
    editUser, 
    loginUser, 
    logoutUser, 
    signupUser,
    addTeamMember as addTeamMemberAPI,
} from "../helpers/api-communicator.ts";
import toast from "react-hot-toast";

type User = {
    _id: string;
    firstName: string; 
    lastName: string; 
    company?: string; 
    country?: string; 
    jobTitle?: string;
    phoneNumber?: string;
    email: string;
    companyID: string;  
};

type TeamMember = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    permissions: string[];
    phoneNumber?: string;
    jobTitle?: string;
};

type Company = {
    companyID: string;  
    dateCreated: Date;
    name: string;
    desiredProduct: string[];
    commercialAddress: string;
    plantAddress: string;
    seaLevel: string;
    taxID: string;
    webURL: string;
    processDescription: string;
    countriesExport: string[];
    exportPercentage: number;
    comments: string;
};

type SolarPanel = {
    companyID: string;  
    userID: string;
    dateCreated: Date;
    installationLocation: string;
    agroProduction: string;
    energyConsumption: string;
    consumptionPattern: string;
    monthlyEnergyCost: number;
    primaryEnergySource: string;
    visitAvailability: Date;
    contactPreference: string;
    availableSpace: string;
    ceilingType: string;
    climateCondition: string;
    electricInfrastructure: string;
    financingAvailability: string;
    ROI: string;
    subsidies: string;
    desiredInstallationTime: string;
    dueDate: string;
    comments: string;
    progress?: number;
    filledFields?: number;
    totalFields?: number;
};

type Infrastructure = {
    userID: string;
    companyID: string;  
    dateCreated: Date;
    availableSpace: string;
    maxDistance: string;
    constructure: string;
    basicServices: string;
    dirtQuality: string;
    voltageRegulator: string;
    comments: string;
    progress?: number;
    filledFields?: number;
    totalFields?: number;
};

type Form = {
    companyID: string;
    userID: string;
    dateCreated: Date;
    biomassType: string;
    biomass: string;
    annualProductionQuantity: number;
    energyGenerationType: string;
    annualOperatingHours: number;
    thermalDemand: number;
    fuelType: string;
    fuelConsumption: number;
    fuelMarketPrice: number;
    boilerModel: string;
    burnerPlate: string;
    electricalDemand: number;
    energyCost: number;
    comments: string;
    progress?: number;
    filledFields?: number;
    totalFields?: number;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    company: Company | null;
    companyProgress: number;
    solarPanel: SolarPanel | null;
    solarPanelProgress: number;
    infrastructure: Infrastructure | null;
    infrastructureProgress: number;
    forms: Form | null; 
    formProgress: number;
    login: (email: string, password: string) => Promise<void>;
    signup: (
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string, 
        company?: string, 
        country?: string, 
        jobTitle?: string, 
        phoneNumber?: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    userEdit: (
        firstName: string, 
        lastName: string, 
        company: string, 
        country: string, 
        jobTitle: string, 
        phoneNumber: string, 
        email: string
    ) => Promise<void>;
    teamMembers: TeamMember[] | null;
    addTeamMember: (
        adminId: string,
        firstName: string,
        lastName: string,
        email: string,
        permissions: string,
        phoneNumber: string,
        jobTitle: string
    ) => Promise<void>;
    companyEdit: (
        companyID: string,  
        dateCreated: Date,
        name: string, 
        desiredProduct: string[],
        commercialAddress: string, 
        plantAddress: string, 
        seaLevel: string, 
        taxID: string, 
        webURL: string, 
        processDescription: string, 
        countriesExport: string[], 
        exportPercentage: number, 
        comments: string
    ) => Promise<void>;
    solarPanelEdit: (
        companyID: string,
        userID: string,
        dateCreated: Date,
        installationLocation: string,
        agroProduction: string,
        energyConsumption: string,
        consumptionPattern: string,
        monthlyEnergyCost: number,
        primaryEnergySource: string,
        visitAvailability: Date,
        contactPreference: string,
        availableSpace: string,
        ceilingType: string,
        climateCondition: string,
        electricInfrastructure: string,
        financingAvailability: string,
        ROI: string,
        subsidies: string,
        desiredInstallationTime: string,
        dueDate: string,
        comments: string
    ) => Promise<void>;
    infrastructureEdit: (
        companyID: string,
        userID: string,
        dateCreated: Date,
        availableSpace: string,
        maxDistance: string,
        constructure: string,
        basicServices: string,
        dirtQuality: string,
        voltageRegulator: string,
        comments: string
    ) => Promise<void>;
    formEdit: (
        companyID: string,
        userID: string,
        dateCreated: Date,
        biomass: string,
        biomassType: string,
        annualProductionQuantity: number,
        energyGenerationType: string,
        thermalDemand: number,
        electricalDemand: number,
        annualOperatingHours: number,
        fuelType: string,
        fuelConsumption: number,
        fuelMarketPrice: number,
        boilerModel: string,
        burnerPlate: string,
        energyCost: number,
        comments: string
    ) => Promise<void>;
    getAllForms: () => Promise<void>; 
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [companyProgress, setCompanyProgress] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [solarPanel, setSolarPanel] = useState<SolarPanel | null>(null);
    const [solarPanelProgress, setSolarPanelProgress] = useState<number>(0);
    const [infrastructure, setInfrastructure] = useState<Infrastructure | null>(null);
    const [infrastructureProgress, setInfrastructureProgress] = useState<number>(0);
    const [formProgress, setFormProgress] = useState<number>(0);
    const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
    const [forms, setForms] = useState<Form | null>(null); 

    useEffect(() => {
        checkUserStatus();
        checkCompanyStatus();
        checkSolarPanelStatus();
        checkInfrastructureStatus();
        checkFormStatus(); 
    }, []);

    const checkUserStatus = async () => {
        try {
            const data = await checkUserAuthStatus();
            if (data) {
                setUser({
                    _id: data._id,
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    company: data.company || "",
                    country: data.country || "",
                    jobTitle: data.jobTitle || "",
                    phoneNumber: data.phoneNumber || "",
                    email: data.email,
                    companyID: data.companyID  
                });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error checking user auth status:', error);
        }
    };

    const checkCompanyStatus = async () => {
        try {
            const data = await checkCompanyAuthStatus();
            if (data) {
                setCompany({
                    companyID: data.companyID,  
                    dateCreated: data.dateCreated || new Date(),
                    name: data.name || "",
                    desiredProduct: data.desiredProduct || [],
                    commercialAddress: data.commercialAddress || "",
                    plantAddress: data.plantAddress || "",
                    seaLevel: data.seaLevel || "",
                    taxID: data.taxID || "",
                    webURL: data.webURL || "",
                    processDescription: data.processDescription || "",
                    countriesExport: data.countriesExport || [],
                    exportPercentage: data.exportPercentage || 0,
                    comments: data.comments || ""
                });
                setCompanyProgress(data.progress || 0); 
            }
        } catch (error) {
            console.error('Error checking company auth status:', error);
        }
    };

    const checkSolarPanelStatus = async () => {
        try {
            const data = await checkSolarPanelAuthStatus();
            if (data) {
                setSolarPanel({
                    companyID: data.companyID,
                    userID: data.userID,
                    dateCreated: data.dateCreated || new Date(),
                    installationLocation: data.installationLocation,
                    agroProduction: data.agroProduction,
                    energyConsumption: data.energyConsumption,
                    consumptionPattern: data.consumptionPattern,
                    monthlyEnergyCost: data.monthlyEnergyCost,
                    primaryEnergySource: data.primaryEnergySource,
                    visitAvailability: data.visitAvailability,
                    contactPreference: data.contactPreference,
                    availableSpace: data.availableSpace,
                    ceilingType: data.ceilingType,
                    climateCondition: data.climateCondition,
                    electricInfrastructure: data.electricInfrastructure,
                    financingAvailability: data.financingAvailability,
                    ROI: data.ROI,
                    subsidies: data.subsidies,
                    desiredInstallationTime: data.desiredInstallationTime,
                    dueDate: data.dueDate,
                    comments: data.comments,
                    progress: data.progress,
                    filledFields: data.filledFields,
                    totalFields: data.totalFields,
                });
                setSolarPanelProgress(data.progress || 0);
            }
        } catch (error) {
            console.error('Error checking solar panel auth status:', error);
        }
    };

    const checkInfrastructureStatus = async () => {
        try {
            const data = await checkInfrastructureAuthStatus();
            if (data) {
                setInfrastructure({
                    userID: data.userID,
                    companyID: data.companyID,  
                    dateCreated: data.dateCreated || new Date(),
                    availableSpace: data.availableSpace || "",
                    maxDistance: data.maxDistance || "",
                    constructure: data.constructure || "",
                    basicServices: data.basicServices || "",
                    dirtQuality: data.dirtQuality || "",
                    voltageRegulator: data.voltageRegulator || "",
                    comments: data.comments || "",
                    progress: data.progress || 0,
                    filledFields: data.filledFields || 0,
                    totalFields: data.totalFields || 0,
                });
                setInfrastructureProgress(data.progress || 0); 
            }
        } catch (error) {
            console.error('Error checking infrastructure status:', error);
        }
    };

    const checkFormStatus = async () => {
        try {
            const data = await checkFormAuthStatus();
            if (data) {
                setForms({
                    companyID: data.companyID,  
                    userID: data.userID,
                    dateCreated: data.dateCreated || new Date(),
                    biomassType: data.biomassType || "",
                    biomass: data.biomass || [],
                    annualProductionQuantity: data.annualProductionQuantity || 0,
                    energyGenerationType: data.energyGenerationType || [],
                    annualOperatingHours: data.annualOperatingHours || 0,
                    thermalDemand: data.thermalDemand || 0,
                    fuelType: data.fuelType || "",
                    fuelConsumption: data.fuelConsumption || 0,
                    fuelMarketPrice: data.fuelMarketPrice || 0,
                    boilerModel: data.boilerModel || "",
                    burnerPlate: data.burnerPlate || "",
                    electricalDemand: data.electricalDemand || 0,
                    energyCost: data.energyCost || 0,
                    comments: data.comments || "",
                    progress: data.progress || 0,
                    filledFields: data.filledFields || 0,
                    totalFields: data.totalFields || 0,
                });
                setFormProgress(data.progress || 0);
            }
        } catch (error) {
            console.error('Error checking form status:', error);
        }
    };

    const fetchAllForms = async () => {
        try {
            const data = await getAllForms();
            setForms(data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    const formEdit = async (
        companyID: string,
        userID: string,
        dateCreated: Date,
        biomass: string,
        biomassType: string,
        annualProductionQuantity: number,
        energyGenerationType: string,
        thermalDemand: number,
        electricalDemand: number,
        annualOperatingHours: number,
        fuelType: string,
        fuelConsumption: number,
        fuelMarketPrice: number,
        boilerModel: string,
        burnerPlate: string,
        energyCost: number,
        comments: string
    ) => {
        try {
            const data = await editForm(
                companyID,
                userID,
                dateCreated,
                biomass,
                biomassType,
                annualProductionQuantity,
                energyGenerationType,
                thermalDemand,
                electricalDemand,
                annualOperatingHours,
                fuelType,
                fuelConsumption,
                fuelMarketPrice,
                boilerModel,
                burnerPlate,
                energyCost,
                comments
            );
            if (data) {
                setForms({
                    companyID: data.companyID,  
                    userID: data.userID,
                    dateCreated: data.dateCreated || new Date(),
                    biomassType: data.biomassType || "",
                    biomass: data.biomass || [],
                    annualProductionQuantity: data.annualProductionQuantity || 0,
                    energyGenerationType: data.energyGenerationType || [],
                    annualOperatingHours: data.annualOperatingHours || 0,
                    thermalDemand: Number(thermalDemand),
                    fuelType,
                    fuelConsumption: Number(fuelConsumption),
                    fuelMarketPrice: Number(fuelMarketPrice),
                    boilerModel: data.boilerModel || "",
                    burnerPlate: data.burnerPlate || "",
                    electricalDemand: data.electricalDemand || 0,
                    energyCost: data.energyCost || 0,
                    comments: data.comments || "",
                    progress: data.progress || 0,
                    filledFields: data.filledFields || 0,
                    totalFields: data.totalFields || 0,
                });
                setFormProgress(data.progress || 0);
            }
            toast.success("Form Information Updated Successfully", { id: "editForm" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to Update Form Information", { id: "editForm" });
        }
    };
    
    const solarPanelEdit = async (
        companyID: string,
        userID: string,
        dateCreated: Date,
        installationLocation: string,
        agroProduction: string,
        energyConsumption: string,
        consumptionPattern: string,
        monthlyEnergyCost: number,
        primaryEnergySource: string,
        visitAvailability: Date,
        contactPreference: string,
        availableSpace: string,
        ceilingType: string,
        climateCondition: string,
        electricInfrastructure: string,
        financingAvailability: string,
        ROI: string,
        subsidies: string,
        desiredInstallationTime: string,
        dueDate: string,
        comments: string
    ) => {
        try {
            const data = await editSolarPanel(
                companyID,
                userID,
                dateCreated,
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
            );
            if (data) {
                setSolarPanel({
                    companyID: data.companyID,
                    userID: data.userID,
                    dateCreated: data.dateCreated || new Date(),
                    installationLocation: data.installationLocation || "",
                    agroProduction: data.agroProduction || "",
                    energyConsumption: data.energyConsumption || "",
                    consumptionPattern: data.consumptionPattern || "",
                    monthlyEnergyCost: data.monthlyEnergyCost || 0,
                    primaryEnergySource: data.primaryEnergySource || "",
                    visitAvailability: data.visitAvailability || new Date(),
                    contactPreference: data.contactPreference || "",
                    availableSpace: data.availableSpace || "",
                    ceilingType: data.ceilingType || "",
                    climateCondition: data.climateCondition || "",
                    electricInfrastructure: data.electricInfrastructure || "",
                    financingAvailability: data.financingAvailability || "",
                    ROI: data.ROI || "",
                    subsidies: data.subsidies || "",
                    desiredInstallationTime: data.desiredInstallationTime || "",
                    dueDate: data.dueDate || "",
                    comments: data.comments || "",
                    progress: data.progress || 0,
                    filledFields: data.filledFields || 0,
                    totalFields: data.totalFields || 0,
                });
                setSolarPanelProgress(data.progress || 0);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to Update Solar Panel Information", { id: "editSolarPanel" });
        }
    };

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({
                _id: data._id,
                firstName: data.firstName, 
                lastName: data.lastName, 
                company: data.company, 
                country: data.country, 
                jobTitle: data.jobTitle, 
                phoneNumber: data.phoneNumber, 
                email: data.email,
                companyID: data.companyID  
            });
            setIsLoggedIn(true);
        }
    };

    const signup = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        company: string = "",
        country: string = "",
        jobTitle: string = "",
        phoneNumber: string = ""
    ) => {
        const data = await signupUser(firstName, lastName, company, country, jobTitle, phoneNumber, email, password);
        if (data) {
            setUser({
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                company: data.company || "",
                country: data.country || "",
                jobTitle: data.jobTitle || "",
                phoneNumber: data.phoneNumber || "",
                email: data.email,
                companyID: data.companyID  
            });
            setIsLoggedIn(true);
        }
    };

    const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        setCompany(null);
        setSolarPanel(null);
        setInfrastructure(null);
        setForms(null); 
        window.location.reload();
    };

    const userEdit = async (
        firstName: string,
        lastName: string,
        company: string = "",
        country: string = "",
        jobTitle: string = "",
        phoneNumber: string = "",
        email: string
    ) => {
        try {
            const data = await editUser(firstName, lastName, company, country, jobTitle, phoneNumber, email);
            if (data) {
                setUser({
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    company: data.company || "",
                    country: data.country || "",
                    jobTitle: data.jobTitle || "",
                    phoneNumber: data.phoneNumber || "",
                    email: data.email,
                    companyID: data.companyID  
                });
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const addTeamMember = async (
        adminId: string,
        firstName: string,
        lastName: string,
        email: string,
        permissions: string,
        phoneNumber: string,
        jobTitle: string
    ) => {
        try {
            const data = await addTeamMemberAPI(adminId, firstName, lastName, email, permissions, phoneNumber, jobTitle);
            if (data) {                setTeamMembers((prev) => prev ? [...prev, data.teamMember] : [data.teamMember]);
            }
        } catch (error) {
            console.error("Error adding team member:", error);
        }
    };

    const companyEdit = async (
        companyID: string,  
        dateCreated: Date,
        name: string,
        desiredProduct: string[],
        commercialAddress: string,
        plantAddress: string,
        seaLevel: string,
        taxID: string,
        webURL: string,
        processDescription: string,
        countriesExport: string[],
        exportPercentage: number,
        comments: string,
    ) => {
        try {
            const data = await editCompany(companyID, dateCreated, name, desiredProduct, commercialAddress, plantAddress, seaLevel, taxID, webURL, processDescription, countriesExport, exportPercentage, comments);
            if (data) {
                setCompany({
                    companyID: data.companyID,  
                    dateCreated: data.dateCreated || new Date(),
                    name: data.name || "",
                    desiredProduct: data.desiredProduct || [],
                    commercialAddress: data.commercialAddress || "",
                    plantAddress: data.plantAddress || "",
                    seaLevel: data.seaLevel || "",
                    taxID: data.taxID || "",
                    webURL: data.webURL || "",
                    processDescription: data.processDescription || "",
                    countriesExport: data.countriesExport || [],
                    exportPercentage: data.exportPercentage || 0,
                    comments: data.comments || ""
                });
                setCompanyProgress(data.progress || 0); 
            }
        } catch (error) {
            console.error("Error updating company:", error);
        }
    };

    const getCompanyDetails = () => company;

    const getUserDetails = () => user;

    const getSolarPanelDetails = () => solarPanel;

    const infrastructureEdit = async (
        companyID: string,
        userID: string,
        dateCreated: Date,
        availableSpace: string,
        maxDistance: string,
        constructure: string,
        basicServices: string,
        dirtQuality: string,
        voltageRegulator: string,
        comments: string
    ) => {
        try {
            const data = await editInfrastructure(
                companyID,
                userID,
                dateCreated,
                availableSpace,
                maxDistance,
                constructure,
                basicServices,
                dirtQuality,
                voltageRegulator,
                comments
            );
            if (data) {
                setInfrastructure({
                    companyID: data.companyID,
                    userID: data.userID,
                    dateCreated: data.dateCreated || new Date(),
                    availableSpace: data.availableSpace || "",
                    maxDistance: data.maxDistance || "",
                    constructure: data.constructure || "",
                    basicServices: data.basicServices || "",
                    dirtQuality: data.dirtQuality || "",
                    voltageRegulator: data.voltageRegulator || "",
                    comments: data.comments || "",
                    progress: data.progress || 0,
                    filledFields: data.filledFields || 0,
                    totalFields: data.totalFields || 0,
                });
                setInfrastructureProgress(data.progress || 0);
            }
        } catch (error) {
            console.error("Error updating infrastructure:", error);
            throw error; // Re-throw the error so it can be caught in the component
        }
    };
    
    const getInfrastructureDetails = () => infrastructure;

    

    const value = {
        user,
        company,
        companyProgress,
        solarPanel,
        solarPanelProgress,
        infrastructure,
        infrastructureProgress,
        formProgress,
        forms, 
        teamMembers,
        isLoggedIn,
        login,
        logout,
        signup,
        userEdit,
        companyEdit,
        getCompanyDetails,
        getUserDetails,
        solarPanelEdit,
        getSolarPanelDetails,
        infrastructureEdit,
        getInfrastructureDetails,
        formEdit,
        getAllForms: fetchAllForms, 
        addTeamMember,
        checkSolarPanelStatus,
        checkFormStatus,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
