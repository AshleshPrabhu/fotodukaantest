'use client';

import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddPhotoAlternateOutlined from '@mui/icons-material/AddPhotoAlternateOutlined';
import jwt from "jsonwebtoken";
import EditBar from '@/components/editBar/EditBar';
import Location from '@/components/location/Location';


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
    const [place, setPlace] = useState('');
    const [readyToSubmit, setReadyToSubmit] = useState(false); // New state to track readiness

    const getFreelancerData = async () => {
        if (localUser) {
            const response = await fetch(`/api/freelancer/${localUser.userid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setFreelancerData(data);
            setPlace(data.city);
        }
    };

    useEffect(() => {
        getFreelancerData();
    }, [localUser]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt.decode(token);
            setLocalUser(decodedUser);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [freelancerData]);

    useEffect(() => {
        // Update freelancerData.city when place changes
        setFreelancerData((prevState) => ({
            ...prevState,
            city: place,
        }));
    }, [place]);

    useEffect(() => {
        // Enable submission only if city is updated
        if (freelancerData.city === place) {
            setReadyToSubmit(true);
        }
    }, [freelancerData.city, place]);

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

        if (!readyToSubmit) {
            alert("City is not updated yet. Please wait.");
            return;
        }

        if (!freelancerData.name || !freelancerData.email || !freelancerData.city || !freelancerData.address || !freelancerData.aboutYourself) {
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
            <div>
                <EditBar />
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
                        <p className="block text-sm font-semibold mb-2 text-gray-700">City</p>
                        <div className="w-full border rounded-xl py-1">
                            <Location onSelectLocation={setPlace} />
                        </div>
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
                        disabled={uploading || !readyToSubmit}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    >
                        {uploading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}