import Order from "@/lib/models/order";
import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // Find user
    const user = await Freelancer.findOne({ _id: params.id });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    // Fetch associated orders and bookings
    const orders = await Order.find({ _id: { $in: user.orders || [] } });
    const bookings = await Order.find({ _id: { $in: user.booking || [] } });

    // Return data as a JSON object
    return new Response(
      JSON.stringify({ user, orders, bookings }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error fetching user, orders, or bookings:", err);
    return new Response("Failed to get user data", { status: 500 });
  }
};

// For blocking the dates
export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const freelancerId = params.id; // Retrieve freelancer ID
    const { blockedDates } = await req.json(); // Parse the request body

    // Validate input
    if (!freelancerId || !blockedDates || !Array.isArray(blockedDates)) {
      return new Response("Invalid input", { status: 400 });
    }

    // Find the freelancer
    const user = await Freelancer.findOne({ _id: freelancerId });
    if (!user) {
      return new Response("Freelancer not found", { status: 404 });
    }

    // Add new blocked dates, avoiding duplicates
    const uniqueBlockedDates = new Set([...user.blockedDates, ...blockedDates]);
    user.blockedDates = Array.from(uniqueBlockedDates);

    // Save the updated freelancer document
    await user.save();

    return new Response(
      JSON.stringify({ message: "Dates blocked successfully", blockedDates: user.blockedDates }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error blocking dates:", error);
    return new Response("Failed to block dates", { status: 500 });
  }
};
