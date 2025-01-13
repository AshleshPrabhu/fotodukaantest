'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import { useParams } from 'next/navigation';
import Link from 'next/link';





export default function page() {
    const {id}= useParams()

    const [loading, setLoading] = useState(true);
    const [localUser, setLocalUser] = useState(null)

    const [freelancerData, setFreelancerData] = useState({
        freelancerDetails: {} // Initialize as an empty object
    });
    
    const getUser = async () => {
        
        const response = await fetch(`/api/freelancer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        setFreelancerData(data);
        setLoading(false)
    };



    useEffect(() => {
        getUser();
    }, []);


    


    if (loading) {
        return (<div className='min-h-[80vh] w-[100vw]'>
            <Box sx={{ display: 'flex' }}>
                <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
            <CircularProgress color="inherit" size="8rem" />
            </div>
          </Box>
        </div>);
      }
    


  return (
    <div className='min-h-[80vh] pt-32'>
        <div className='flex justify-center' >
            <div className='flex text-black md:w-[50vw] w-[90vw]   justify-center gap-10 font-bold rounded-xl shadow-xl  '>
                <Link href={`/freelancers/${id}/edit/gallery`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Gallery</Link>
                <Link href={`/freelancers/${id}/edit/profile`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Profile</Link>
                <Link href={`/freelancers/${id}/edit/service`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Service</Link>
            </div>
        </div>
    </div>
  )
}
