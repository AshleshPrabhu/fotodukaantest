'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';





export default function page() {

    const [loading, setLoading] = useState(true);
    const [localUser, setLocalUser] = useState(null)

    const [freelancerData, setFreelancerData] = useState({
        freelancerDetails: {} // Initialize as an empty object
    });

    const getUser = async () => {
        if(localUser){
        const response = await fetch(`/api/freelancer/${localUser.userid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        // console.log(data)
        setFreelancerData(data);}
    };



    useEffect(() => {
        getUser();
    }, [localUser]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt.decode(token);
            setLocalUser(decodedUser);
            setLoading(false)
        }
    }, [])


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
        <EditBar/>
    </div>
  )
}
