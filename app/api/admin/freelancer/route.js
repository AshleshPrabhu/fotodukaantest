import Admin from "@/lib/models/Admin";
import Freelancer from "@/lib/models/Register";
import jwt from 'jsonwebtoken'

export const POST = async(req, _) => {
    try {
        const { adminId, freelancerId, isVerifiedByAdmin } = await req.json();
        console.log({ adminId, freelancerId, isVerifiedByAdmin });
        
        const admin = await Admin.findOne({ _id: adminId });
        console.log("a", admin);
        
        // Use `filter` to remove the specific freelancer ID from `freelancerToBeApproved`
        admin.freelancerToBeApproved = admin.freelancerToBeApproved.filter(
            (fr) => fr.toString() !== freelancerId
        );
        
        await admin.save();

        const freelancer = await Freelancer.findOne({ _id: freelancerId });
        freelancer.isVerifiedByAdmin = isVerifiedByAdmin;
        await freelancer.save();
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                freelacers: admin.freelancerToBeApproved || [],
                freelancer: false,
                isAdmin: true
            },
            "jwtfotoDukaan@Mani2003"
        );

        return new Response(
            JSON.stringify({ success: true, token, message: "freelancer approved successfully" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
        
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "failed to verify freelancer", success: false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }    
};
