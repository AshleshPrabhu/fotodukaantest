import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";

// This is the route handler for the POST request
export async function POST(req) {
    try {
        const  {selectedCategories, id }= await req.json(); // Parse the incoming JSON data

        await connectToDB();  // Connect to the database

        const freelancerId = id;  // Mock ID for now

        const freelancer = await Freelancer.findById(freelancerId);

        if (!freelancer) {
            return new Response(JSON.stringify({ message: "Freelancer not found" }), { status: 404 });
        }

        freelancer.freelancerDetails = selectedCategories;
        

        // Save the updated freelancer data
        await freelancer.save();

        return new Response(JSON.stringify({ message: "Profile updated successfully", freelancer }), { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
