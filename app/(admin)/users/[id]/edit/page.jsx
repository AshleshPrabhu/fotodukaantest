"use client"
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
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
function page() {
    const [uploading, setUploading] = useState(false);
    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
        pinCode:"",
        address:"",
        city:"",
        profilePhoto:null
    })
    const [selectedFile, setSelectedFile] = useState(null);
    const {id}=useParams()
    const findUser = async()=>{
        const response = await fetch(`/api/admin/user/getUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        const data = await response.json()
        console.log("ff",data)
        if(!data.success){
            toast.error('failed to find user')
        }else{
            setUser({
                name:data.user.name,
                email:data.user.email,
                phone:data.user.phone,
                pinCode:data.user.pinCode,
                address:data.user.address,
                city:data.user.city,
                profilePhoto:data.user.profilePhoto
            })
        }
    }
    useEffect(()=>{
        findUser()
    },[])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.city || !user.address || !user.pinCode || !user.phone ) {
            alert("Please fill out all required fields.");
            return;
        }

        setUploading(true);

        let profilePhotoUrl = user.profilePhoto;

        // If new file is selected, upload to Cloudinary
        
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
        const response = await fetch(`/api/admin/user/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...user,
                profilePhoto: profilePhotoUrl
            }),
        });
        const data = await response.json()
        if (data.success) {
            alert("Profile updated successfully");
            setSelectedFile(null); // Clear the selected file after successful upload
        } else {
            alert("Failed to update profile");
        }

        setUploading(false);
    };
    const uniqueSortedCities = [...new Set(cityArray.map(city => city.split(",")[0]))].sort();

return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center '>
        <div className="min-h-screen flex justify-center items-center p-10">
                <form className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-blue-100" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
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
                            value={user.email}
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
                            value={user.city}
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
                        <textarea
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Phone</label>
                        <input
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">PinCode</label>
                        <input
                            name="pinCode"
                            value={user.pinCode}
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
                            ) : user.profilePhoto ? (
                                <img
                                    src={user.profilePhoto}
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
  )
}

export default page