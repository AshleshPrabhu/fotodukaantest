import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";
import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    await connectToDB();

    // Parse the request body to get the order ID
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID not provided" }),
        { status: 400 }
      );
    }

    // Use findByIdAndUpdate to update the order directly
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { "additionalDetails.0.amountPaid": true }, // Update the first element's amountPaid to true
      { new: true } // Option to return the updated document
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    // Return the updated order in the response
    return new Response(
      JSON.stringify({ order: updatedOrder }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Error in POST:", err);
    return new Response(
      JSON.stringify({ error: "Error updating order" }),
      { status: 500 }
    );
  }
};
