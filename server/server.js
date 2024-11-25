const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact'); // Import the contact route
const path=require('path'); //this line is added yest

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // Route for Contact Us form


// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));   //this line added extra yest

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
