import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  
  freelancerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  freelancerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: Number,
    required: true,
  },
  freelancerPhone: {
    type: Number,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
    default: null
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  freelancerAproved:{
    type:Boolean,
    default:false
  },
  admineApproved:{
    type:Boolean,
    default:false
  },
  paidAmount:{
    type:Number,
    required:true
  },
  totalAmount:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    required:true
  },
  service:{
    type:String,
    require:true,
  },
  event:{
    type:String,
    require:true,
  },
  additionalDetails:{
    type:Array,
    default:[]
  },
  userId:{
    type:String,
    require:true
  },
  freelancerId:{
    type:String,
    require:true
  },
  freelancerCancel:{
    type:Boolean,
    default:false
  },
  adminCancel:{
    type:Boolean,
    default:false
  },
  customerCancel:{
    type:Boolean,
    default:false
  },
  isPolicyAccepted:{
    type:Boolean,
    default:false,
    required:true
  },
  time:{
    type:String,
    require:true
  },
  paidOnWeb:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
