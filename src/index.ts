import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { config } from './config';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Adjust as per your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = config.PORT || 5000;

const mongooseOptions: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Alter',
};
console.log("process.env.MONGO_URI",config.MONGO_URI)
mongoose.connect(config.MONGO_URI, mongooseOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
