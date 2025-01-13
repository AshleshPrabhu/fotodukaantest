import Order from "@/lib/models/order";

export const GET=async(req,{params})=>{
    try {
        const order = await Order.findById(params.id)
        if(!order){
            return new Response(
                JSON.stringify({error:'couldnt find the order',success:false}),
                {
                    status:404,
                    headers:{'Content-Type': 'application/json'},
                }
            )
        }
        return new Response(
            JSON.stringify({order,success:true}),
            {
                status:200,
                headers:{'Content-Type': 'application/json'},
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to get the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}