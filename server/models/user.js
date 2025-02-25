const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  telegram: { type: String, default: '' },  // Add telegram field
  state: { type: String, default: '' },     // Add state field
  city: { type: String, default: '' },      // Add city field
  referralCode: { type: String, default: '',unique: true, },
 
  
  // Fields for password reset functionality
  resetPasswordToken: String,   // Store the reset token
  resetPasswordExpire: Date,    // Store the expiration date of the reset token
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isResettingPassword) return next(); // Skip hashing if already done or if it's a reset password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to set reset password token and expiration
userSchema.methods.setResetPasswordToken = function () {
  const resetToken = Math.random().toString(36).substring(2); // Example, generate a random token
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 3600000; // Set token expiration (e.g., 1 hour)
  return resetToken;
};

// Method to check if reset token is valid
userSchema.methods.isResetTokenValid = function (token) {
  return this.resetPasswordToken === token && this.resetPasswordExpire > Date.now();
};

module.exports = mongoose.model('User', userSchema);
