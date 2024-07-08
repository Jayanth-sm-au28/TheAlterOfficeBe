"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.get('/checkUserId', userController_1.getUserDetails);
router.post('/:id/avatar', upload_1.default, userController_1.updateUserAvatar);
router.get("/:id", userController_1.getExistingUserDetails);
router.post('/:id/uploadAvatar', upload_1.default, userController_1.uploadAvatar);
exports.default = router;
