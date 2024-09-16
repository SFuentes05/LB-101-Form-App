import axios from "axios";

// User Authentication
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = res.data;
    return data;
};

export const signupUser = async (
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    jobTitle: string,
    phoneNumber: string,
    email: string,
    password: string
) => {
    const res = await axios.post("/user/signup", { firstName, lastName, company, country, jobTitle, phoneNumber, email, password });
    if (res.status !== 201) {
        throw new Error("Unable to signup");
    }
    const data = await res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
        throw new Error("Unable to logout user");
    }
    const data = await res.data;
    return data;
};

export const checkUserAuthStatus = async () => {
    const res = await axios.get("/user/auth-status", { withCredentials: true });
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

export const checkCompanyAuthStatus = async () => {
    const res = await axios.get("/company/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

export const checkSolarPanelAuthStatus = async () => {
    const res = await axios.get("/solar-panel/auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

// Biorefinery Authentication
export const checkDesiredProductAuthStatus = async () => {
    const res = await axios.get("/biorefinery/desired-product-auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

export const checkIndustrialProcessAuthStatus = async () => {
    const res = await axios.get("/biorefinery/industrial-process-auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

export const checkInfrastructureAuthStatus = async () => {
    const res = await axios.get("/biorefinery/infrastructure-auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

// Get all forms
export const getAllForms = async () => {
    try {
        const res = await axios.get("/biorefinery/get-form");
        if (res.status !== 200) {
            throw new Error("Unable to retrieve forms");
        }
        const data = res.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error retrieving forms:", error.message);
        } else if (error instanceof Error) {
            console.error("General error retrieving forms:", error.message);
        } else {
            console.error("Unknown error retrieving forms:", error);
        }
        throw error;
    }
};

// Create a new form
export const createForm = async (
    companyID: string,
    userID: string
) => {
    try {
        const res = await axios.post("/form/create", {
            companyID,
            userID,
        });
        if (res.status !== 201) {
            throw new Error("Unable to create form");
        }
        const data = res.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error creating form:", error.message);
        } else if (error instanceof Error) {
            console.error("General error creating form:", error.message);
        } else {
            console.error("Unknown error creating form:", error);
        }
        throw error;
    }
};

// Edit an existing form
export const editForm = async (
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
    const res = await axios.patch("/biorefinery/edit-form", {
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
    });
    if (res.status !== 200) {
        throw new Error("Unable to edit form");
    }
    const data = await res.data;
    return data;
};

// Verify form by companyID
export const verifyForm = async (
    companyID: string
) => {
    try {
        const res = await axios.get(`/form/verify/${companyID}`);
        if (res.status !== 200) {
            throw new Error("Unable to verify form");
        }
        const data = res.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error verifying form:", error.message);
        } else if (error instanceof Error) {
            console.error("General error verifying form:", error.message);
        } else {
            console.error("Unknown error verifying form:", error);
        }
        throw error;
    }
};

export const checkFormAuthStatus = async () => {
    const res = await axios.get("/biorefinery/form-auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};

// User Editing
export const editUser = async (
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    jobTitle: string,
    phoneNumber: string,
    email: string
) => {
    const res = await axios.patch("/user/edit-user", { firstName, lastName, company, country, jobTitle, phoneNumber, email });
    if (res.status !== 201) {
      throw new Error("Unable to edit user");
    }
    const data = await res.data;
    return data;
};

// Company Editing
export const editCompany = async (
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
    const res = await axios.patch("/company/edit-company", {
        companyID,
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
        comments
    });
    if (res.status !== 201) {
        throw new Error("Unable to edit company");
    }
    const data = await res.data;
    return data;
};

// Solar Panel Editing
export const editSolarPanel = async (
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
    const res = await axios.patch("/solar-panel/edit-solar-panel", {
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
    });
    if (res.status !== 200) {
      throw new Error("Unable to edit solar panel");
    }
    const data = await res.data;
    return data;
};

// Biorefinery Editing

// Edit Infrastructure
export const editInfrastructure = async (
    companyID: string,
    userID: string,
    dateCreated: Date,
    availableSpace: string,
    maxDistance: string,
    constructure: string,
    basicServices: string,
    dirtQuality: string,
    voltageRegulator: string,
    comments: string,
) => {
    const res = await axios.patch("/biorefinery/edit-infrastructure", {
        userID,
        companyID,
        dateCreated,
        availableSpace,
        maxDistance,
        constructure,
        basicServices,
        dirtQuality,
        voltageRegulator,
        comments
    });
    if (res.status !== 200) {
        throw new Error("Unable to edit infrastructure");
    }
    const data = await res.data;
    return data;
};

// Edit Industrial Process
export const editIndustrialProcess = async (
    companyID: string,
    dateCreated: Date,
    produceAmount: number,
    residueInventory: number,
    relativeHumidity: number,
    density: number,
    treatmentMethod: string,
    residueSupply: string,
    residueDisposition: string,
    electricityConsumption: number,
    operationHours: number,
    frequency: string,
    voltage: number,
    energyCost: number,
    energyPrice: number,
    powerPrice: number,
    transformerCapacity: number,
    PPACounterpart: string,
    fuelType: string,
    fuelConsumption: number,
    fuelConsumptionPeriod: string,
    thermalInstallation: number,
    thermalEnergyDemand: number,
    energyThermalPeriod: string,
    steamPressure: number,
    fuelPrice: number,
    fuelThermalConsumption: number,
    comments: string,
) => {
    const res = await axios.patch("/biorefinery/edit-industrial-process", {
        companyID,
        dateCreated,
        produceAmount,
        residueInventory,
        relativeHumidity,
        density,
        treatmentMethod,
        residueSupply,
        residueDisposition,
        electricityConsumption,
        operationHours,
        frequency,
        voltage,
        energyCost,
        energyPrice,
        powerPrice,
        transformerCapacity,
        PPACounterpart,
        fuelType,
        fuelConsumption,
        fuelConsumptionPeriod,
        thermalInstallation,
        thermalEnergyDemand,
        energyThermalPeriod,
        steamPressure,
        fuelPrice,
        fuelThermalConsumption,
        comments
    });
    if (res.status !== 201) {
      throw new Error("Unable to edit industrial process");
    }
    const data = await res.data;
    return data;
};

// Edit Desired Product
export const editDesiredProduct = async (
    companyID: string,
    dateCreated: Date,
    electricity: string,
    thermalEnergy: string,
    coGeneration: string,
    warmWater: string,
    warmAir: string,
    requiredUptime: string,
    comments: string,
) => {
    const res = await axios.patch("/biorefinery/edit-desired-product", {
        companyID,
        dateCreated,
        electricity,
        thermalEnergy,
        coGeneration,
        warmWater,
        warmAir,
        requiredUptime,
        comments
    });
    if (res.status !== 201) {
      throw new Error("Unable to edit desired product");
    }
    const data = await res.data;
    return data;
};

// Add Team Member
export const addTeamMember = async (
    firstName: string,
    lastName: string,
    country: string,
    jobTitle: string,
    phoneNumber: string,
    email: string,
    password: string
) => {
    try {
        const res = await axios.post("/team/add", {
            firstName,
            lastName,
            country,
            jobTitle,
            phoneNumber,
            email,
            password
        });
        if (res.status !== 201) {
            throw new Error("Unable to add team member");
        }
        const data = await res.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error adding team member:", error.message);
        } else if (error instanceof Error) {
            console.error("General error adding team member:", error.message);
        } else {
            console.error("Unknown error adding team member:", error);
        }
        throw error;
    }
};
