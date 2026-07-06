import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js'; // Keeping your external User model
import { generateToken } from './middleware/auth.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Check environment variables
if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not defined in .env');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Employee Schema & Model
const employeeForm = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const EmployeeModel = mongoose.model('Employee', employeeForm);

// Root
// app.get('/', (req, res) => {
//     res.json({ message: 'Hello, World!' });
// });

// Auth Routes
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error creating user' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error logging in' });
    }
});

// Employee CRUD Routes
app.get('/employees', async (req, res) => {
    try {
        const employees = await EmployeeModel.find({});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employees' });
    }
});


app.post('/employees', async (req, res) => {
    try {
        const employee = new EmployeeModel(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error creating employee' });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error updating employee' });
    }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting employee' });
    }
});

// Fallback route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
