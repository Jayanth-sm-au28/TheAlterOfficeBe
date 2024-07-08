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
exports.getUserDetails = exports.getExistingUserDetails = exports.createNewUser = exports.uploadAvatar = exports.updateUserAvatar = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
cloudinary_1.default.v2.config({
    cloud_name: "dy0f5bsqg",
    api_key: "279213121946535",
    api_secret: "iJzNDc8gEXBUQJCu2o6UbV7rsGg",
});
const updateUserAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const file = req.file;
        const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(file.path, {
            folder: "avatars",
        });
        if (uploadResponse.secure_url) {
            return res.status(200).json({
                message: "Avatar updated successfully",
                success: uploadResponse.secure_url,
            });
        }
        else {
            return res.status(400).json({
                message: "Error uploading Avatar",
                error: `An error occurred during the upload. Please check your network connection and try again.`,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error",
            error: `An unexpected error occurred during the upload. Please contact support if the issue persists.`,
        });
    }
});
exports.updateUserAvatar = updateUserAvatar;
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const file = req.file;
        const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(file.path, {
            folder: "avatars",
        });
        if (uploadResponse.secure_url) {
            yield User_1.default.findByIdAndUpdate(req.params.id, { avatarUrl: uploadResponse.secure_url }, { new: true });
            return res.status(200).json({
                message: "Avatar updated successfully",
                success: uploadResponse.secure_url,
            });
        }
        else {
            return res.status(400).json({
                message: "Error uploading Avatar",
                error: `An error occurred during the upload. Please check your network connection and try again.`,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error",
            error: `An unexpected error occurred during the upload. Please contact support if the issue persists.`,
        });
    }
});
exports.uploadAvatar = uploadAvatar;
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new User_1.default({
            username: "dummy",
            avatarUrl: null,
        });
        const user = yield newUser.save();
        return user._id.toString();
    }
    catch (error) {
        console.error("Error creating new user:", error);
        throw error;
    }
});
exports.createNewUser = createNewUser;
const getExistingUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getExistingUserDetails = getExistingUserDetails;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req);
    let userId = ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.userId) || null;
    let user;
    try {
        if (!userId) {
            user = yield (0, exports.createNewUser)(req, res);
        }
        else {
            user = yield User_1.default.findById(userId);
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ userId: user });
    }
    catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getUserDetails = getUserDetails;
