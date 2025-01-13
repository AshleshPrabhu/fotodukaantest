"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { Input } from '@mui/material';
import FreelancerCard from '@/components/card/FreelancerCard';

function page() {
  const [freelancer, setFreelancer] = useState(null)
  const [search, setSearch] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const router = useRouter()
  const getFeelancer = async () => {
    console.log('getting freelancer')
    const response = await fetch("/api/freelancer");
    const data = await response.json();
    console.log('got freelancer', data)
    setFreelancer(data);
    setSearchResult(data)

  };
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
    // window.location.reload();
    getFeelancer()
  },[])
  useEffect(()=>{
    if (/\d/.test(search)) {
      const searchPosts = freelancer && freelancer.filter((fr) =>
          fr.phone.toString().includes(search.trim())
      );
      setSearchResult(searchPosts);
    }else{

      const searchPosts =freelancer && freelancer.filter((fr) =>fr.name.toLowerCase().includes(search.trim().toLowerCase()));
      setSearchResult(searchPosts)
    }
    

  },[setSearch,search])
  
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
      <FreelancerCard
      todelete={true}
      edit={true}
      booking={true}
      profile={true}
      orders={true}
      />
    </div>
  )
}

export default page