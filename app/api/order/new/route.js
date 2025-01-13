import crypto from "crypto";
import { connectToDB } from "@/lib/mongodb/mongoose";
import Order from "@/lib/models/order";
import User from "@/lib/models/User";
import Freelancer from "@/lib/models/Register";

// Secret from Razorpay dashboard (keep this secure)
const RAZORPAY_WEBHOOK_SECRET = "FotoDukaan@RazorPay@WebHook@Secret";

export async function POST(req) {
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
        name,
        pinCode,
        address,
        customerPhone,
        city,
        date,
        totalAmount,
        discount,
        service,
        event,
        userid,
        freelancerid,
        time,
      },
    } = paymentData;

    // Fetch freelancer details
    const freelancer = await Freelancer.findById(freelancerid);
    if (!freelancer) {
      console.log("Freelancer not found");
      return new Response(
        JSON.stringify({ error: "Freelancer not found" }),
        { status: 404 }
      );
    }
    const paidonweb=(Number(totalAmount)-(paymentData.amount / 100)<2);
    // Step 4: Create the order based on the data received
    const newOrder = new Order({
      customerName: name,
      freelancerName: freelancer.name,
      customerEmail: email,
      freelancerEmail: freelancer.email,
      customerPhone,
      freelancerPhone: Number(freelancer.phone),
      pinCode,
      address,
      city,
      date,
      paidAmount: paymentData.amount / 100, // Amount in INR
      totalAmount: Number(totalAmount),
      discount,
      service,
      event,
      userId: userid,
      freelancerId: freelancerid,
      isPolicyAccepted: true,
      time,
      paidOnWeb:paidonweb,
      orderId: paymentData.id, // Using Razorpay payment ID as orderId
    });

    // Save the order to the database
    await newOrder.save();

        const orderId = newOrder._id;

    // Update the user's order array
    const eventtitle=service+" "+event+" "+time;
    const freelancerUserUpdate = await Freelancer.findById(userid);
    if (freelancerUserUpdate) {
      
      // Freelancer exists, update the freelancer's orders array
      if (!freelancerUserUpdate.booking) {
        freelancerUserUpdate.booking = []; // Initialize orders array if it doesn't exist
      }
      freelancerUserUpdate.booking.push(orderId);
      await freelancerUserUpdate.save();
    } else {
      // If the freelancer is not found, check in the User collection
      const userUpdate = await User.findById(userid);
      if (!userUpdate) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }

      // User exists, update the user's orders array
      if (!userUpdate.booking) {
        userUpdate.booking = []; // Initialize orders array if it doesn't exist
      }
      userUpdate.booking.push(orderId);
      await userUpdate.save();
    }

    // Update the freelancer's order array
    const freelancerUpdate = await Freelancer.findById(freelancerid);


    const datesArray = date.split(",");

// Initialize an array for the new blocked dates
const newBlockedDates = datesArray.map((singleDate) => ({
  date: singleDate.trim(), // Ensure each date is trimmed of any whitespace
  event: eventtitle,
}));

// Push the new blocked dates into the existing blockedDates array
const bookedDates = freelancerUpdate.blockedDates || [];
bookedDates.push(...newBlockedDates);

// Update the freelancer's blockedDates field
freelancerUpdate.blockedDates = bookedDates;


    if (!freelancerUpdate.orders) {
      freelancerUpdate.orders = [];
    }
    freelancerUpdate.orders.push(orderId);
    await freelancerUpdate.save();

    // Return success response with the new order
    return new Response(
      JSON.stringify({ message: "Order created successfully", order: newOrder }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the order." }),
      { status: 500 }
    );
  }
}