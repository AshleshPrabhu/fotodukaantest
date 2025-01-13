'use client';

import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddPhotoAlternateOutlined from '@mui/icons-material/AddPhotoAlternateOutlined';
import jwt from "jsonwebtoken";
import EditBar from '@/components/editBar/EditBar';
import { useParams } from 'next/navigation';
import Link from 'next/link';


const cityArray = [
    "Mumbai, Maharashtra",
    "Delhi, National Capital Territory",
    "Bangalore (Bengaluru), Karnataka",
    "Hyderabad, Telangana",
    "Ahmedabad, Gujarat",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Jaipur, Rajasthan",
    "Surat, Gujarat",
    "Lucknow, Uttar Pradesh",
    "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra",
    "Indore, Madhya Pradesh",
    "Patna, Bihar",
    "Bhopal, Madhya Pradesh",
    "Vadodara, Gujarat",
    "Ludhiana, Punjab",
    "Agra, Uttar Pradesh",
    "Nashik, Maharashtra",
    "Coimbatore, Tamil Nadu",
    "Kochi (Cochin), Kerala",
    "Visakhapatnam, Andhra Pradesh",
    "Ghaziabad, Uttar Pradesh",
    "Thiruvananthapuram, Kerala",
    "Varanasi, Uttar Pradesh",
    "Rajkot, Gujarat",
    "Meerut, Uttar Pradesh",
    "Faridabad, Haryana",
    "Amritsar, Punjab",
    "Jodhpur, Rajasthan",
    "Madurai, Tamil Nadu",
    "Raipur, Chhattisgarh",
    "Aurangabad, Maharashtra",
    "Gwalior, Madhya Pradesh",
    "Ranchi, Jharkhand",
    "Guwahati, Assam",
    "Bhubaneswar, Odisha",
    "Mysore, Karnataka",
    "Jabalpur, Madhya Pradesh",
    "Goa, Maharashtra",
    "Muzaffarpur, Bihar"
];

export default function ProfileUpdateForm() {
    const {id}=useParams()
    const [loading, setLoading] = useState(true);
    const [freelancerData, setFreelancerData] = useState({
        name: "",
        email: "",
        profilePhoto: null,
        city: "",
        address: "",
        aboutYourself: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [localUser, setLocalUser] = useState(null);

    // Fetch freelancer data
    const getFreelancerData = async () => {
            const response = await fetch(`/api/freelancer/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setFreelancerData(data);
            setLoading(false)
    };

    useEffect(() => {
        getFreelancerData();
    }, []);
    

    useEffect(() => {
        setLoading(false);
    }, [freelancerData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFreelancerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!freelancerData.name || !freelancerData.email || !freelancerData.city || !freelancerData.address || !freelancerData.startingPrice || !freelancerData.halfDayPrice || !freelancerData.extraHourPrice || !freelancerData.aboutYourself) {
            alert("Please fill out all required fields.");
            return;
        }

        setUploading(true);

        let profilePhotoUrl = freelancerData.profilePhoto;

        // If new file is selected, upload to Cloudinary
        const id = freelancerData._id;
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "social");
            formData.append("cloud_name", "hritiksarraf");

            const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
                method: "POST",
                body: formData,
            });

            if (imgResponse.ok) {
                const imgResult = await imgResponse.json();
                profilePhotoUrl = imgResult.url;
            } else {
                setUploading(false);
                alert("Image upload failed");
                return;
            }
        }

        // Post the updated freelancer profile data
        const response = await fetch('/api/edit/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...freelancerData,
                profilePhoto: profilePhotoUrl,
                id
            }),
        });

        if (response.ok) {
            alert("Profile updated successfully");
            setSelectedFile(null); // Clear the selected file after successful upload
        } else {
            alert("Failed to update profile");
        }

        setUploading(false);
    };

    const uniqueSortedCities = [...new Set(cityArray.map(city => city.split(",")[0]))].sort();

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <div className="flex items-center justify-center min-h-screen mx-auto">
                    <CircularProgress color="inherit" size="8rem" />
                </div>
            </Box>
        );
    }

    return (
        <div className='min-h-75vh] pt-32 overflow-x-hidden'>
            <div className='flex justify-center' >
                <div className='flex text-black md:w-[50vw] w-[90vw]   justify-center gap-10 font-bold rounded-xl shadow-xl  '>
                    <Link href={`/freelancers/${id}/edit/gallery`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Gallery</Link>
                    <Link href={`/freelancers/${id}/edit/profile`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Profile</Link>
                    <Link href={`/freelancers/${id}/edit/service`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Service</Link>
                </div>
            </div>
            <div className="min-h-screen flex justify-center items-center p-10">
                <form className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-blue-100" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={freelancerData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={freelancerData.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">City</label>
                        <select
                            name="city"
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            onChange={handleInputChange}
                            value={freelancerData.city}
                            required
                        >
                            <option value="">Select City</option>
                            {uniqueSortedCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={freelancerData.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">About Yourself</label>
                        <textarea
                            name="aboutYourself"
                            value={freelancerData.aboutYourself}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Profile Photo</label>
                        <div className="flex items-center">
                            {selectedFile ? (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected"
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-lg"
                                />
                            ) : freelancerData.profilePhoto ? (
                                <img
                                    src={freelancerData.profilePhoto}
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-lg"
                                />
                            ) : (
                                <AddPhotoAlternateOutlined sx={{ fontSize: "50px", color: "black" }} />
                            )}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="ml-4"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    >
                        {uploading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}
