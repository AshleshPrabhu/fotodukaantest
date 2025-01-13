import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");
import Freelancer from "@/lib/models/Register";

export const POST = async (req) => {
  try {
    await connectToDB();

    const { password, phone } = await req.json();

    let existingUser = await User.findOne({ phone: phone });
    if(!existingUser){
        existingUser = await Freelancer.findOne({ phone: phone });
    }
    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "No user with this phone number" }),
        { status: 400 }
      );
    }

   
    existingUser.password= CryptoJS.AES.encrypt(password, "fotoDukaan@Mani2003").toString()

    await existingUser.save();

    return new Response(JSON.stringify({ success: "success" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "User cannot be registered" }),
      { status: 500 }
    );
  }
};
