'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { format } from 'date-fns';
import { Typography } from '@mui/material'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Script from 'next/script';
import Razorpay from 'razorpay';
import { useRouter } from 'next/navigation';
import { Query } from 'mongoose';
import { useBooking } from "../../context/BookingContext";
import Location from '@/components/location/Location';

const cityArray = [
  "Mumbai, Maharashtra",
  "Delhi, National Capital Territory",
  "Bangalore (Bengaluru), Karnataka",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Surat, Gujarat",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Patna, Bihar",
  "Bhopal, Madhya Pradesh",
  "Vadodara, Gujarat",
  "Ludhiana, Punjab",
  "Agra, Uttar Pradesh",
  "Nashik, Maharashtra",
  "Coimbatore, Tamil Nadu",
  "Kochi (Cochin), Kerala",
  "Visakhapatnam, Andhra Pradesh",
  "Ghaziabad, Uttar Pradesh",
  "Thiruvananthapuram, Kerala",
  "Varanasi, Uttar Pradesh",
  "Rajkot, Gujarat",
  "Meerut, Uttar Pradesh",
  "Faridabad, Haryana",
  "Amritsar, Punjab",
  "Jodhpur, Rajasthan",
  "Madurai, Tamil Nadu",
  "Raipur, Chhattisgarh",
  "Aurangabad, Maharashtra",
  "Gwalior, Madhya Pradesh",
  "Ranchi, Jharkhand",
  "Guwahati, Assam",
  "Bhubaneswar, Odisha",
  "Mysore, Karnataka",
  "Jabalpur, Madhya Pradesh",
  "Goa, Maharashtra",
  "Muzaffarpur, Bihar"
];
{/* City */ }

