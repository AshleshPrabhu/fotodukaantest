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

const UserSchema = new mongoose.Schema({
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
    default: getRandomProfilePhoto
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
    required: false,
    default: ''
  },
  city: {
    type: String,
    required: false,
    default: ''
  },
  booking: {
    type: Array, // Fixed to use Array for storing bookings
    required: false,
    default: []
  },
  review: {
    type: Array, // Fixed to use Array for storing reviews
    required: false,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
