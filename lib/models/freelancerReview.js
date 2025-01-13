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

const FreelancerReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: getRandomProfilePhoto
  },
  text:{
    type: String,
    required: true,
  },
  star:{
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FreelancerReview = mongoose.models.FreelancerReview || mongoose.model("FreelancerReview", FreelancerReviewSchema);

export default FreelancerReview;
