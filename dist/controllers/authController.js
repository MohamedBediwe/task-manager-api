"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        // Check if user exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create user
        const user = await User_1.default.create({
            email,
            password: hashedPassword,
            name,
        });
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Set httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }
        // Check password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Set httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// @desc    Get current user
// @route   GET /api/auth/me
const getMe = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.userId).select('-password');
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
// @desc    Logout user
// @route   POST /api/auth/logout
const logout = async (req, res, next) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map