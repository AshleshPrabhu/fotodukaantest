import Order from "@/lib/models/order";

export const POST   =async(req,{params})=>{
    try {
        const {id} = await req.json()
        // console.log(id)
        const order = await Order.findById(id)
        // console.log(order)
        if(!order){
            return new Response(
                JSON.stringify({ error: "failed to find the order",success:false }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        order.orderId=toString(id)
        order.admineApproved=true
        // console.log(order)
        await order.save()
        // console.log(order)
        return new Response(
            JSON.stringify({ message: "order approved successfully",success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: "failed to approve the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}