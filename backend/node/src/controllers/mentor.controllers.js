import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Mentor } from "../models/mentor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"; // Assuming there is a User model
import mongoose from 'mongoose';

// Create a new mentor profile
export const createMentor = asyncHandler(async (req, res) => {
    const { currentProfession, yearsOfExperience, academicQualifications, skills } = req.body;

    const user = await User.findById(req.user._id); // assuming user ID is obtained from authenticated request
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const mentor = await Mentor.create({
        user: req.user._id, // Associate the authenticated user with the mentor
        currentProfession,
        yearsOfExperience,
        academicQualifications,
        skills,
    });

    return res.status(201).json(new ApiResponse(201, mentor, "Mentor profile created successfully!"));
});

// Get all mentors
export const getAllMentors = asyncHandler(async (req, res) => {
    const mentors = await Mentor.find().populate('user', 'first_name last_name email');

    return res.status(200).json(new ApiResponse(200, mentors, "Mentors fetched successfully!"));
});

// Get a mentor by ID
export const getMentorById = asyncHandler(async (req, res) => {
    const mentor = await Mentor.findById(req.params.id).populate('user', 'first_name last_name email');

    if (!mentor) {
        throw new ApiError(404, "Mentor not found");
    }

    return res.status(200).json(new ApiResponse(200, mentor, "Mentor profile fetched successfully!"));
});

// Update mentor profile
export const updateMentor = asyncHandler(async (req, res) => {
    const { currentProfession, yearsOfExperience, academicQualifications, skills } = req.body;

    const mentor = await Mentor.findByIdAndUpdate(
        req.params.id,
        { currentProfession, yearsOfExperience, academicQualifications, skills },
        { new: true }
    );

    if (!mentor) {
        throw new ApiError(404, "Mentor not found");
    }

    return res.status(200).json(new ApiResponse(200, mentor, "Mentor profile updated successfully!"));
});

// Delete a mentor profile
export const deleteMentor = asyncHandler(async (req, res) => {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);

    if (!mentor) {
        throw new ApiError(404, "Mentor not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Mentor profile deleted successfully!"));
});

