import User from "@/lib/models/User";

export const GET=async(req,res)=>{
    try {
        const users = await User.find()
        if(!users)
        {
            return new Response(
                JSON.stringify({ error: "failed to fetch users",success:false }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }else{
            return new Response(
                JSON.stringify({users,success:true,message:"users found successfully"}),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to fetch users",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}