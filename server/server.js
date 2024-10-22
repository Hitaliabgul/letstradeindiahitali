// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // To handle CORS issues
app.use(express.json()); // To parse incoming requests with JSON payloads

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes); // Route for authentication



// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
    