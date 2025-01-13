import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");

export const POST = async (req) => {
  try {
    await connectToDB();

    const { name, email, password, phone } = await req.json();

    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    let u = new User({
      name: name,
      email: email,
      phone: phone,
      password: CryptoJS.AES.encrypt(password, "fotoDukaan@Mani2003").toString(),
    });

    await u.save();

    return new Response(JSON.stringify({ success: "success" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "User cannot be registered" }),
      { status: 500 }
    );
  }
};
