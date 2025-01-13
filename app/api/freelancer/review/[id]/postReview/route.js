import { connectToDB } from "@/lib/mongodb/mongoose";
import FreelancerReview from "@/lib/models/freelancerReview";
import Freelancer from "@/lib/models/Register";

export async function POST(req, { params }) {
  await connectToDB();

  try {
    const { name, text, star } = await req.json();
    const freelancerId = params.id;

    // Validation to ensure all required fields are present
    if (!name || !text || !star || !freelancerId) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled." }),
        { status: 400 }
      );
    }

    // Check if the freelancer exists
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return new Response(
        JSON.stringify({ error: "Freelancer not found" }),
        { status: 404 }
      );
    }

    // Create a new review with freelancerId included
    const newReview = new FreelancerReview({
      name,
      text,
      star,
      freelancerId,
    });

    // Save the review to the database
    await newReview.save();

    // Update the freelancer's stars and reviews using findByIdAndUpdate
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      freelancerId,
      {
        $push: { review: newReview._id },
        $inc: { "stars.noOfPeople": 1, "stars.totalStar": star },
        $set: { "stars.star": (freelancer.stars.totalStar + star) / (freelancer.stars.noOfPeople + 1) },
      },
      { new: true } // Return the updated freelancer document
    );

    // Return success response with the new review and updated freelancer data
    return new Response(
      JSON.stringify({
        message: "Review created successfully",
        review: newReview,
        freelancer: updatedFreelancer,
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the review." }),
      { status: 500 }
    );
  }
}
