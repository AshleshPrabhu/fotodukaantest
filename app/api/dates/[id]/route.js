import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";
import Order from "@/lib/models/order";


export const GET = async (req,{params}) => {
    try {
        await connectToDB()
        const freelancer = await Freelancer.findOne({_id:params.id})
        if(!freelancer){
            return new Response( 'Freelancer not found',{ status: 404} )
        }
        const blockedDates = freelancer.blockedDates;
        return new Response(JSON.stringify(blockedDates), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("failed to get all the dates",{status:400})
    }
}
export const POST =async(req,{params})=>{
    try {
        await connectToDB()
        const {allEvents}=await req.json()
        console.log(allEvents)
        const user = await Freelancer.findOne({ _id: params.id })
        user.blockedDates=allEvents;
        await user.save()
        return new Response(JSON.stringify(user.blockedDates),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("failed to update date",{status:400})
    }
}