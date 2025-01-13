import Order from "@/lib/models/order";

export const POST=async(req)=>{
    try {
        const {id} = await req.json()
        const orders = await Order.find({freelacerId:id})
        if(!orders){
            return new Response(
                JSON.stringify({ success: false,message:"failed to find the orders" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
        return new Response(
            JSON.stringify({ success: true, orders , message:"orders found successfully"}),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "failed to delete the freelancer" ,success:false}),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}