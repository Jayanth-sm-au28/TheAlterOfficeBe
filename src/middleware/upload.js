"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
    }
    else {
        cb(null, false); // Reject the file
    }
};
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
}).single('image');
exports.default = upload;
