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

    

    // Retrieve all the order IDs from the 'booking' array
    const orderIds = id;

    // Fetch all orders from the Order collection using the booking IDs
    const orders = await Order.findById(orderIds);

    orders.freelancerAproved=true;
    orders.additionalDetails = { amountPaid: false };
    await orders.save();


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
