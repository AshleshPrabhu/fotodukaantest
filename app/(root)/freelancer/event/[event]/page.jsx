'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SearchBar from '@/components/searchBar/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Link from 'next/link';

// Subcategory image array
const subcategoryImages = {
  Wedding: 'https://images.unsplash.com/photo-1665960213530-3fb10da1f25e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwd2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
  Corporate: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlJTIwZXZlbnR8ZW58MHx8MHx8fDA%3D',
  'Tour & Travel': 'https://images.unsplash.com/photo-1521335751419-603f61523713?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VG91ciUyMCUyNiUyMFRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'Pre wedding': 'https://images.unsplash.com/photo-1727430269557-15707dcd1d83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UHJlJTIwd2VkZGluZyUyMHBob3RvfGVufDB8fDB8fHww',
  Maternity: 'https://images.unsplash.com/photo-1493101670003-a9c7db5858b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE1hdGVybml0eSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D',
  Birthday: 'https://img.freepik.com/premium-photo/friends-celebrating-birthday-party_1280275-114523.jpg?semt=ais_hybrid',
  Anniversary: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202009/119721612_819078418634880_7161_1200x768.jpeg?size=690:388',
  Engagement: 'https://media.istockphoto.com/id/155360195/photo/indian-wedding-rings.jpg?s=612x612&w=0&k=20&c=la5gwG7dXcno0pt6DJfgX9Mniz-_obTYEHgPz3AlaQw=',
  Portfolio: 'https://www.bringitonline.in/uploads/2/2/4/5/22456530/modelling-portfolio-photography-54_orig.jpg',
  Food: 'https://media.istockphoto.com/id/933844508/photo/food-photography-production.jpg?s=612x612&w=0&k=20&c=uXc6Uj64cXB5-RoYshDEEjU0ep9h343di4gDhONtsYQ=',
  'New Born Baby': 'https://media.istockphoto.com/id/1408003931/photo/newborn-girl-photoshoot.jpg?s=612x612&w=0&k=20&c=AZ66qZjjTdT3J7HWx5GNJ7DqVjYE4qM1T3UngvoHmTE=',
  Fashion: 'https://audaces.com/wp-content/uploads/2023/03/fashion-photoshoot-scaled.webp',
  Event: 'https://121clicks.com/wp-content/uploads/2021/11/shooting_event_video_photography_01.jpg',
  'Brand Promotion': 'https://amandacampeanu.com/wp-content/uploads/2019/07/10-poses-for-your-next-brand-photoshoot-1.jpg',
  Other: 'https://dummyimage.com/600x400/999/fff&text=Other',
};

// Categories with subcategories
const categories = [
  {
    name: 'Traditional Photography',
    subcategories: ['Wedding', 'Corporate', 'Tour & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
  },
  {
    name: 'Candid Photography',
    subcategories: ['Wedding', 'Corporate', 'Tour & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
  },
  {
    name: 'Traditional Videography',
    subcategories: ['Wedding', 'Tour & Travel', 'Pre wedding', 'Birthday', 'Anniversary', 'Engagement', 'Event', 'New Born Baby', 'Corporate', 'Brand Promotion', 'Fashion', 'Other'],
  },
  {
    name: 'Cinematography',
    subcategories: ['Wedding', 'Corporate', 'Tour & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
  },
  {
    name: 'Drone',
    subcategories: ['Wedding', 'Corporate', 'Event', 'Other'],
  },
];

export default function Page() {
  const { event } = useParams(); // Get the event from the URL
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decodedEvent, setDecodedEvent] = useState('');

  useEffect(() => {
    // Decode the event from the URL to handle spaces and special characters
    const decoded = decodeURIComponent(event);
    setDecodedEvent(decoded);

    // Find the category that matches the decoded event
    const category = categories.find((cat) => cat.name.toLowerCase() === decoded.toLowerCase());
    if (category) {
      setFilteredCategory(category);
    }

    setLoading(false);
  }, [event]);

  if (loading) {
    return (
      <div className='min-h-[80vh] w-[100vw]'>
        <Box sx={{ display: 'flex' }}>
          <div className='pt-80 flex items-center justify-center text-center mx-auto'>
            <CircularProgress color="inherit" size="8rem" />
          </div>
        </Box>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-[80vh]">
      <div>
        <SearchBar />
      </div>
      
      {filteredCategory ? (
        <>
          <p className='text-center font-bold  text-2xl md:text-5xl my-4'>
            Freelancers for <span className='text-blue-600'>{filteredCategory.name}</span>
          </p>
          <div className='flex flex-wrap gap-8 justify-center'>
            {filteredCategory.subcategories.map((subcategory, index) => (
              <Link href={`/freelancer/event/${decodedEvent}/${subcategory}`} key={index} className="w-[90vw] md:w-[22vw] mx-auto">
                <div className="bg-gradient-to-r from-white to-white dark:text-black my-6 shadow-lg flex flex-col bg-primary/10">
                  <div className="block h-64 w-64 mx-auto rounded-full pt-4">
                    <img
                      src={subcategoryImages[subcategory]}  // Get image based on subcategory
                      alt={subcategory}
                      className="aspect-square object-cover rounded-md h-full w-full"
                    />
                  </div>

                  <div className="flex flex-col items-center text-center mt-4">
                    <p className="text-xl font-bold my-4">{subcategory}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className='text-center text-2xl md:text-5xl'>
          No category found for {decodedEvent}
        </p>
      )}
    </div>
  );
}
