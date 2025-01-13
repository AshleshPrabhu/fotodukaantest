"use client"
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
function Navbar() {
    const [admin, setAdmin] = useState(false)
    const [order, setOrder] = useState("orders")
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("token")
            const decodedUser = jwt.decode(token);
            console.log("d",decodedUser)
            if(decodedUser?.isAdmin){
                setAdmin(decodedUser?.isAdmin)
            }
            console.log(decodedUser)
        }   
    }, [])
    const handleOrderChange=(e)=>{
        setOrder(e)
        setIsOpen(false)
        if(e=='orders'){
            router.push('/orders')
        }else{
            router.push(`/orders/${e}`)
            
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        router.push('/log-in') // Redirect to home page
        window.location.reload();   // Reload the page to refresh the state
    }
  return (
    <nav className={`bg-white shadow-xl z-50 fixed  w-[100vw] p-3  md:text-sm `}>
            <div className="gap-x-14 items-center max-w-screen-xxl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between  md:block">
                    <Link href={admin?"/home":"/"}>
                        <img
                            src="https://res.cloudinary.com/hritiksarraf/image/upload/v1728397188/logo-light_bvqacf.png"
                            width={150}
                            height={50}
                            alt="fotodukaan logo"
                        />
                    </Link>
                </div>
                <div className={` ${admin?"ml-72":""}`}>
                    {admin&&(
                        <div className="flex items-center justify-between w-full gap-40">
                            <Link href="/freelancers" className="block text-blue-600 hover:text-gray-400">
                                Freelancers
                            </Link>
                            <Link href="/users" className="block text-blue-600 hover:text-gray-400">
                                Users
                            </Link>
                            {/* <select
                                    value={order}
                                    onChange={handleOrderChange}
                                    className="text-blue-600 font-bold btn-select hover:text-gray-400"
                                >   
                                    <option value="orders">Orders</option>
                                    <option value="usercancel">Canceled by user</option>
                                    <option value="freelancercancel">Canceled by freelancer</option>
                                    <option value="notapproved">not approved by freelancer</option>
                                    <option value="freelancerapprove">approved by freelancer</option>
                                    <option value="adminapprove">approved by admin</option>
                            </select> */}
                            <div
                                className="text-blue-600 font-bold btn-select hover:text-gray-400 cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
                            >
                                {order} 
                                {isOpen && (
                                <div className="absolute bg-white border rounded-md shadow-md mt-2 z-10">
                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOrderChange("orders")}
                                    >
                                        Orders
                                    </div>
                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOrderChange("usercancel")}
                                    >
                                        Canceled by user
                                    </div>
                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOrderChange("freelancercancel")}
                                    >
                                        Canceled by freelancer
                                    </div>
                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOrderChange("notapproved")}
                                    >
                                        Not approved by freelancer
                                    </div>
                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOrderChange("freelancerapprove")}
                                    >
                                        Approved by freelancer
                                    </div>
                                    <div
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleOrderChange("adminapprove")}
                                    >
                                        Approved by admin
                                    </div>
                                </div>
                                )}
                            </div>
                                    <button onClick={handleLogout} className="flex items-center w-full justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                            Logout
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                    </button>
                            </div>
                    )}
                </div>
            </div>
    </nav>
  )
}

export default Navbar