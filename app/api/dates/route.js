import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";
import Order from "@/lib/models/order";

export const POST = async (req, { params }) => {
    try {
        await connectToDB()
        const { id } = await req.json();
        console.log("Received ID:", id);
        const orders = await Order.find({ freelancerId: id });
        return new Response(JSON.stringify(orders), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response("Failed to get all the orders", { status: 400 });
    }
};
