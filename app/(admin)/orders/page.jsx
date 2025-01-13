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
    const [userOpen, setUserOpen] = useState(false)
    const [userReason, setUserReason] = useState(null)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [reason, setReason] = useState(null)
    const getOrders=async()=>{
        const response = await fetch(`/api/admin/order`)
        const data = await response.json()
        if(!data.success){
          toast.error('failed to fetch orders')
        }else{
          let arr =[]
          data.orders?.map((order)=>{
              if(!order.freelancerAproved&&!order.freelancerCancel&&!order.admineApproved&&!order.userCancel){
                  arr.push(order)
              }
          })
          setOrder(arr)
          console.log("aa",arr)
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
    const handleUserCancel=async(item)=>{
      console.log("i",item)
      const id = item._id
      if(!userReason){
        alert('please enter the reason to cancel the order')
      }else{
        const response = await fetch("/api/order/user",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id:selectedOrderId,userCancelReason:userReason}),
          cache:"no-store"
        })
        const data = await response.json()
        console.log(data)
        if(!data.success){
          toast.error('failed to cancel users order')
        }else{
          toast.success('users order canceled successfully')
          setUserOpen(false)
          getOrders()
          // window.location.reload()
        }
      }
    }
    const handleFreelancerCancel=async(id)=>{
      if(!reason){
        alert('please enter the reason to cancel the order')
      }else{
        const response = await fetch("/api/order/freelancer/cancel",{
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
          setOpen(false)
          getOrders()
        }
      }
    }
    const handleApprove=async(id)=>{
      const response = await fetch(`/api/admin/order/approve`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:id})
      })
      const data = await response.json()
      if(!data.success){
          toast.error('failed to approve order')
      }else{
          toast.success('order approved')
          window.location.reload()
      }
  }
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center '>
        <div className='w-full text-center font-bold text-3xl mb-5'>ORDERS </div>
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