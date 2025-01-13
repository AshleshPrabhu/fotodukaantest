'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';

import PushPinIcon from '@mui/icons-material/PushPin';
import jwt from "jsonwebtoken";

function SideBar() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [user, setUser] = useState(null); 

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = jwt.decode(token);
            setUser(decodedUser);
            console.log(decodedUser);
        }
    }, []); // Only run on the first render

   

    

    return (
        <div className="h-screen pt-32 bg-blue-500 left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[350px] pr-20 custom-scrollbar">
            
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 items-center text-black">
                    <Link href={`/profile/${userData.id}/posts`}>
                        <img
                            src={user?.profilePhoto}
                            alt="profile photo"
                            width={50}
                            height={50}
                            className="rounded-full aspect-square"
                        />
                    </Link>
                    <p className="text-small-bold">
                        {user?.name} 
                    </p>
                </div>
                
            </div>
            <hr />
            <Menu />
            <hr />
            <div className="flex gap-4 items-center">
                <p className="text-black text-body-bold">Manage Account</p>
            </div>
            
        </div>
    );
}

export default SideBar;
