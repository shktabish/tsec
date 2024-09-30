import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Connection } from "../models/connection.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new connection
export const createConnection = asyncHandler(async (req, res) => {
    const { student_id, mentor_id } = req.body;

    const connection = await Connection.create({
        student_id,
        mentor_id,
    });

    return res.status(201).json(new ApiResponse(201, connection, "Connection created successfully!"));
});

// Get all connections
export const getAllConnections = asyncHandler(async (req, res) => {
    try {
        // Fetch all connections and populate the fields
        const connections = await Connection.find()
            .populate('student_id', 'first_name last_name role') // Populate fields for student
            .populate('mentor_id', 'first_name last_name role'); // Populate fields for mentor

        // Return the success response
        return res.status(200).json(new ApiResponse(200, connections, "Connections fetched successfully!"));
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching connections:", error);
        
        // Return a server error response
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});


// Get connection by ID
import mongoose from 'mongoose'; // Ensure this is imported

export const getConnectionById = asyncHandler(async (req, res) => {
    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new ApiError(400, "Invalid connection ID format");
    }

    // Fetch the connection by ID and populate the fields
    const connection = await Connection.findById(req.params.id)
        .populate('student_id', 'first_name last_name role') // Populate only necessary fields
        .populate('mentor_id', 'first_name last_name role');

    // Check if the connection exists
    if (!connection) {
        throw new ApiError(404, "Connection not found");
    }

    // Return the response with the fetched connection
    return res.status(200).json(new ApiResponse(200, connection, "Connection fetched successfully!"));
});


// Update connection
export const updateConnection = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const connection = await Connection.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!connection) {
        throw new ApiError(404, "Connection not found");
    }

    return res.status(200).json(new ApiResponse(200, connection, "Connection updated successfully!"));
});

// Delete connection
export const deleteConnection = asyncHandler(async (req, res) => {
    const connection = await Connection.findByIdAndDelete(req.params.id);

    if (!connection) {
        throw new ApiError(404, "Connection not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Connection deleted successfully!"));
});
