const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true},
  amountDonated: { type: Number, default: 0 },
  donationsArray: [{
    fundraiser: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    extension:{type:String,default:'jpg'}
  }]
},{timestamps:true});

export default mongoose.models.User || mongoose.model('User', UserSchema);
