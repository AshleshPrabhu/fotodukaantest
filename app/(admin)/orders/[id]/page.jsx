"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function page() {
    const {id} = useParams()
    const router = useRouter()
    const [order, setOrder] = useState({
        customerName: "",
        freelancerName: "",
        customerEmail: "",
        freelancerEmail: "",
        customerPhone: "",
        freelancerPhone: "",
        pinCode: "",
        address: "",
        city: "",
        date: "",
        totalAmount: "",
        paidAmount: ""
    })
    const getOrder = async()=>{
        const response = await fetch(`/api/order/${id} `)
        const data = await response.json()
        if(!data.success){
            toast.error('failed to fetch the order')
        }else{
            console.log("o",data)
            setOrder({
                customerName:data.order.customerName,
                freelancerName:data.order.freelancerName,
                customerEmail:data.order.customerEmail,
                freelancerEmail:data.order.freelancerEmail,
                customerPhone:data.order.customerPhone,
                freelancerPhone:data.order.freelancerPhone,
                pinCode:data.order.pinCode,
                address:data.order.address,
                city:data.order.city,
                date:data.order.date,
                totalAmount:data.order.totalAmount,
                paidAmount:data.order.paidAmount
            })
        }
    }
    useEffect(()=>{
        getOrder()
    },[])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        if (!order.customerName ||!order.customerEmail ||!order.customerPhone ||!order.freelancerName || !order.freelancerEmail || !order.freelancerPhone   || !order.address || !order.pinCode || !order.city ) {
            alert("Please fill out all required fields.");
            return;
        }
        console.log("hello")
        const response = await fetch(`/api/admin/order/${id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(order),
        })
        console.log("hi")
        const data = await response.json()
        console.log("res",data)
        if(!data.success){
            toast.message("failed to update the order", {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
        })

        }else{
            toast.success("Order updated successfully", {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
        })
            router.push("/orders")
            // getOrder()
        }
    }
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center '>
            <div className="min-h-screen flex justify-center items-center p-10 w-full" >
                <form className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-blue-100" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6">Edit order</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">customer name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={order.customerName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">freelancer name</label>
                        <input
                            type="text"
                            name="freelancerName"
                            value={order.freelancerName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">customer email</label>
                        <input
                            type="email"
                            name="customerEmail"
                            value={order.customerEmail}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">freelancer email</label>
                        <input
                            type="email"
                            name="freelancerEmail"
                            value={order.freelancerEmail}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Address</label>
                        <textarea
                            type="text"
                            name="address"
                            value={order.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">customer Phone</label>
                        <input
                            name="customerPhone"
                            value={order.customerPhone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">freelancer Phone</label>
                        <input
                            name="freelancerPhone"
                            value={order.freelancerPhone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">PinCode</label>
                        <input
                            name="pinCode"
                            value={order.pinCode}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">City</label>
                        <select
                            name="city"
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            onChange={handleInputChange}
                            value={order.city}
                            required
                        >
                            
                            <option value="">Select your city</option>
                            <option value="Patna">Patna</option>
                            <option value="Muzzferpur">Muzzferpur</option> 
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    >
                        update order
                    </button>
                </form>
            </div>
        </div>
)
}

export default page