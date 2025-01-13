"use client"
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { Input } from '@mui/material'
import FreelancerCard from '@/components/card/FreelancerCard'

function page() {
  const [user, setUser] = useState(null)
  const [freelancers, setFreelancers] = useState(null)
  const [search, setSearch] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const fetchFreelancerArray = async(freelancerIds)=>{
    console.log(freelancerIds)
    const freelancerData = await Promise.all(
      freelancerIds.map(async (id) => {
        const response = await fetch(`/api/freelancer/${id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
        });
        // console.log("a",await response.json())
        return await response.json(); // Assuming the API returns JSON
      })
    );
    console.log(freelancerData)
    setFreelancers(freelancerData);
    setSearchResult(freelancerData)
    
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        console.log("token")
        const decodedUser = jwt.decode(token);
        console.log("d",decodedUser)
        setUser(decodedUser);
        fetchFreelancerArray(decodedUser?.freelacers||[])
        if(!decodedUser.isAdmin){
          router.push("/")
        }
    }
    }, [])
    useEffect(()=>{
      const searchPosts =freelancers && freelancers.filter((fr) =>fr.name.toLowerCase().includes(search.trim().toLowerCase()));
      setSearchResult(searchPosts)
  
    },[setSearch,search])
    const handleAccept=async(id)=>{
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
        toast.success('freelancer aprooved Successfuly')
        window.location.reload();
      }else{
        toast.error('freelancer aprooved failed')
      }
    }
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
      <FreelancerCard
      approve={true}
      todelete={true}
      viewMore={true}
      />
    </div>
  )
}

export default page