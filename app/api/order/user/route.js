import Order from "@/lib/models/order";

export const POST=async(req,{params})=>{
    try {
        const {id,userCancelReason} = await req.json()
        console.log(id,userCancelReason)

        const order = await Order.findByIdAndUpdate(
            id,
            { $set: { userCancel: true, ...(userCancelReason && { userCancelReason }) } },
            { new: true }
          );
        if(!order){
            return new Response(
                JSON.stringify({ error: "failed to find the order",success:false }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        // console.log(order)
        // order.userCancel=true
        // // console.log(order)
        // if(userCancelReason)  order.userCancelReason=userCancelReason
        // await order.save()
        const finalorder = await Order.findById(id)
        
        return new Response(
            JSON.stringify({ message: "user cancel changed successfully",success:true ,finalorder}),
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