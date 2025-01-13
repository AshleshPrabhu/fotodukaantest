"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import jwt from "jsonwebtoken";

import {
  Home,
  AddPhotoAlternateOutlined,
  GroupOutlined,
  FavoriteBorder,
} from "@mui/icons-material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventIcon from '@mui/icons-material/Event';
import { useEffect, useState } from "react";


const Menu = ({user}) => {
  const pathname = usePathname();
 
  const [userLogin, setUserLogin] = useState(false)
  const sidebarLinks = [
    {
      icon: <AccountBoxIcon sx={{ color: "white", fontSize: "26px" }} />,
      route: `/freelancer/${user.userid}`,
      label: "My Profile",
    },
    {
      icon: <AddPhotoAlternateOutlined sx={{ color: "white", fontSize: "26px" }} />,
      route: "/editProfile/gallery",
      label: "Edit Profile" ,
    },
    {
      icon: <DashboardIcon sx={{ color: "white", fontSize: "26px" }} />,
      route: "/dashboard",
      label: "DashBoard" ,
    },
    {
      icon: <BookmarkBorderIcon sx={{ color: "white", fontSize: "26px" }} />,
      route: "/yourOrder",
      label: "YourOrder" ,
    },
    {
      icon: <EventIcon sx={{ color: "white", fontSize: "26px"}}/>,
      route: "/calendar",
      label: "Calendar",
    }
    
  ];
  
  


  

  return (
    <div className="flex flex-col gap-2">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            href={link.route}
            className={`flex gap-4 justify-start rounded-lg py-2 px-4 ${
              isActive && "bg-yellow-600"
            }`}
          >
            {link.icon} <p className="text-white">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
