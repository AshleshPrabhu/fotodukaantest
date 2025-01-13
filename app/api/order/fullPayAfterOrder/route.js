import crypto from "crypto";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Order from "@/lib/models/order";
import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";

// Secret from Razorpay dashboard (keep this secure)
const RAZORPAY_WEBHOOK_SECRET = "FotodukaanPayAfterOrder";

export const POST = async (req) => {
  await connectToDB();

  // Log headers to confirm Razorpay signature header presence
  console.log("Headers:", req.headers);

  // Step 1: Retrieve the signature from headers and raw body as ArrayBuffer
  const signature = req.headers.get("x-razorpay-signature"); // Use .get() method
  const rawBody = await req.arrayBuffer();
  const rawBodyString = Buffer.from(rawBody).toString(); // Convert to string

  // Step 2: Verify the Razorpay webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
    .update(rawBodyString)
    .digest("hex");

  console.log("Expected Signature:", expectedSignature);
  console.log("Signature from Header:", signature);

  if (expectedSignature !== signature) {
    console.log("Invalid webhook signature");
    return new Response(
      JSON.stringify({ error: "Invalid webhook signature" }),
      { status: 400 }
    );
  }

  // Step 3: Parse the JSON payload after signature verification
  const payload = JSON.parse(rawBodyString);
  console.log(payload);

  try {
    // Extract necessary details from the payload
    const paymentData = payload.payload.payment.entity;
    const {
      email,
      contact,
      notes: {
        orderId
      },
    } = paymentData;

    // Ensure orderId exists
    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "Missing orderId in webhook payload" }),
        { status: 400 }
      );
    }

    // Fetch the order from the Order collection using the orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    // Update the order with the payment details
    order.paidAmount += paymentData.amount / 100;  // Convert paise to rupees
    order.paidOnWeb = true;
    await order.save();

    // Return the updated order in the response
    return new Response(
      JSON.stringify({ order }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "Error processing webhook" }),
      { status: 500 }
    );
  }
};
