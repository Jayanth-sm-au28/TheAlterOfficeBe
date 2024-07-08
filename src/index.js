"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173', // Adjust as per your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
const PORT = config_1.config.PORT || 5000;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Alter',
};
mongoose_1.default.connect(config_1.config.MONGO_URI, mongooseOptions)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
