"use client"
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useParams } from 'next/navigation'
import OrderCard from '@/components/card/OrderCard'
function page() {
    const {id}=useParams()
    const [user, setUser] = useState(null)
    const [freelancer, setFreelancer] = useState(null)
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
        setFreelancer(data);
    };
    useEffect(()=>{
        // window.location.reload();
        getFeelancer()
    },[])
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <div className='text-center text-2xl font-bold'>
                BOOKINGS
            </div>
            <OrderCard
            orders={freelancer?.bookings||[]}
            onDelete={true}
            onEdit={true}
            />
        </div>
)
}

export default page