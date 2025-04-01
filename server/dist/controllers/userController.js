"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../models/user");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const user = yield user_1.User.create({ name, email, password });
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.registerUser = registerUser;
exports.loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser && (yield existingUser.matchPassword(password))) {
        (0, generateToken_1.default)(res, existingUser._id);
        return res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
        });
    }
    else {
        return res.status(400).json({ msg: "Invalid Credentials" });
    }
}));
exports.logoutUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(0)
    });
    return res.status(200).json({ msg: "Logged out successfully" });
}));
exports.getUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = {
        _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
        email: (_c = req.user) === null || _c === void 0 ? void 0 : _c.email,
    };
    res.status(200).json(user);
}));
exports.updateUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = yield user.save();
    const selectedUser = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    };
    res.status(200).json(selectedUser);
}));
