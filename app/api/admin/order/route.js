import Order from "@/lib/models/order";
import Freelancer from "@/lib/models/Register";

export const GET=async(req,_)=>{
    try {
        const orders = await Order.find()
        return new Response(
            JSON.stringify({ message: "found the orders",orders,success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to fetch orders",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
export const POST=async(req,res)=>{
    try {
        const {id} = await req.json()
        const freelancerOrder = await Freelancer.findById(id).select("orders").populate({
            path: "orders",
            model: "Order",
        })
        return new Response(
            JSON.stringify({ message: "found the orders",freelancerOrder,success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to fetch orders" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}