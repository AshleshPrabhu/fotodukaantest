'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ServiceCard from '@/components/card/ServiceCard';
import SearchBar from '@/components/searchBar/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Page() {
  const { people,event, place } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const decodedpeople=decodeURIComponent(people)
  const decodedplace=decodeURIComponent(place)
  const decodedevent=decodeURIComponent(event)

  const getFreelancers = async () => {
    try {
      const response = await fetch(`/api/freelancer/type/${decodedpeople}/${decodedevent}/${decodedplace}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const datas = await response.json();

      // Check if there is a message (like "No data found")
      if (datas.message) {
        setData([]);
      } else {
        const sortedData = datas.sort((a, b) => b.stars.star - a.stars.star);
        setData(sortedData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFreelancers();
  }, [people, place]);

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
    <div className="pt-24 min-h-[80vh]">
        <div>
            <SearchBar/>
        </div>
      {data.length === 0 ? (
        <p className='text-center text-2xl mt-10 md:text-5xl'>No freelancers found for {decodedevent} {decodedpeople} in {decodedplace}.</p>
      ) : ( <>
       <p className='text-center font-bold text-2xl md:text-5xl my-10'>Freelancers for <span className='text-blue-600'>{decodedevent} {decodedpeople}</span> in <span className='text-yellow-500'>{place}. </span></p>
      <div className='flex flex-wrap gap-8'>
         
        {data.map((freelancer) => (
          <ServiceCard key={freelancer._id} {...freelancer} />
        ))}
        </div>
        </>)}
    </div>
  );
}
