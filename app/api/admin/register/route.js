import Admin from "@/lib/models/Admin";
import { connectToDB } from "@/lib/mongodb/mongoose";
import CryptoJS from 'crypto-js';

export const POST = async (req,_) => {
    try {
        await connectToDB();
        const { name, email, password } = await req.json();
        
        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({
                    message: "Please fill all fields",
                    success: false
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        
        const encryptedPassword = CryptoJS.AES.encrypt(password, "fotoDukaan@Mani2003").toString();
        const admin = new Admin({
            name,
            email,
            password: encryptedPassword
        });
        await admin.save();
        
        return new Response(
            JSON.stringify({
                message: "Admin created successfully",
                success: true,
                data: admin
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "admin cannot be registered",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
