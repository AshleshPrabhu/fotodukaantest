import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req) => {
    try {
      await connectToDB()
  
      const feedPosts = await Freelancer.find()
  
      return new Response(JSON.stringify(feedPosts), { status: 200 })
    } catch (err) {
      console.log(err)
      return new Response("Failed to fetch all Feed Posts", { status: 500 })
    }
  }
  