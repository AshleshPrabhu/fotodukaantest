import Admin from "@/lib/models/Admin";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async () => {
    try {
            await connectToDB();
            const admins = await Admin.find({})
            
            return new Response(
                JSON.stringify({
                    success: true,
                    data: admins
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "Could not retrieve admins" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
