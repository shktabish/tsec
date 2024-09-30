import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { TutoringSession } from "../models/tutoringSession.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new tutoring session
export const createSession = asyncHandler(async (req, res) => {
    const { student_ids, mentor_id, subject, date, time, duration } = req.body;

    const session = await TutoringSession.create({
        session_id: `session_${Date.now()}`, // Generate a session ID (you can use a different approach)
        student_ids,
        mentor_id,
        subject,
        date,
        time,
        duration,
    });

    return res.status(201).json(new ApiResponse(200, session, "Tutoring session created successfully!"));
});

// Get all tutoring sessions
export const getAllSessions = asyncHandler(async (req, res) => {
    const sessions = await TutoringSession.find()
        .populate('student_ids', 'first_name last_name')
        .populate('mentor_id', 'first_name last_name');

    return res.status(200).json(new ApiResponse(200, sessions, "Tutoring sessions fetched successfully!"));
});

// Get a tutoring session by ID
export const getSessionById = asyncHandler(async (req, res) => {
    const session = await TutoringSession.findById(req.params.id)
        .populate('student_ids', 'first_name last_name')
        .populate('mentor_id', 'first_name last_name');

    if (!session) {
        throw new ApiError(404, "Tutoring session not found");
    }

    return res.status(200).json(new ApiResponse(200, session, "Tutoring session fetched successfully!"));
});

// Update a tutoring session
export const updateSession = asyncHandler(async (req, res) => {
    const { student_ids, mentor_id, subject, date, time, duration, status } = req.body;
    const session = await TutoringSession.findByIdAndUpdate(req.params.id, {
        student_ids,
        mentor_id,
        subject,
        date,
        time,
        duration,
        status,
    }, { new: true });

    if (!session) {
        throw new ApiError(404, "Tutoring session not found");
    }

    return res.status(200).json(new ApiResponse(200, session, "Tutoring session updated successfully!"));
});

// Delete a tutoring session
export const deleteSession = asyncHandler(async (req, res) => {
    const session = await TutoringSession.findByIdAndDelete(req.params.id);

    if (!session) {
        throw new ApiError(404, "Tutoring session not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Tutoring session deleted successfully!"));
});
