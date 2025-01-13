import mongoose from "mongoose";

const profilePhotoURLs = [
  "https://res.cloudinary.com/hritiksarraf/image/upload/v1728083420/Screenshot_2024-10-05_at_4.35.40_AM_ivnba3.png",
  "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083420/Screenshot_2024-10-05_at_4.36.24_AM_ttuvwb.png",
  "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083419/Screenshot_2024-10-05_at_4.35.13_AM_yg5zdn.png",
  "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083419/Screenshot_2024-10-05_at_4.34.45_AM_aqcm6x.png",
  "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png"
];

// Function to randomly select a profile photo URL
function getRandomProfilePhoto() {
  const randomIndex = Math.floor(Math.random() * profilePhotoURLs.length);
  return profilePhotoURLs[randomIndex];
}


const FreelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: false,
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
  booking: {
    type: Array, // Fixed to use Array for storing bookings
    required: false,
    default: []
  },
  freelancerDetails: {
    type: Object,
    required: true,
  },
  // startingPrice:{
  //   type:Number,
  //   require:true
  // },
  // halfDayPrice:{
  //   type:Number,
  //   require:true
  // },
  // extraHourPrice:{
  //   type:Number,
  //   require:true
  // },
  blockedDates:[
    {
      date:Date,
      event:String
    }
  ],
  aboutYourself:{
    type:String,
    require:true
  },
  review:{
    type: Array, // Fixed to use Array for storing reviews
    
    default: []
  },
  stars: {
    type: Object,
    default: {star:5,noOfPeople:1,totalStar:5}
  },
  freelancerReview:{
    type: Array, // Fixed to use Array for storing reviews
    
    default: []
  },
  aadharDetails:{
    type:Array,
    default:[]
  },
  image:{
    type:Array,
    default:[]
  },
  video:{
    type:Array,
    default:[]
  },
  extraDetails:{
    type:Array,
    default:[]
  },
  orders:{
    type:Array,
    default:[]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isTermsAccepted:{
    type:Boolean,
    default:false,
    required:true,
  },
  isVerifiedByAdmin:{
    type:Boolean,
    default:false,
  }

});

const Freelancer = mongoose.models.Freelancer || mongoose.model("Freelancer", FreelancerSchema);


export default Freelancer;
