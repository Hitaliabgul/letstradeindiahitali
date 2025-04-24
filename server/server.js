
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact'); // Import the contact route

const path = require('path'); //this line is added yest

const User = require('./models/user');
const app=require("./app");
dotenv.config();


const PORT = process.env.PORT || 5000;
// Middleware

// Payment verification endpoint
const crypto = require('crypto');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
app.use('/api', userRoutes); // Register user routes

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // Route for Contact Us form
//app.use("/api/payment", paymentRoutes);

// Serve static files from the 'public' directory
//app.use('/public', express.static(path.join(__dirname, 'public')));   //this line added extra yest

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
