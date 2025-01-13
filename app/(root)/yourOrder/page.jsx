'use client'

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'; // To decode the token
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Script from 'next/script';
import Razorpay from 'razorpay';
import { useRouter } from 'next/navigation';


function OrdersPage() {
  const router=useRouter()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [leftAmount, setLeftAmount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      setLocalUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      if (!localUser) return;
      try {
        const response = await fetch('api/getOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: localUser.userid }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders.reverse());
          setLeftAmount(data.totalAmount - data.discount - data.paidAmount)
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        setError('An error occurred while fetching orders');
      }
      setLoading(false);
    }

    fetchOrders();
  }, [localUser]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch('/api/cancel-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        alert('Failed to cancel the order');
      }
    } catch (error) {
      alert('An error occurred while canceling the order');
    }
  };


  const handlePayment = async (amount,id,name) => {
    // setIsProcessingPayment(true);

    try {
      console.log(amount)
      const payload = { payAmount: amount };
      const response = await fetch('/api/razorpay', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  // Convert payload to JSON string
      });

      const razorpayOrder = response.json();


      var options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
          "name": name, //your customer's name

        },
        "notes": {
          orderId: id
        },
        "theme": {
          "color": "#3399cc"
        }

      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("razorPayerror", error)
    }
  }

  if (loading) {
    return (<div className='min-h-[80vh] w-[100vw]'>
      <Box sx={{ display: 'flex' }}>
        <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
          <CircularProgress color="inherit" size="8rem" />
        </div>
      </Box>
    </div>);
  }
  if (error) return <p className="text-red-500 pt-32">{error}</p>;



  return (
    <div className='pt-32 bg-blue-100'>
      <div className="min-h-screen p-8 bg-blue-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <h1 className="text-3xl text-blue-900 font-bold text-center mb-6">Welcome <span className='text-yellow-600'>{localUser.name}</span> This is Your Order History!</h1>

        {orders.length === 0 ? (
          <p className="text-black text-5xl text-center mt-32">You have no orders.</p>
        ) : (
          <div className=''>
            <div className='md:w-[55vw] mx-auto  flex flex-col flex-wrap'>
              {orders.map((order) => {
                return (
                  <section className="text-gray-600 body-font overflow-hidden my-5  bg-gradient-to-r from-white to-white">
                    <div className="container lg:w-[60vw] p-4 md:p-5 py-2 mx-auto  bg-white  ">
                      <div className=" mx-auto p-5 flex flex-wrap   ">
                        {/* <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg'} /> */}
                        <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                          <Link href={`/freelancer/${order.freelancerId}`}>
                          <h2 className="text-sm title-font text-gray-700 tracking-widest">Freelancer</h2>
                          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{order.freelancerName}</h1>
                          </Link>
                          <div className="flex mb-4">



                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 tracking-widest">Service Address</h2>
                            <h1 className='text-xl font-bold'>{order.city} - {order.pinCode}</h1>
                            <p className="leading-relaxed ">{order.address}</p>
                          </div>



                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Date</h2>
                            <div className='flex flex-wrap'>
                                {order.date.split(",").map((date, index) => (
                                  <p key={index} className="text-xl font-bold mb-1 px-2 border-r-2 ">
                                    {date}
                                  </p>
                                ))}
                              </div>
                          </div>

                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Service Type</h2>
                            <h1 className='text-xl font-bold'>{order.service} - {order.event}</h1>
                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">
                              Service Duration
                            </h2>
                            <h1 className="text-xl font-bold">
                                {order.time
                                  .split(",")
                                  .map((value, index) =>
                                    value === "extraHourPrice"
                                      ? ""
                                      : value === "fullDayPrice"
                                        ? "Full Day"
                                        : value === "halfDayPrice"
                                          ? "Half Day"
                                          : `${value}${index === 1 ? " Hours" : ""}` // Add "Hours" to the number
                                  )
                                  .join(" ")}
                              </h1>
                          </div>
                          <div>
                            <h2 className="text-sm title-font text-gray-700 mt-3 tracking-widest">Amount</h2>
                            <h1 className='text-xl font-bold'> <span className='font-normal'> Paid Amount</span> - ₹{order.paidAmount}</h1>
                            <h1 className='text-xl font-bold'> <span className='font-normal'>discount Amount</span> - ₹{order.discount}</h1>
                            <h1 className='text-xl font-bold'> <span className='font-normal text-lg'>When freelancer visit you need to pay </span> - ₹{(order.totalAmount - order.discount - order.paidAmount).toFixed(2)}</h1>
                          </div>


                          <div className='flex justify-between'>
                          <button href={`/`} className="flex mt-4  text-white bg-red-500  border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Cancel</button>
                         {(order.totalAmount - order.discount - order.paidAmount).toFixed(2)>1 && <button onClick={()=>{handlePayment((order.totalAmount - order.discount - order.paidAmount).toFixed(2),order._id,order.customerName)}} className="flex mt-4  text-white bg-green-500  border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Pay Now</button>}
                          </div>
                         
                        </div>
                        <div>

                        </div>

                      </div>




                    </div>

                  </section>
                )
              })}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
