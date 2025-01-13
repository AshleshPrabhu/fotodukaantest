// Import necessary dependencies
import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";
// Function to handle the API request
export async function GET(req, { params }) {
  const { people } = params; // "people" will be the category
  const decodedpeople =decodeURIComponent(people)

  // Connect to the database
  await connectToDB();

  try {
    // Search for freelancers based on category (people)
    const freelancers = await Freelancer.find({
      [`freelancerDetails.${decodedpeople}`]: { $exists: true }
    });

    if (freelancers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No freelancers found for this category." }),
        { status: 404 }
      );
    }

    // Return the list of freelancers
    return new Response(JSON.stringify(freelancers), { status: 200 });
  } catch (error) {
    // Return an error if something goes wrong
    return new Response(JSON.stringify({ error: "Failed to fetch freelancers" }), { status: 500 });
  }
}
