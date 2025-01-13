"use client"
import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken'
import OrderCard from '@/components/card/OrderCard';
function page() {
    const [freelancer, setFreelancer] = useState(null)
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState(null)
    const router = useRouter()
    const { id } = useParams();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          console.log("token")
          const decodedUser = jwt.decode(token);
          setUser(decodedUser)
          if(!decodedUser.isAdmin){
            router.push("/")
          }
      }
  
      }, [])
    const getFeelancer = async () => {
        console.log('getting freelancer')
        console.log("id",id)
        const response = await fetch(`/api/freelancer/${id}`);
        const data = await response.json();
        console.log('got freelancer', data)
        const orderresponse = await fetch(`/api/admin/order`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id})
        })
        const orders= await orderresponse.json()
        if(!orders.success){
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
          setOrders(orders.freelancerOrder["orders"])
        }
        setFreelancer(data.user);
    };
      useEffect(()=>{
        // window.location.reload();
        getFeelancer()
      },[])
      const handleAccept=async()=>{
        // const {adminId,freelancerId,isVerifiedByAdmin} = await req.json()
        const response = await fetch("/api/admin/freelancer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId:user?.id,
          freelancerId:id,
          isVerifiedByAdmin:true
        })
        })
        const data = await response.json()
        console.log("dd",data)
        if(data.success&&data.token){
          localStorage.setItem("token",data?.token)
          toast.success('freelancer aprooved Successfuly', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
    })
          window.location.reload();
        }else{
          toast.error('freelancer aprooved failed', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
    })
        }
    }
      const handleDelete=async()=>{
        const response = await fetch(`/api/admin/freelancer/${id}`)
        const data = await response.json()
        if(!data.success){
          toast.error('failed to delete')
        }else{
          toast.success('freelancer deleted')
          router.push('/freelancers')
        } 
      }
    return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full text-2xl font-bold text-center'>
          Details of {freelancer?.name||""}
        </div>
        <div>
          <div className='flex w-full items-center justify-center'>
            <img src={freelancer?.profilePhoto||""} className='size-40 rounded-full' alt="" />
          </div>
          <div>
            Email :{freelancer?.email||""}
          </div>
          <div>
            Phone Number :{freelancer?.phone||""}
          </div>
          <div>
            Address : {freelancer?.address||""}
          </div>
          <div>
            City: {freelancer?.city||""}
          </div>
          <div>
            About :{freelancer?.aboutYourself||""}
          </div>
          <div>
            Adhaar Details : {freelancer?.aadharDetails||""}
          </div>
        </div>
        <div className='w-full text-2xl font-bold text-center'>
          ORDERS
        </div>
        

        <OrderCard
        orders={orders}
        onDelete={true}
        onEdit={true}
        />
        <div className='w-full flex items-center justify-center'>
          <Button disabled={freelancer?.isVerifiedByAdmin||false} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${(freelancer?.isVerifiedByAdmin||false)?"cursor-not-allowed":""}`} onClick={handleAccept}>Approve the freelancer</Button>
        </div>
        <div className='w-full flex items-center justify-center'>
          <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2' onClick={handleDelete}>Delete the freelancer</Button>
        </div>
    </div>
)
}

export default page