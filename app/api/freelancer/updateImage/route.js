import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";

export async function POST(req) {
    try {
        const { userId, newImages } = await req.json();

        if (!userId || !Array.isArray(newImages) || newImages.length === 0) {
            return new Response(JSON.stringify({ message: "Missing userId or newImages" }), { status: 400 });
        }

        // Connect to the database
        await connectToDB();

        // Step 1: Find the freelancer by userId
        const freelancer = await Freelancer.findById(userId);

        if (!freelancer) {
            return new Response(JSON.stringify({ message: "Freelancer not found" }), { status: 404 });
        }

        // Step 2: Add the new image URLs to the images array
        freelancer.image.push(...newImages); // Use the spread operator to add multiple URLs

        // Step 3: Save the updated freelancer document
        await freelancer.save();

        return new Response(JSON.stringify({
            message: "Images added successfully",
            updatedImages: freelancer.image
        }), { status: 200 });
    } catch (error) {
        console.error("Server error:", error.message);
        return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
            status: 500,
        });
    }
}
