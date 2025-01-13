import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";

export async function POST(req) {
    try {
        const { userId, newVideo } = await req.json();

        if (!userId || !newVideo) {
            return new Response(JSON.stringify({ message: "Missing userId or newVideo" }), { status: 400 });
        }

        // Connect to the database
        await connectToDB();

        // Step 1: Find the freelancer by userId
        const freelancer = await Freelancer.findById(userId);

        if (!freelancer) {
            return new Response(JSON.stringify({ message: "Freelancer not found" }), { status: 404 });
        }

        // Step 2: Add the new video link to the videos array
        freelancer.video.push(newVideo);

        // Step 3: Save the updated freelancer document
        await freelancer.save();

        return new Response(JSON.stringify({
            message: "Video added successfully",
            updatedVideos: freelancer.video
        }), { status: 200 });
    } catch (error) {
        console.error("Server error:", error.message);
        return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
            status: 500,
        });
    }
}
