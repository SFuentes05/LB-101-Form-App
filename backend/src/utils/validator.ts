import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters"),
];
export const signupValidator = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("company").optional().trim().isString().withMessage("Company must be a string"),
    body("country").optional().trim().isString().withMessage("Country must be a string"),
    body("jobTitle").optional().trim().isString().withMessage("Job title must be a string"),
    body("phoneNumber").optional().trim().isString().withMessage("Phone number must be a string"),
    ...loginValidator,
];
export const editUserValidator = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("company").optional().trim().isString().withMessage("Company must be a string"),
    body("country").optional().trim().isString().withMessage("Country must be a string"),
    body("jobTitle").optional().trim().isString().withMessage("Job title must be a string"),
    body("phoneNumber").optional().trim().isString().withMessage("Phone number must be a string"),
    body("email").trim().isEmail().withMessage("Email is required"),
];
export const editCompanyValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("commercialAddress").notEmpty().withMessage("Commercial address is required"),
    body("plantAddress").optional().trim().isString().withMessage("Plant address must be a string"),
    body("seaLevel").optional().isNumeric().withMessage("Sea level must be a number"),
    body("taxID").optional().trim().isString().withMessage("Tax ID must be a string"),
    body("webURL").optional().trim().isString().withMessage("Web URL must be a valid URL"),
    body("processDescription").optional().trim().isString().withMessage("Process description must be a string"),
    body("countriesExport").optional().isArray().withMessage("Countries export must be an array"),
    body("exportPercentage").optional().isNumeric().withMessage("Export percentage must be a number"),
    body("comments").optional().trim().isString().withMessage("Comments must be a string"),
];
//# sourceMappingURL=validator.js.map