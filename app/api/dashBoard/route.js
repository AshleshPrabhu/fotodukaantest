import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";
import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    await connectToDB();
    
    // Parse the request body to get the user or freelancer ID
    const { id } = await req.json();
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID not provided" }),
        { status: 400 }
      );
    }

    // Try to find the user in Freelancer collection
    let person = await Freelancer.findOne({ _id: id });

    // If not found, try to find in User collection
    if (!person) {
      person = await User.findOne({ _id: id });
    }

    // If neither Freelancer nor User is found, return an error
    if (!person) {
      return new Response(
        JSON.stringify({ error: "User or Freelancer not found" }),
        { status: 404 }
      );
    }

    // Retrieve all the order IDs from the 'booking' array
    const orderIds = person.orders;

    // Fetch all orders from the Order collection using the booking IDs
    const orders = await Order.find({ _id: { $in: orderIds } });

    // Return the orders in the response
    return new Response(
      JSON.stringify({ orders }),
      { status: 200 }
    );

  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "Error retrieving orders" }),
      { status: 500 }
    );
  }
};
