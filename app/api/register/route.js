import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");

export const POST = async (req) => {
  try {
    await connectToDB();

    const { 
      name, 
      email, 
      password, 
      phone, 
      city, 
      address,
      aboutYourself,
      profilePhoto,
      selectedCategories,
      isTermsAccepted
    } = await req.json();

    // Check if user already exists
    const existingUser = await Freelancer.findOne({ phone: phone });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "freelancer already exists" }),
        { status: 400 }
      );
    }
    // console.log('step1')
    // const imgData = new FormData();
    // imgData.append("file", profilePhoto);
    // imgData.append("upload_preset", "social");
    // imgData.append("cloud_name", "hritiksarraf");
    // console.log('step2')
    // const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
    //   method: "POST",
    //   body: imgData,
    // });
    // console.log('step3')
    // if (!imgResponse.ok) {
    //   throw new Error("Failed to upload image to Cloudinary",imgResponse);
    // }
    // console.log('step4')
    // const imgUrl = await imgResponse.json();
    // const profilePhotoUrl = imgUrl.url;
    // Encrypt password
    const encryptedPassword = CryptoJS.AES.encrypt(password, "fotoDukaan@Mani2003").toString();

    const processedCategories = Object.entries(selectedCategories).reduce((acc, [category, details]) => {
      if (details.subcategories && details.subcategories.length > 0) {
        acc[category] = {
          ...details,
          price: details.price || {},
          weddingPrice: details.weddingPrice || {}
        };
      }
      return acc;
    }, {});
    console.log('Data being sent to Freelancer model:', {
      name,
      email,
      phone,
      password: encryptedPassword,
      city,
      address,
      aboutYourself,
      profilePhoto,
      freelancerDetails: processedCategories,
      isTermsAccepted,
    });

    // Create new freelancer instance
    let f = new Freelancer({
      name:name,
      email:email,
      phone:phone,
      password: encryptedPassword,
      city:city,
      address:address,
      aboutYourself:aboutYourself,
      profilePhoto:profilePhoto,  // If you plan to handle this as a file, ensure you're handling file upload properly
      freelancerDetails:processedCategories ,  // Assuming categories is an array or object
      isTermsAccepted:isTermsAccepted
    });

    // Save freelancer to database
    await f.save();

    return new Response(JSON.stringify({ success: "success" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "freelancer cannot be registered" }),
      { status: 500 }
    );
  }
};
