  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');

  const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    telegram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    country: { type: String, default: '' },
    pincode: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    purchasedCourses: [
      {
        courseId:String,
        amount:Number,
        courseName:String,
        paymentId: String,
        purchaseDate: Date
      }
    ],

    referralCode: { type: String, default:null},
    referralLink: { type: String, default: null }, // Referral link will be updated after a successful action
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });

  // Hash password before saving the user
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isResettingPassword) return next(); 
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
    const resetToken = Math.random().toString(36).substring(2);
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 3600000;
    return resetToken;
  };

  // Method to check if reset token is valid
  userSchema.methods.isResetTokenValid = function (token) {
    return this.resetPasswordToken === token && this.resetPasswordExpire > Date.now();
  };

  module.exports = mongoose.model('User', userSchema);