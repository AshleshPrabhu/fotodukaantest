"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { Box, Button, Input, Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
function page() {
    const [user, setUser] = useState([])
    const [search, setSearch] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [open, setOpen] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    const router = useRouter()
    const getUsers=async()=>{
        const response = await fetch("/api/admin/user")
        const data = await response.json()
        if(!data.success){
            toast.error('failed to fetch users')
        }else{
            setUser(data.users)
            setSearchResult(data.users)
        }
    }
    const handleDelete=async(id)=>{
        try {
            const response = await fetch(`/api/admin/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            if(!data.success){
                setOpen(false)
                toast.error('failed to delete user')
            }else{
                toast.success('user deleted')
                setOpen(false)
                getUsers()
            }
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])
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
        if (/\d/.test(search)) {
            const searchPosts = user && user.filter((u) => 
                u.phone.toString().includes(search.trim())
            );
            setSearchResult(searchPosts);
        }else{
            const searchPosts =user && user.filter((u) =>u.name.toLowerCase().includes(search.trim().toLowerCase()));
            setSearchResult(searchPosts)
        }
    },[setSearch,search])
    
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center '>
            <div className='w-full flex items-center justify-center mb-5'>
                <Input
                className='w-[50%] rounded-lg placeholder:text-center text-xl transition-colors duration-300 pl-5 border border-gray-500 text-black placeholder-black '
                placeholder='search users by name / phone number'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
            <div className='h-full w-[90%] grid grid-cols-3 gap-3   '>
                {searchResult?.map((user)=>(
                <div className='flex flex-col bg-gray-300 rounded-xl' key={user?._id}>
                    <div className='font-bold text-2xl w-full text-center'>NAME : {user?.name}</div>
                    <div className='rounded-full w-full flex items-center justify-center'>
                    <img src={user?.profilePhoto} className='size-24 rounded-full' alt="freelancer image" />
                    </div>
                    <div className='ml-2'>User Id :  {user?._id}</div>
                    <div className='ml-2'>EMAIL :  {user?.email}</div>
                    <div className='ml-2'>PHONE NO: {user?.phone}</div>
                    <div className='ml-2'>ADDRESS: {user?.address}</div>
                    <div className='ml-2'>CITY: {user?.city}</div>
                    <div className='ml-2'>PINCODE: {user?.pinCode}</div>
                    <div className='w-full flex items-center justify-center mt-2'>
                        <Button onClick={()=>{setOpen(true);setSelectedUser(user._id)}} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} >Delete</Button>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                            >
                                <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    bgcolor: 'white',
                                    p: 4,
                                    borderRadius: 2,
                                    width: 400,
                                }}
                                >
                                    <div>
                                        <Button onClick={() => setOpen(false)} className="text-black">
                                        Close
                                        </Button>
                                    </div>
                                    <div className="flex flex-col text-black">
                                            <div className="text-center text-xl font-bold">
                                                Are you sure you want to delete the user?
                                            </div>
                                            <div className="flex items-center justify-center mt-5">
                                            <Button
                                                className="rounded-xl bg-blue-400 text-white"
                                                onClick={()=>handleDelete()}
                                            >
                                                Delete
                                            </Button>
                                            </div>
                                    </div>
                                </Box>
                        </Modal>
                    </div>
                    <div className='w-full flex items-center justify-center mt-2'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>router.push(`/users/${user?._id}/orders`)}>Orders Placed</button>
                    </div>
                    <div className='w-full flex items-center justify-center mt-2'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>router.push(`/users/${user?._id}/edit`)}>Edit</button>
                    </div>
                </div>
                ))}
            </div>
        </div> 
    )
}

export default page