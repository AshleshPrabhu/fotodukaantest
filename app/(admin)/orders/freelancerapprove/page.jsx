"use client"
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import Modal from '@mui/material/Modal';
import OrderCard from '@/components/card/OrderCard'

function page() {
const [order, setOrder] = useState(null)
const [open, setOpen] = useState(false)
const [reason, setReason] = useState(null)
const getOrders=async()=>{
    const response = await fetch(`/api/admin/order`)
    const data = await response.json()
    if(!data.success){
        toast.error('failed to fetch orders', {
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
        let arr =[]
        data.orders?.map((order)=>{
            if(order.freelancerAproved){
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
const handleFreelancerCancel=async(id)=>{
    if(!reason){
        alert('please enter the reason to cancel the order')
    }else{
        const response = await fetch("/cancel",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:id,freelancerCancelReason:reason})
        })
        const data = await response.json()
        if(!data.success){
            toast.error('failed to cancel freelancer order')
        }else{
            toast.success('freelancer order canceled successfully')
            window.location.reload()
        }
    }
}


return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
    <div className='w-full text-center font-bold text-3xl mb-5'>ORDERS APPROVED BY FREELANCER </div>
    <OrderCard
    orders={order}
    approve={true}
    onDelete={true}
    onEdit={true}
    />
    </div>
)
}

export default page