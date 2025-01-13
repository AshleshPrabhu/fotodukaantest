'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import Link from 'next/link';

import Image from 'next/image';
import { useParams } from 'next/navigation';



const categories = [
    {
    name: 'Traditional Photography',
    subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
    pricing: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
    },
    weddingPrice: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
        },
    },
    {
    name: 'Candid Photography',
    subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
    pricing: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
    },
    weddingPrice: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
        },
    },
    {
    name: 'Traditional Videography',
    subcategories: ['Wedding', 'Toure & Travel', 'Pre wedding', 'Birthday', 'Anniversary', 'Engagement', 'Event', 'New Born Baby', 'Corporate', 'Brand Promotion', 'Fashion', 'Other'],
    pricing: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
    },
    weddingPrice: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
        },
    },
    {
    name: 'Cinematography',
    subcategories: ['Wedding', 'Corporate', 'Toure & Travel', 'Pre wedding', 'Maternity', 'Birthday', 'Anniversary', 'Engagement', 'Portfolio', 'Food', 'New Born Baby', 'Fashion', 'Event', 'Brand Promotion', 'Other'],
    pricing: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
    },
    weddingPrice: {
        fullDayPrice: true,
        halfDayPrice: true,
        extraHourPrice: true,
        },
    },
    {
    name: 'Drone',
    subcategories: ['Wedding', 'Corporate', 'Event', 'Other'],
    pricing: {
        fullDayPrice: true,
    },
    weddingPrice: {
        fullDayPrice: true,
    },
    },
    {
    name: 'Crane',
    subcategories: [ 'Events'],
    pricing: {
        fullDayPrice: true,
    },
    },
    {
    name: 'LED wall',
    subcategories: ['Events'],
    ledDetails: { size: '' },
    pricing: {
        fullDayPrice: true,
    },
    },
    {
    name: 'LED TV',
    subcategories: ['Events'],
    ledDetails: { size: '' },
    pricing: {
        fullDayPrice: true,
    },
    },
];

