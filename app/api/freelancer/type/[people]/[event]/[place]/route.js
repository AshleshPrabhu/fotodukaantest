import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register"; // Assuming Register is your Freelancer model

export const GET = async (req, { params }) => {
  let { people, event, place } = params;

  try {
    // Decode URL-encoded spaces and other characters
    people = decodeURIComponent(people);
    event = decodeURIComponent(event);
    place = decodeURIComponent(place);

    
    // Connect to the database
    await connectToDB();

    // Use regex for case-insensitive search in both freelancerDetails and place (city)
    const searchedFreelancers = await Freelancer.find({
      [`freelancerDetails.${people}.subcategories`]: { $in: [event] },  // Check if event is in subcategories array
      city: { $regex: place, $options: "i" }  // Case-insensitive search for city/place
    });

    // Check if no freelancers were found
    if (searchedFreelancers.length === 0) {
      return new Response(JSON.stringify({ message: "No data found" }), { status: 404 });
    }

    // Return the found freelancers
    console.log("Searched freelancers by category and place:", searchedFreelancers);
    return new Response(JSON.stringify(searchedFreelancers), { status: 200 });
  } catch (err) {
    console.error("Error fetching freelancers:", err);
    return new Response("Failed to get freelancers by category and place", { status: 500 });
  }
};
