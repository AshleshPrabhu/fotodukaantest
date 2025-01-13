"use client"
import React,{useEffect, useState} from 'react'
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import OrderCard from '@/components/card/OrderCard';
// get the orders for a user
export default function page() {
  const {id} = useParams()
  const [user, setUser] = useState(null)
  const fetchOrders = async()=>{
    const response = await fetch('/api/admin/user/getUser',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id})
    })
    const data = await response.json()
    if(!data.success){
      toast.error('failed to fetch the bookings ')
    }else{
      setUser(data.orders)
      console.log("data",data)
    }
  }
  useEffect(()=>{
    fetchOrders()
  },[])
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
      <OrderCard
      orders={user||[]}
      onEdit={true}
      onDelete={true}
      />
    </div>
  )
}
