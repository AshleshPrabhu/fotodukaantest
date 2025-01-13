import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET=async(req,{params})=>{
    try {
        
        await connectToDB()
        const order = await Order.findByIdAndDelete(params.id)
        if(!order){
            return new Response(
                JSON.stringify({ error: "failed to delete the order",success:false }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
            
            
        return new Response(
            JSON.stringify({ message: "order deleted successfully",success:true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "failed to delete the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

export const POST = async(req,{params})=>{
    try {
        const{
            customerName,
            freelancerName,
            customerEmail,
            freelancerEmail,
            customerPhone,
            freelancerPhone,
            pinCode,
            address,
            city,
        }=await req.json()
        console.log({
            customerName,
            freelancerName,
            customerEmail,
            freelancerEmail,
            customerPhone,
            freelancerPhone,
            pinCode,
            address,
            city,
        })
        const order = await Order.findById(params.id)
        if(!order){
            return new Response(
                JSON.stringify({error:"order not found",success:false}),
                {
                    status:404,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }
        order.customerName=customerName
        order.freelancerName=freelancerName
        order.customerEmail=customerEmail
        order.freelancerEmail=freelancerEmail
        order.customerPhone=customerPhone
        order.freelancerPhone=freelancerPhone
        order.pinCode=pinCode
        order.address=address
        order.city=city
        await order.save({validateBeforeSave:false})
        console.log(order)
        return new Response(
            JSON.stringify({message:"order edit successfully ",success:true}),{
                status:200,
                headers:{"Content-Type":"application/json"}
            }
        )
        
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: "failed to edit the order",success:false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}