
import jwt from 'jsonwebtoken'; // Import jwt
import { asyncHandler } from "../utils/asyncHandler.js"; // Import your async handler
import { ApiError } from "../utils/ApiError.js"; // Import your error handling utility
import { User } from "../models/user.model.js"; // Import your User model
import { ApiResponse } from "../utils/ApiResponse.js"; // Import your API response utility
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        
        const user = await User.findById(userId);
        

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
       
        user.refreshToken = refreshToken; // Save refresh token to user
        
        await user.save({ validateBeforeSave: false }); // Save user without validating

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
};

export const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, role, subjects } = req.body;

    console.log('Received registration data:', { first_name, last_name, email, password, role, subjects });

    if ([first_name, last_name, email, password, role].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    console.log('User exists:', userExists);

    if (userExists) {
        throw new ApiError(409, "User with this email already exists.");
    }

    let avatarLocalPath;
    if (req.file) {
        avatarLocalPath = req.file.path;
        console.log('Avatar local path:', avatarLocalPath); // Debugging line
    }

    if (!avatarLocalPath) {
        throw new Error('No file path provided for upload.');
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);


    const user = await User.create({ first_name, last_name, email, password,avatar: avatar?.url || "", role, subjects });
    console.log('User created:', user);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    console.log('Created user without password:', createdUser);

    if (!createdUser) {
        throw new ApiError(404, "Something went wrong while registering the user.");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Ensure cookies are only sent over HTTPS in production
        sameSite: 'Strict'  // Prevent cross-site request forgery
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    res.status(200).json({
        user: loggedInUser,
        accessToken,
        refreshToken
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure : true
    };

    console.log("Logged out successfully");

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ));
});

export const getUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('first_name last_name email role subjects'); // Fetch relevant fields

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ data: user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { first_name, last_name, bio, subjects } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { first_name, last_name, bio, subjects },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully!"));
});
