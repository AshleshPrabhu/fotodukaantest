import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register"; // Import the Freelancer model
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export const POST = async (req) => {
  try {
    await connectToDB();
    const { phone, password } = await req.json();

    // First, check in the Freelancer collection
    let freelancer = await Freelancer.findOne({ phone: phone });

    if (freelancer) {
      // Decrypt the stored password
      var bytes = CryptoJS.AES.decrypt(freelancer.password, "fotoDukaan@Mani2003");
      var checkpass = bytes.toString(CryptoJS.enc.Utf8);

      // Validate the password
      if (password === checkpass) {
        // Generate JWT token for Freelancer
        var token = jwt.sign(
          {
            phone: freelancer.phone,
            name: freelancer.name,
            userid: freelancer._id,
            email: freelancer.email,
            profilePhoto: freelancer.profilePhoto,
            freelancer: true,
          },
          "jwtfotoDukaan@Mani2003"
        );

        // Return success response with token
        return new Response(JSON.stringify({ success: true, token }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // Incorrect password
        return new Response(JSON.stringify({ error: "Incorrect password" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      // If no freelancer found, check in the User collection
      let user = await User.findOne({ phone: phone });

      // Check if user exists
      if (user) {
        // Decrypt the stored password
        var bytes = CryptoJS.AES.decrypt(user.password, "fotoDukaan@Mani2003");
        var checkpass = bytes.toString(CryptoJS.enc.Utf8);

        // Validate the password
        if (password === checkpass) {
          // Generate JWT token for User
          var token = jwt.sign(
            {
              phone: user.phone,
              name: user.name,
              userid: user._id,
              email: user.email,
              profilePhoto: user.profilePhoto,
              freelancer: false,
            },
            "jwtfotoDukaan@Mani2003"
          );

          // Return success response with token
          return new Response(JSON.stringify({ success: true, token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } else {
          // Incorrect password
          return new Response(JSON.stringify({ error: "Incorrect password" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      } else {
        // No user found
        return new Response(JSON.stringify({ error: "No user found" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  } catch (err) {
    // Handle errors
    console.log(err);
    return new Response(JSON.stringify({ error: "Failed to authenticate" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
