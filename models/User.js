const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  last_update_date: { type: Date }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
