import Admin from "@/lib/models/Admin";
import { connectToDB } from "@/lib/mongodb/mongoose";
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export const POST = async (req,_) => {
    try {
        await connectToDB();
        const { email, password } = await req.json();
        
        if (!email || !password) {
            return new Response(
                JSON.stringify({
                    message: "Email and password are required",
                    success: false
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return new Response(
                JSON.stringify({
                    message: "Admin not found",
                    success: false
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        const bytes = CryptoJS.AES.decrypt(admin.password, "fotoDukaan@Mani2003");
        const checkpass = bytes.toString(CryptoJS.enc.Utf8);
        
        if (password === checkpass) {
            const token = jwt.sign(
                {
                    id: admin._id,
                    email: admin.email,
                    name: admin.name,
                    freelacers: admin.freelancerToBeApproved || [],
                    freelancer: false,
                    isAdmin: true,
                    
                },
                "jwtfotoDukaan@Mani2003"
            );

            return new Response(
                JSON.stringify({ success: true, token,message:"logged in successfuly" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Incorrect password" ,success:false}),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "admin cannot be logged in" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
