import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Scholarship } from "../models/scholarship.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new scholarship
export const createScholarship = asyncHandler(async (req, res) => {
    const { name, description, eligibility, amount, deadline, application_link } = req.body;

    const scholarship = await Scholarship.create({
        name,
        description,
        eligibility,
        amount,
        deadline,
        application_link,
    });

    return res.status(201).json(new ApiResponse(200, scholarship, "Scholarship created successfully!"));
});

// Get all scholarships
export const getAllScholarships = asyncHandler(async (req, res) => {
    const scholarships = await Scholarship.find();

    return res.status(200).json(new ApiResponse(200, scholarships, "Scholarships fetched successfully!"));
});

// Get a scholarship by ID
export const getScholarshipById = asyncHandler(async (req, res) => {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship) {
        throw new ApiError(404, "Scholarship not found");
    }

    return res.status(200).json(new ApiResponse(200, scholarship, "Scholarship fetched successfully!"));
});

// Update a scholarship
export const updateScholarship = asyncHandler(async (req, res) => {
    const { name, description, eligibility, amount, deadline, application_link } = req.body;
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, {
        name,
        description,
        eligibility,
        amount,
        deadline,
        application_link,
    }, { new: true });

    if (!scholarship) {
        throw new ApiError(404, "Scholarship not found");
    }

    return res.status(200).json(new ApiResponse(200, scholarship, "Scholarship updated successfully!"));
});

// Delete a scholarship
export const deleteScholarship = asyncHandler(async (req, res) => {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);

    if (!scholarship) {
        throw new ApiError(404, "Scholarship not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Scholarship deleted successfully!"));
});
