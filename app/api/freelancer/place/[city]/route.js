import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";

export const GET = async (req, { params }) => {
    let { city } = params;
  
    try {
      // Log the incoming query for debugging
      console.log("Query received:", city);

      // Ensure query is a string
      city = String(city);

      // Connect to the database
      await connectToDB();

      // Use regex for case-insensitive search
      const searchedFreelancers = await Freelancer.find({
        city: { $regex: city, $options: "i" }  // case-insensitive search for city
      });

      console.log("Searched freelancers:", searchedFreelancers);  // Debugging
      return new Response(JSON.stringify(searchedFreelancers), { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Failed to get freelancers by city", { status: 500 });
    }
};
