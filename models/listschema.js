import mongoose from "mongoose";
// list schema
const listSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true,
   
  },
  description: {
    type: String,
    required: true
  },

  rate: {
    type: String,
    required: true
  },

  userId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
}, { timestamps: true });

export const List = mongoose.model('List', listSchema);