export default function OrderForm() {

  const router = useRouter();

  const uniqueSortedCities = [...new Set(cityArray.map(city => city.split(",")[0]))].sort();

  const [step, setStep] = useState(1);
  const { id } = useParams();
  const [freelancerData, setFreelancerData] = useState({});
  const [orderData, setOrderData] = useState({
    customerName: '',
    address: '',
    pincode: '',
    mobileNumber: '',
    eventType: '',
    selectedCity: '',
    selectedService: '',
    eventDate: '',
    couponCode: '',
    time: '',
    event: ''
  });

  const [loading, setLoading] = useState(true);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [originalTokenAmount, setOriginalTokenAmount] = useState(0);
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [events, setEvents] = useState([]);
  const [isRefundPolicyAccepted, setIsRefundPolicyAccepted] = useState(false);
  const [time, setTime] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [fullPayment, setFullPayment] = useState(false)
  const [place, setPlace] = useState("");


  const { bookingData } = useBooking();
  useEffect(() => {
    if (bookingData) {
      
      setOriginalTokenAmount(bookingData.price);
      setTokenAmount(Math.round(bookingData.price * 0.2))

    } else {
      alert('Select the requried Service and Dates')
      router.push(`/freelancer/${id}`)
    }
  }, [bookingData]);


  useEffect(() => {
    getBlockedDates(id)
    // // console.log(blockedDates)
  }, [])



  const getBlockedDates = async (Id) => {
    const data = await fetch(`/api/dates/${Id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const blockedDates2 = await data.json();
    
    const blockedDates1 = []
    blockedDates2.map((ele) => blockedDates1.push(ele?.date || ""))
    
    const formattedDates = blockedDates1.map(date => {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Get only 'yyyy-mm-dd' part
    });
    
    setBlockedDates(formattedDates);
  }


  // Fetch freelancer data
  const getFreelancer = async () => {
    try {
      const response = await fetch(`/api/freelancer/${id}`);
      const data = await response.json();
      setFreelancerData(data);
      // Set the token amount based on the full day price initially
      setOriginalTokenAmount(bookingData.price);
      setTokenAmount(Math.round(bookingData.price * 0.2))
      setLoading(false);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    if (id) {
      getFreelancer();
    }

  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    // console.log(orderData.mobileNumber)
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
    if (name === 'selectedService') {
      setEvents([])
      const eventsdata = freelancerData?.freelancerDetails[value]?.subcategories || [];
      setEvents(eventsdata);
      // console.log("Subcategories for selected service:", eventsdata);
      setOrderData((prevData) => ({ ...prevData, eventType: value, time: '', event: '' }));
      setTime([])
      setTokenAmount(0);
      setOriginalTokenAmount(0);
      if (freelancerData?.freelancerDetails[value]?.price) {
        const availableTimes = [];
        if (freelancerData?.freelancerDetails[value]?.price?.fullDayPrice !== '') {
          availableTimes.push('fullDay');
        }
        if (freelancerData?.freelancerDetails[value]?.price?.halfDayPrice !== '') {
          availableTimes.push('halfDay');
        }
        setTime(availableTimes); // Update the time state with available options
      }
    }
    if (name === 'event') {
      setOrderData((prevData) => ({ ...prevData, time: '' }));
      setTokenAmount(0);
      setOriginalTokenAmount(0);
    }
    if (name === 'time') {
      setOrderData((prevData) => ({ ...prevData, time: value }));

      // Update token amount based on selected event and time
      if (orderData.event === 'Wedding') {
        if (value === 'halfDay') {
          setTokenAmount(Math.round((freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.halfDayPrice || 0) * 0.2));
          setOriginalTokenAmount(Math.round(freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.halfDayPrice || 0));
        } else if (value === 'fullDay') {
          setTokenAmount(Math.round((freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.fullDayPrice || 0) * 0.2));
          setOriginalTokenAmount(Math.round(freelancerData?.freelancerDetails[orderData?.selectedService]?.weddingPrice?.fullDayPrice || 0));
        }
      } else {
        // Non-wedding event pricing
        if (value === 'halfDay') {
          setTokenAmount(Math.round((freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0) * 0.2));
          setOriginalTokenAmount(Math.round(freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0));
        } else {
          setTokenAmount(Math.round((freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.fullDayPrice || 0) * 0.2));
          setOriginalTokenAmount(Math.round(freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.fullDayPrice || 0));
        }
      }
    }
    // Update price based on selected time (Half Day or Full Day)
  };

  // Apply coupon logic
  const applyCoupon = () => {
    if (orderData.couponCode === "TRYFIRST" && freelancerData.booking.length === 0) {
      setDiscount(Math.round(tokenAmount * 0.5)); // 90% discount
      setTokenAmount(Math.round(tokenAmount * 0.5));
      setCouponApplied(true);
      setIsCouponValid(true);
      setCouponMessage('Coupon applied successfully You got 50% off!');
    } else {
      setCouponApplied(true);
      setIsCouponValid(false);
      setCouponMessage('Invalid coupon code.');
    }
  };


  const shouldDisableDate = (date) => {
    if (!date || !(date instanceof Date)) {
      return false; // If date is null or not a Date object, do not disable
    }
    const formattedDate = date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
    // // console.log("f",formattedDate)
    return blockedDates.includes(formattedDate) || date < new Date();
  };

  const handleDateChange = (newDate) => {
    if (newDate) { // Check if newDate is not null
      const formattedNewDate = newDate.toISOString().split('T')[0]; // Format selected date

      // Create a new date object for the next day
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1); // Increment day by 1
      // console.log("nxt", nextDay)
      // Check if the selected next day is blocked
      if (shouldDisableDate(nextDay)) {
        setSelectedDate(null); // Clear the selected date
        alert(`The date ${nextDay.toISOString().split('T')[0]} is already booked. Please select another date.`);
        nextDay.setDate(nextDay.getDate() - 1); // Increment day by 1
        return


      } else {
        // console.log("A", newDate)
        setSelectedDate(newDate);
        // // console.log(`Selected date: ${formattedNewDate}`);
      }
    } else {
      setSelectedDate(null); // Handle case when date is cleared
    }
  };

  const getUser = async () => {
    if (localUser) {
      const response = await fetch(`/api/freelancer/${localUser.userid}`);
      const data = await response.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    getUser();
  }, [localUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      setLocalUser(decodedUser);
      setLoading(false);
    }
    else {
      alert('please login before making an order')
      router.push('/log-in')
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e, razorpayOrder) => {
    e.preventDefault();
    if (!isRefundPolicyAccepted) {
      alert('You must accept the refund policy to proceed.');
      return;
    }
    const userid = userData._id;
    const freelancerid = freelancerData._id;
    const discounts = discount;

    // console.log('i am here')
    // console.log("s", selectedDate)
    if (selectedDate == null) {
      alert('please select a valid date ')
      return
    }
    const date = new Date(selectedDate);
    // console.log("ff", date)
    if (blockedDates.includes(date)) {
      date.setDate(date.getDate() + 1);
      alert(`The date ${date.toISOString().split('T')[0]} is already booked.`)
    } else {
      date.setDate(date.getDate() + 1);
      // console.log("date", date)
      const formattedDate = date.toISOString().split('T')[0];
      // console.log(formattedDate)
      const orderDetails = {
        name: orderData.customerName,
        email: localUser?.email || '',
        phone: orderData.mobileNumber,
        pinCode: orderData.pincode,
        address: orderData.address,
        city: place,
        date: formattedDate,
        paidAmount: tokenAmount,
        totalAmount: originalTokenAmount,
        discount: discounts,
        service: orderData.selectedService,
        event: orderData.event,
        additionalDetails: [],
        userid,
        freelancerid,
        time: orderData.time,
        isPolicyAccepted: isRefundPolicyAccepted,
        orderId: razorpayOrder.orderId
      };

      // console.log(orderDetails)

      try {
        const response = await fetch('/api/order/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        })
        // console.log('i am here3')
        const result = await response.json();
        if (response.ok) {
          alert('Order placed successfully');
          // Redirect or take other action
        } else {
          alert('Error placing order: ' + result.message);
        }
      } catch (error) {
        // console.error('Error placing order:', error);
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  const handleNext = () => {
    if (orderData.mobileNumber.length != 10) {
      alert('mobile number must be of 10 digit');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1); // Go back to the first step
  };


  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    if (orderData.mobileNumber.length != 10) {
      alert('mobile number must be of 10 digit');
      return;
    }
    if(place==""){
      alert('please select the city of service');
      return;
    }

    try {
      const amount = tokenAmount
      // console.log(amount)
      const payload = { payAmount: tokenAmount };
      const response = await fetch('/api/razorpay', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  // Convert payload to JSON string
      });

      const razorpayOrder = response.json();
      if (!isRefundPolicyAccepted) {
        alert('You must accept the refund policy to proceed.');
        return;
      }
      const userid = userData._id;
      const freelancerid = freelancerData._id;
      const discounts = discount;
      const razorpayOrderId = razorpayOrder.orderId;

      // console.log(orderData.mobileNumber)
      // console.log(place)


      var options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": tokenAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Foto Dukaan", //your business name
        "description": "Order Transaction",
        "image": "https://res.cloudinary.com/hritiksarraf/image/upload/v1728397188/logo-light_bvqacf.png",
        "order_id": razorpayOrder.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
          // handleSubmit(e,razorpayOrder);
          alert('Your order has been placed')
          router.push('/yourOrder')
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": orderData.customerName, //your customer's name

        },
        "notes": {
          name: orderData.customerName,
          customerPhone: orderData.mobileNumber,
          pinCode: orderData.pincode,
          address: orderData.address,
          city: place,
          date: bookingData.selectedDates,
          totalAmount: originalTokenAmount,
          discount: discounts,
          service: bookingData.selectedCategory,
          event: bookingData.selectedSubcategory,
          userid,
          freelancerid,
          time: bookingData.timeOption,
          orderId: razorpayOrderId
        },
        "theme": {
          "color": "#3399cc"
        }

      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      // console.log("razorPayerror", error)

    }

  }

  if (loading) {
    return (
      <div className='min-h-[80vh] w-[100vw]'>
        <Box sx={{ display: 'flex' }}>
          <div className='pt-80 flex items-center justify-center text-center mx-auto'>
            <CircularProgress color="inherit" size="8rem" />
          </div>
        </Box>
      </div>
    );
  }
  return (
    <div className="pt-32 min-h-[80vh] bg-gray-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Place Your Order
        </h2>
        <div className="bg-white p-8 shadow-lg rounded-lg mb-10">
          <form onSubmit={handlePayment} className="space-y-6 ">

            {/* Step 1 - Basic Details */}
            {step === 1 && (
              <>
                {/* order info */}
                {bookingData && <div>
                  <p className="block text-lg font-semibold mb-1  text-black">
                    Service
                  </p>
                  <p className="block text-lg  mb-1  text-gray-700">
                    {bookingData.selectedSubcategory} - {bookingData.selectedCategory}
                  </p>

                  <div>
                    {/* Date */}
                    <p className="block text-lg font-semibold mb-1 text-black">Date</p>
                    <div className='flex flex-wrap'>
                    {bookingData.selectedDates.split(",").map((date, index) => (
                      <p key={index} className="text-lg mb-1 px-2 border-r-2 text-gray-700">
                        {date}
                      </p>
                    ))}
                    </div>

                    {/* Duration */}
                    <p className="block text-lg font-semibold mb-1 text-black">Duration</p>
                    <p className="block text-lg mb-1 text-gray-700">
                      {bookingData.timeOption
                        .split(",")
                        .map((value, index) =>
                          value === "extraHourPrice"
                            ? ""
                            : value === "fullDayPrice"
                              ? "Full day"
                              : value === "halfDayPrice"
                                ? "Half day"
                                : `${value}${index === 1 ? " Hours" : ""}` // Add "Hours" to the number
                        )
                        .join(" ")} {/* Join with space */}
                    </p>
                  </div>
                </div>}


                <div>
                  <label className="block text-sm font-semibold mb-2  text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderData.customerName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={orderData.pincode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your area pincode"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={orderData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your mobile number"
                    required
                    pattern="^[0-9]{10}$"  // Only allows exactly 10 digits
                    title="Please enter a 10-digit mobile number"  // Tooltip for invalid input
                  />
                </div>

                {/* City Dropdown */}
                <div>
                  {/* <label htmlFor="city" className="block mb-2 text-sm font-medium text-black dark:text-black">
                    City
                  </label>
                  <select
                    name="selectedCity"
                    value={orderData.selectedCity}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select City</option>
                    {uniqueSortedCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select> */}
                  <p className="block text-sm font-semibold mb-2 text-gray-700">City</p>
                  <div className="w-full border rounded-xl py-1">
          <Location onSelectLocation={setPlace} />
        </div>

                </div>


                {/* Coupon Code */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Coupon Code</label>
                  <input
                    type="text"
                    name="couponCode"
                    value={orderData.couponCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter coupon code (if any)"
                  />
                  <button
                    type="button"
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                    onClick={applyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "Coupon Applied" : "Apply Coupon"}
                  </button>
                  {couponApplied && (
                    <p className={`mt-2 text-sm font-semibold ${isCouponValid ? 'text-green-600' : 'text-red-600'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>
                {/* Refund Policy Checkbox */}


                {originalTokenAmount > 0 && <div>
                  <div>
                    <h1 className='text-sm text-green-600'>You can just pay a token amount of 20% or do full payment</h1>
                  </div>
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      id="fullPayment"
                      checked={fullPayment}
                      onChange={(e) => {

                        !fullPayment ? setTokenAmount(originalTokenAmount) : setTokenAmount(Math.round(originalTokenAmount * 0.2))
                        setFullPayment(!fullPayment)
                      }}
                      className="mr-2 text-sm"
                    />
                    <label htmlFor="refundPolicy" className="text-lg text-gray-700">
                      Pay full amount {originalTokenAmount}
                    </label>

                  </div>


                  {/* Amount to be Paid */}
                  <p className="text-lg font-bold text-gray-800">Amount to be Paid: ₹{tokenAmount}</p></div>}

                {/* Submit Button */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="refundPolicy"
                    checked={isRefundPolicyAccepted}
                    onChange={(e) => setIsRefundPolicyAccepted(e.target.checked)}
                    className="mr-2"
                    required // Optionally make it required
                  />
                  <label htmlFor="refundPolicy" className="text-sm text-gray-700">
                    I accept the <a href="https://drive.google.com/file/d/1hyvhQeo9hE7DqvGILuvkREfYSjG1IHcd/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">refund & cancellation policy</a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Place Order
                </button>

                {/* <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Next
                </button> */}
              </>
            )}

            {/* Step 2 - Additional Details */}
            {step === 2 && (
              <>

                {/* Freelancer Service Dropdown */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Service</label>
                  <select
                    name="selectedService"
                    value={orderData.selectedService}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a service</option>
                    {Object.keys(freelancerData.freelancerDetails || {}).map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Event */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Event</label>
                  <select
                    name="event"
                    value={orderData.event}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select the Event</option>
                    {events?.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Time Selector */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Time</label>
                  <select
                    name="time"
                    value={orderData.time}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select the time</option>
                    {time.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}

                  </select>
                </div>

                {/* Coupon Code */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Coupon Code</label>
                  <input
                    type="text"
                    name="couponCode"
                    value={orderData.couponCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter coupon code (if any)"
                  />
                  <button
                    type="button"
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                    onClick={applyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? "Coupon Applied" : "Apply Coupon"}
                  </button>
                  {couponApplied && (
                    <p className={`mt-2 text-sm font-semibold ${isCouponValid ? 'text-green-600' : 'text-red-600'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>
                {/* Refund Policy Checkbox */}


                {originalTokenAmount > 0 && <div>
                  <div>
                    <h1 className='text-sm text-green-600'>You can just pay a token amount of 20% or do full payment</h1>
                  </div>
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      id="fullPayment"
                      checked={fullPayment}
                      onChange={(e) => {

                        !fullPayment ? setTokenAmount(originalTokenAmount) : setTokenAmount(Math.round((freelancerData?.freelancerDetails[orderData?.selectedService]?.price?.halfDayPrice || 0) * 0.2))
                        setFullPayment(!fullPayment)
                      }}
                      className="mr-2 text-sm"
                    />
                    <label htmlFor="refundPolicy" className="text-lg text-gray-700">
                      Pay full amount {originalTokenAmount}
                    </label>

                  </div>


                  {/* Amount to be Paid */}
                  <p className="text-lg font-bold text-gray-800">Amount to be Paid: ₹{tokenAmount}</p></div>}

                {/* Submit Button */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="refundPolicy"
                    checked={isRefundPolicyAccepted}
                    onChange={(e) => setIsRefundPolicyAccepted(e.target.checked)}
                    className="mr-2"
                    required // Optionally make it required
                  />
                  <label htmlFor="refundPolicy" className="text-sm text-gray-700">
                    I accept the <a href="https://drive.google.com/file/d/1hyvhQeo9hE7DqvGILuvkREfYSjG1IHcd/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">refund & cancellation policy</a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Place Order
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-4 w-full bg-gray-500 text-white py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>


  );
}
