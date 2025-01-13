import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register"; // Assuming this is your Freelancer model

export const GET = async (req, { params }) => {
  let { event, subevent } = params;

  try {
    // Log the incoming query for debugging
    console.log("Event and subevent query received:", event, subevent);

    // Ensure the parameters are decoded to handle spaces and are strings
    event = decodeURIComponent(String(event));
    subevent = decodeURIComponent(String(subevent));

    // Connect to the database
    await connectToDB();

    // Find freelancers who match the event and subevent in freelancerDetails
    const freelancers = await Freelancer.find({
      [`freelancerDetails.${event}.subcategories`]: { $in: [subevent] }, // Match subevent in subcategories
    });

    // If no freelancers are found, return a 404 response
    if (freelancers.length === 0) {
      return new Response(JSON.stringify({ message: "No freelancers found" }), { status: 404 });
    }

    // Return the found freelancers
    return new Response(JSON.stringify(freelancers), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get freelancers by event and subevent", { status: 500 });
  }
};
