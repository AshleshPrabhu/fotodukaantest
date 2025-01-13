"use client"
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import OrderCard from '@/components/card/OrderCard'
function page() {
const [order, setOrder] = useState(null)
const getOrders=async()=>{
    const response = await fetch(`/api/admin/order`)
    const data = await response.json()
    if(!data.success){
        toast.error('failed to fetch orders')
    }else{
        let arr =[]
        data.orders?.map((order)=>{
            if(order.admineApproved){
                arr.push(order)
            }
        })
        setOrder(arr)
        // window.location.reload()
    }
}
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        console.log("token")
        const decodedUser = jwt.decode(token);
        if(!decodedUser.isAdmin){
        router.push("/")
        }
    }

    }, [])
useEffect(()=>{
    getOrders()
},[])
return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
    <div className='w-full text-center font-bold text-3xl mb-5'>ORDERS APPROVED BY ADMIN </div>
    <OrderCard
        orders={order}
        onDelete={true}
        approve={true}
        onEdit={true}
    />

    </div>
)
}

export default page