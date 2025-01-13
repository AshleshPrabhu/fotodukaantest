import User from "@/lib/models/User";
import Order from "@/lib/models/order"; // Import your Order model

export const POST = async (req, { params }) => {
    try {
        const { id } = await req.json(); // Extract user ID from request body
        const user = await User.findById(id); // Fetch user by ID

        console.log(id);
        console.log("A");

        if (!user) {
            return new Response(
                JSON.stringify({ error: "User is not there", success: false }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        // Fetch orders using the IDs stored in the user's orders array
        const orders = await Order.find({ _id: { $in: user.orders } }); // Assuming user.orders is an array of order IDs (strings)

        return new Response(
            JSON.stringify({
                message: "User and orders found successfully",
                user,
                orders, // Include the orders in the response
                success: true,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error: "Failed to find the user or orders", success: false }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