export default function page() {

    const [loading, setLoading] = useState(true);
    const [localUser, setLocalUser] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState({});
    const [freelancerData, setFreelancerData] = useState({
    });
    const [freelancerId, setFreelancerId] = useState(null); 
    const [uploading, setUploading] = useState(false);
    const {id}=useParams()

    const handleCategoryClick = (category) => {
         setSelectedCategories(prevState => {
             // If the category is already selected, remove it
             if (prevState[category]) {
                 const updatedCategories = { ...prevState };
                 delete updatedCategories[category];  // Remove category from state
                 return updatedCategories;
             }
 
             // Otherwise, add the category
             return {
                 ...prevState,
                 [category]: { subcategories: [], cameraDetails: {} }
             };
         });
     };
    const handleButtonClick=(category)=>{
        setSelectedCategories(prevState=>{
            const categoryData = prevState[category.name] || { subcategories: [], cameraDetails: {} };
            return {
                ...prevState,
                [category.name]: { ...categoryData, subcategories: category.subcategories }
            };
        })
    }
 
     const handleSubcategoryClick = (category, subcategory) => {
         setSelectedCategories(prevState => {
             const categoryData = prevState[category] || { subcategories: [], cameraDetails: {} };
             const updatedSubcategories = categoryData.subcategories.includes(subcategory)
                 ? categoryData.subcategories.filter(sub => sub !== subcategory)
                 : [...categoryData.subcategories, subcategory];
 
             return {
                 ...prevState,
                 [category]: { ...categoryData, subcategories: updatedSubcategories }
             };
         });
     };
 
    
    

     const handlePriceChange = (category, priceType, field, value) => {
        setSelectedCategories(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [priceType]: {
                    ...prev[category][priceType],
                    [field]: value
                }
            }
        }));
    };

    const handleCameraDetailsChange = (category, field, value) => {
        setSelectedCategories(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                cameraDetails: {
                    ...prevState[category]?.cameraDetails,
                    [field]: value
                }
            }
        }));
    };

    const handleLedDetailsChange = (category, field, value) => {
        setSelectedCategories(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                ledDetails: {
                    ...prevState[category]?.ledDetails,
                    [field]: value
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.values(selectedCategories).some(
            (category) => category.subcategories && category.subcategories.length > 0
        );
        if (!isValid) {
            alert("Please select at least one category and subcategory.");
            return;
        }
    
        setUploading(true);
        const id = freelancerData._id;
    
        // Post the updated freelancer profile data
        const response = await fetch('/api/edit/service', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selectedCategories,
                id:freelancerId
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Profile updated successfully");
            setFreelancerData(data.freelancer.freelancerDetails); // Clear the selected file after successful upload
            await getUser()
        } else {
            alert("Failed to update profile: " + data.message || "Unknown error");
        }
    
        setUploading(false);
    };




    const getUser = async () => {
        
        const response = await fetch(`/api/freelancer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        setSelectedCategories(data.freelancerDetails)
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
        <div>
        <section className="bg-gradient-to-b md:min-h-[100vh] min-h-[100vh] mt-10  from-white to-yellow-200 ">
                        <div className="flex flex-col items-center    px-6  mx-auto ">
                            
                        </div>
                        <div className="flex flex-col items-center my-auto justify-center shadow-2xl bg-white  border-2 w-[90vw] md:w-[30vw]  px-6 py-8 mx-auto  lg:py-0">

                           
                            <h1 className="text-xl font-bold mt-4 mb-10 leading-tight tracking-tight text-black md:text-4xl ">
                                Update Your Services
                            </h1>
                            <div className="flex flex-col bg-white items-start justify-start w-full ">
                                {categories.map((category) => (
                                    <div key={category.name} className="w-full">
                                        <button onClick={() => handleCategoryClick(category.name)} className={`flex gap-5 shadow-md justify-center items-center w-full md:w-[27vw] p-4  text-left border-b rounded-lg my-2 ${selectedCategories[category.name] ? 'bg-blue-600 text-white' : 'bg-yellow-400'}`}>
                                            <span>{category.name}</span>
                                            {/* <span>{selectedCategories[category.name]?.subcategories.length || 0}</span> */}
                                        </button>
                                        {selectedCategories[category.name] && (
                                            <div className="p-1 ">
                                                <div className=" flex flex-wrap">
                                                {(category.name!=="Crane"&&category.name!=="LED wall"&&category.name!=="LED TV")&&(
                                                        <div className='w-full flex items-center justify-center'>
                                                            <button
                                                                className="rounded-md bg-blue-400 w-[30%] p-4"
                                                                onClick={()=>handleButtonClick(category)}
                                                            >Select All</button>
                                                        </div>
                                                    )
                                                    }
                                                    {category.subcategories.map((subcategory) => (

                                                        <div
                                                            key={subcategory}
                                                            className={`flex items-center w-[100%] md:[45%]  m-2 cursor-pointer p-2  rounded-md transition-colors duration-200 ${selectedCategories[category.name]?.subcategories?.includes(subcategory) ? 'bg-green-500' : 'bg-yellow-400'}`}
                                                            onClick={() => handleSubcategoryClick(category.name, subcategory)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedCategories[category.name]?.subcategories?.includes(subcategory) || false}  // Ensure subcategories exist and includes is called on an array
                                                                onChange={(e) => {
                                                                    e.stopPropagation(); // Prevents the div's onClick event from firing when clicking directly on the checkbox
                                                                    handleSubcategoryClick(category.name, subcategory);
                                                                }}
                                                                onClick={(e) => e.stopPropagation()} // Prevents the div click from triggering when clicking the checkbox
                                                                className={`  m-1 w-6 h-6 appearance-none border-2 border-gray-300 bg-white rounded-md checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-200`}
                                                            />
                                                            <label className="text-gray-700 ml-2 text-sm font-medium hover:text-blue-500 cursor-pointer transition-colors duration-200">
                                                                {subcategory}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    
                                                </div>

                                                
                                                {(category.name === "Photography" || category.name === "Videography" || category.name === "Candid Photography" || category.name==="Cinematography") && (
                                                    <div className="mt-2 mb-5 "> 
                                                        <div className='block w-[100%] h-[100%]'>
                                                            <h2 className="text-3xl text-center my-5 font-semibold">Camera Details</h2>

                                                            <label htmlFor="brand" className="block mb-2">Camera Brand</label>
                                                            <select
                                                                id="brand"
                                                                value={selectedCategories[category.name]?.cameraDetails?.brand || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'brand', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded"
                                                            >
                                                                <option value="" disabled>Select Camera Brand</option>
                                                                <option value="Nikon">Nikon</option>
                                                                <option value="Canon">Canon</option>
                                                                <option value="GoPro">GoPro</option>
                                                                <option value="Sony">Sony</option>
                                                                <option value="Fujifilm">Fujifilm</option>
                                                                <option value="Panasonic">Panasonic</option>
                                                                <option value="Leica">Leica</option>
                                                                <option value="Hasselblad">Hasselblad</option>
                                                                <option value="Red">Red</option>
                                                                <option value="Arri">Arri</option>
                                                            </select>

                                                            <label htmlFor="model" className="block mb-2 mt-4">Camera Model</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Model"
                                                                value={selectedCategories[category.name]?.cameraDetails?.model || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'model', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded"
                                                            />

                                                            <label htmlFor="specs" className="block mb-2 mt-4">Camera Lense</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category.name]?.cameraDetails?.lanse || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'lanse', e.target.value)}
                                                                className="block bg-blue-100 w-full p-2 border rounded mt-2"
                                                            />
                                                            <label htmlFor="Gimble" className="block mb-2 mt-4">Gimble</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Camera Lense"
                                                                value={selectedCategories[category?.name]?.cameraDetails?.gimble || ''}
                                                                onChange={(e) => handleCameraDetailsChange(category.name, 'gimble', e.target.value)}
                                                                className="block w-full bg-blue-100 p-2 border rounded mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <h3 className="text-lg font-medium mt-4 mb-1">Pricing:</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {category.pricing.fullDayPrice && (
                                                    <div>
                                                    <label className="block">Full Day Price:</label>
                                                    <input
                                                        type="number"
                                                        value={selectedCategories[category?.name]?.price?.fullDayPrice}
                                                        onChange={(e) => handlePriceChange(category.name, 'price', 'fullDayPrice', e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    
                                                    </div>
                                                )}
                                                {category.pricing.halfDayPrice && (
                                                    <div>
                                                    <label className="block">Half Day Price:</label>
                                                    <input
                                                        type="number"
                                                        value={selectedCategories[category?.name]?.price?.halfDayPrice}
                                                        onChange={(e) => handlePriceChange(category.name, 'price', 'halfDayPrice', e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    
                                                    </div>
                                                    
                                                )}
                                                {category.pricing.extraHourPrice && (
                                                    <div>
                                                    <label className="block">Extra Hour Price:</label>
                                                    <input
                                                        type="number"
                                                        value={selectedCategories[category.name]?.price?.extraHourPrice}
                                                        onChange={(e) => handlePriceChange(category.name, 'price', 'extraHourPrice', e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    
                                                    </div>
                                                )}
                                                </div>
                                                {category?.weddingPrice&&(
                                                    <h3 className="text-lg font-medium mt-4 mb-1">Wedding Pricing:</h3>
                                                )}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {category?.weddingPrice?.fullDayPrice && (
                                                    <div>
                                                    <label className="block">Wedding Full Day Price:</label>
                                                    <input
                                                        type="number"
                                                        value={selectedCategories[category.name]?.weddingPrice?.fullDayPrice}
                                                        onChange={(e) => handlePriceChange(category.name, 'weddingPrice', 'fullDayPrice', e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    
                                                    </div>
                                                )}
                                                {category?.weddingPrice?.halfDayPrice && (
                                                    <div>
                                                    <label className="block">Wedding Half Day Price:</label>
                                                    <input
                                                        type="number"
                                                        value={selectedCategories[category.name]?.weddingPrice?.halfDayPrice}
                                                        onChange={(e) => handlePriceChange(category.name, 'weddingPrice', 'halfDayPrice', e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    
                                                    </div>
                                                )}
                                                {category?.weddingPrice?.extraHourPrice && (
                                                    <div>
                                                    <label className="block">Wedding Extra Hour Price:</label>
                                                    <input
                                                        type="number"
                                                        value={selectedCategories[category.name]?.weddingPrice?.extraHourPrice}
                                                        onChange={(e) => handlePriceChange(category.name, 'weddingPrice', 'extraHourPrice', e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    

                                                    </div>
                                                )}
                                                </div>

                                                
                                                {category.name === "Drone" && (
                                                <div className="mt-4">
                                                    <h3 className="text-lg font-medium mb-2">Drone Details:</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                        Drone Brand
                                                        </label>
                                                        <input
                                                        type="text"
                                                        placeholder="Enter Drone Brand"
                                                        value={selectedCategories[category.name]?.cameraDetails?.brand || ''}
                                                        onChange={(e) => handleCameraDetailsChange(category.name, 'brand', e.target.value)}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                        Drone Model
                                                        </label>
                                                        <input
                                                        type="text"
                                                        placeholder="Enter Drone Model"
                                                        value={selectedCategories[category.name]?.cameraDetails?.model || ''}
                                                        onChange={(e) => handleCameraDetailsChange(category.name, 'model', e.target.value)}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                        />
                                                    </div>
                                                    </div>
                                                </div>
                                                )}
                                                {(category.name === "LED wall" || category.name === "LED TV") && (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-medium mb-2">LED Details:</h3>
                                                        <div>
                                                        <label className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                            Size 
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter size (e.g., 10x20)"
                                                            value={selectedCategories[category.name]?.ledDetails?.size || ''}
                                                            onChange={(e) => handleLedDetailsChange(category.name, 'size', e.target.value)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                        />
                                                        </div>
                                                    </div>
                                            )}




                                            </div>
                                        )}
                                        
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between w-[100%] md:mb-20'>
                            <button
                    onClick={handleSubmit}
                    disabled={uploading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                    {uploading ? "Updating..." : "Update Profile"}
                </button>
                            </div>
                        </div>
                    </section>
        </div>
    </div>
  )
}
