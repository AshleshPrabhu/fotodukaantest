"use client"
import OrderCard from '@/components/card/OrderCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function page() {
    const {id}=useParams()
    const [orders, setOrders] = useState([])
    const getOrders=async()=>{
        const response = await fetch('/api/admin/freelancer/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id})
        })
        const data = await response.json()
        console.log(data)
        if(!data.success){
            toast.error('failed to find the orders', {
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
            setOrders(data.orders)
        }
    }
    useEffect(()=>{
        getOrders()
    },[])
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <OrderCard
        orders={orders}
        onEdit={true}
        onDelete={true}
        />
    </div>
  )
}

export default page