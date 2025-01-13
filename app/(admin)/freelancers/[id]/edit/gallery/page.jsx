'use client'
import React, { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const {id} = useParams()
    const [loading, setLoading] = useState(true);
    const [freelancerData, setFreelancerData] = useState({ freelancerDetails: {}, image: [] });
    const [selectedFile, setSelectedFile] = useState(null); // To handle file upload
    const [uploading, setUploading] = useState(false); // To handle upload state
    const [deleteConfirm, setDeleteConfirm] = useState(false); // For delete confirmation popup
    const [imageToDelete, setImageToDelete] = useState(null); // Store image to be deleted
    
    const [newVideoUrl, setNewVideoUrl] = useState(""); // To handle new video URL input
    const [deleteConfirmVideo, setDeleteConfirmVideo] = useState(false); // For delete confirmation popup
    const [videoToDelete, setVideoToDelete] = useState(null); // Store video to be deleted


    const getUser = async () => {
        
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
        getUser();
    }, []);

    

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 2 * 1024 * 1024); // 2MB size limit

        if (files.length > 10) {
            alert("Please select no more than 10 images.");
        } else if (files.some(file => file.size > 2 * 1024 * 1024)) {
            alert("Each image must be less than 2MB.");
        } else {
            setSelectedFile(validFiles);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || selectedFile.length === 0) return;
    
        setUploading(true);
        let uploadedImageUrls = [];
    
        // Step 1: Upload each file to Cloudinary
        for (const file of selectedFile) {
            const imgData = new FormData();
            imgData.append("file", file);
            imgData.append("upload_preset", "social");
            imgData.append("cloud_name", "hritiksarraf");
    
            try {
                const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
                    method: "POST",
                    body: imgData,
                });
    
                if (imgResponse.ok) {
                    const imgResult = await imgResponse.json();
                    uploadedImageUrls.push(imgResult.url); // Add each uploaded URL to the array
                } else {
                    throw new Error("Image upload failed");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    
        // Step 2: Add new image URLs to freelancer's image array and update backend
        try {
            const response = await fetch('/api/freelancer/updateImage', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: id,
                    newImages: uploadedImageUrls // Send the array of image URLs
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setFreelancerData((prev) => ({
                    ...prev,
                    image: result.updatedImages // Update the images array in state
                }));
                setSelectedFile(null);
            } else {
                console.error("Failed to add images to the array");
            }
        } catch (error) {
            console.error("Error updating image array: ", error);
        } finally {
            setUploading(false);
        }
    };
    
    const handleDelete = async () => {
        if (!imageToDelete) return;

        try {
            const response = await fetch('/api/freelancer/deleteImage', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: id,
                    imageUrl: imageToDelete // Send the image URL to be deleted
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setFreelancerData((prev) => ({
                    ...prev,
                    image: result.updatedImages // Update the images array in state
                }));
                setDeleteConfirm(false); // Close the delete confirmation modal
                setImageToDelete(null); // Clear the selected image
            } else {
                console.error("Failed to delete image");
            }
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    };


    const handleAddVideo = async () => {
        if (!newVideoUrl) return;

        try {
            const response = await fetch('/api/freelancer/addVideo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: id,
                    newVideo: newVideoUrl // Send the new video URL
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setFreelancerData((prev) => ({
                    ...prev,
                    video: result.updatedVideos // Update the videos array in state
                }));
                setNewVideoUrl(""); // Clear input after successful upload
            } else {
                console.error("Failed to add video");
            }
        } catch (error) {
            console.error("Error adding video: ", error);
        }
    };

    const handleDeleteVideo = async () => {
        if (!videoToDelete) return;

        try {
            const response = await fetch('/api/freelancer/deleteVideo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: id,
                    videoUrl: videoToDelete // Send the video URL to be deleted
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setFreelancerData((prev) => ({
                    ...prev,
                    video: result.updatedVideos // Update the videos array in state
                }));
                setDeleteConfirmVideo(false); // Close the delete confirmation modal
                setVideoToDelete(null); // Clear the selected video
            } else {
                console.error("Failed to delete video");
            }
        } catch (error) {
            console.error("Error deleting video: ", error);
        }
    };

    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
      }


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
        <div className='min-h-[80vh] pt-32'>
            <div className='flex justify-center' >
                <div className='flex text-black md:w-[50vw] w-[90vw]   justify-center gap-10 font-bold rounded-xl shadow-xl  '>
                    <Link href={`/freelancers/${id}/edit/gallery`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Gallery</Link>
                    <Link href={`/freelancers/${id}/edit/profile`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Profile</Link>
                    <Link href={`/freelancers/${id}/edit/service`} className='bg-yellow-500 mb-3 underline-offset-1 text-white px-4 rounded-xl py-2' >Service</Link>
                </div>
            </div>

            {/* File Upload Section */}
            <h1 className='text-center font-bold my-10 text-4xl'>Chose a file to <span className='text-blue-500'>upload</span>  here</h1>
            <div className='flex items-center justify-center md:w-[30vw] w-[90vw] mx-auto py-5 shadow-xl gap-10 '>
                <div className=''>

            <label
            htmlFor="photo"
            className="flex md:flex-row flex-col gap-4 items-center text-light-1 cursor-pointer"
          >
            {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile[0])}
                  alt="post"
                  width={250}
                  height={200}
                  className="object-cover rounded-lg"
                />
              )
             : (
              <AddPhotoAlternateOutlined sx={{ fontSize: "100px", color: "black" }} />
            )}
            <p className=''>Upload a photo</p>
          </label>
                <input type="file" id="photo" style={{ display: "none" }}  onChange={handleFileChange}
                        multiple />
                </div>
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading} // Disable if no file selected or uploading
                    className="bg-blue-500 text-white px-4 rounded-xl py-2 mt-4"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>

            {/* Display Images */}
            <div className='mt-8'>
                <h3 className='text-center font-bold my-10 text-4xl text-yellow-600'>Uploaded Images</h3>
                <div className='flex flex-wrap   items-center justify-center gap-5  mt-4'>
                    {freelancerData.image && freelancerData.image.map((imgUrl, index) => (
                        <div key={index} className="relative">
                            
                            <img src={imgUrl}  alt={`Freelancer Image ${index + 1}`} className='md:w-[20vw] w-[90vw] rounded-2xl  aspect-square object-cover' />
                            <button
                                className='absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full'
                                onClick={() => {
                                    setImageToDelete(imgUrl);
                                    setDeleteConfirm(true); // Open confirmation modal
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                open={deleteConfirm}
                onClose={() => setDeleteConfirm(false)}
                aria-labelledby="delete-confirm-title"
                aria-describedby="delete-confirm-description"
            >
                <Box className='bg-white p-6 mx-auto mt-20 max-w-md'>
                    <h2 id="delete-confirm-title" className='text-lg font-bold'>Confirm Deletion</h2>
                    <p id="delete-confirm-description">Are you sure you want to delete this image?</p>
                    <div className='flex justify-end space-x-4 mt-4'>
                        <Button variant="contained" color="primary" onClick={() => setDeleteConfirm(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDelete}>
                            Confirm
                        </Button>
                    </div>
                </Box>
            </Modal>


            {/* Add YouTube Video Section */}
            <div>
            <h1 className='text-center font-bold py-8 mt-5 text-4xl border-t-2 '>Add youtube <span className='text-blue-500'>link</span>  here</h1>
            <div className='flex justify-center mx-auto w-[85vw] items-center gap-5 '>
                <input
                    type="text"
                    id="videoUpload"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="Paste YouTube video link here"
                    className="border p-2 md:w-[30vw] w-[70vw] rounded-2xl bg-blue-100"
                />
                <button
                    onClick={handleAddVideo}
                    disabled={!newVideoUrl} // Disable if no video URL is entered
                    className="bg-blue-500 text-white px-4 py-2  rounded-2xl"
                >
                    Upload
                </button>
                </div>
            </div>

            {/* Display YouTube Videos */}
            <div className='mt-8'>
            <h1 className='text-center font-bold py-8  text-4xl  '>Uploaded <span className='text-blue-500'>Youtube</span>  Videos</h1>
                <div className=' gap-4 mt-4 flex flex-wrap justify-center items-center my-10'>
                    {freelancerData.video && freelancerData.video.map((videoUrl, index) => (
                        <div key={index} className="relative" >
                            {/* Embed YouTube Video */}
                            <iframe
                               
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`}
                                frameBorder="0"
                                allowFullScreen
                                className=' md:w-[25vw] md:h-[30vh] w-[90vw] h-[35vh] rounded-2xl'
                            ></iframe>
                            <button
                                className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full'
                                onClick={() => {
                                    setVideoToDelete(videoUrl);
                                    setDeleteConfirmVideo(true); // Open confirmation modal
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                open={deleteConfirmVideo}
                onClose={() => setDeleteConfirmVideo(false)}
                aria-labelledby="delete-confirm-title"
                aria-describedby="delete-confirm-description"
            >
                <Box className='bg-white p-6 mx-auto mt-20 max-w-md'>
                    <h2 id="delete-confirm-title" className='text-lg font-bold'>Confirm Deletion</h2>
                    <p id="delete-confirm-description">Are you sure you want to delete this Video?</p>
                    <div className='flex justify-end space-x-4 mt-4'>
                        <Button variant="contained" color="primary" onClick={() => setDeleteConfirmVideo(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDeleteVideo}>
                            Confirm
                        </Button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
}
