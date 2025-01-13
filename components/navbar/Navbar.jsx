'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Menu from "../sideBar/Menu";



export default function Navbar() {

    const [state, setState] = useState(false)
    const [user, setUser] = useState({})
    const [userLogin, setUserLogin] = useState(false)
    const router = useRouter();
    const [profileState, setProfileState] = useState(false)
    const [category, setCategory] = useState("");

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/about-us" },
        { title: "Contact", path: "/contact" }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn") && !target.closest(".menu") && !target.closest(".btn-select") && !target.closest(".profile-btn")) setState(false);
        };
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt.decode(token);
            setUser(decodedUser);
            setUserLogin(true)
            console.log(decodedUser)
        }

    }, [])

    function handleLogout() {
        localStorage.removeItem('token');
        router.push('/') // Redirect to home page
        window.location.reload();   // Reload the page to refresh the state
    }

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory) {
            setState(false)
            router.push(`/freelancer/type/${selectedCategory}`); // Adjust the path to match your dynamic route
        }
    };


    return (
        <nav className={`bg-white shadow-xl z-50 fixed  w-[100vw] p-3  md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xxl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between  md:block">
                    <Link href="/">
                        <img
                            src="https://res.cloudinary.com/hritiksarraf/image/upload/v1728397188/logo-light_bvqacf.png"
                            width={150}
                            height={50}
                            alt="fotodukaan logo"
                        />
                    </Link>
                    <div className="md:hidden flex gap-4">
                        <div className="flex ">
                            {userLogin && <div>
                                <img onClick={() => { setProfileState(!profileState) }} src={user.profilePhoto} alt="" className=" profile-btn w-12 cursor-pointer h-12 rounded-full border-2" />

                            </div>}
                            {profileState && !user.freelancer && !state && <div className="absolute translate-y-16  -translate-x-48 bg-[#0E2041] w-[80vw] md:w-60 flex-col flex items-center gap-4 justify-center rounded-2xl  p-3 ">
                                <div>
                                    <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full border-2" />

                                </div>
                                <h1 className="text-white font-bold">{user.name}</h1>
                                <div className="flex flex-col gap-5">
                                    <Link href="/bookings" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#F5AA2B] hover:bg-yellow-400 active:bg-[#0E2041] rounded-full md:inline-flex">
                                        Bookings
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center w-full justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                </div>
                            </div>}
                            {profileState && user.freelancer && !state && <div className="absolute translate-y-16  -translate-x-48 bg-[#0E2041] w-[80vw] md:w-60 flex-col flex items-center gap-4 justify-center rounded-2xl  p-3 ">
                                <div>
                                    <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full border-2" />

                                </div>
                                <h1 className="text-white font-bold">{user.name}</h1>
                                <div className="flex flex-col gap-5">
                                    <Menu user={user} />
                                    <button onClick={handleLogout} className="flex items-center w-full justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                </div>
                            </div>}
                        </div>


                        <button className="menu-btn text-white hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 blue1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-[#0E2041] font-bold       hover:text-gray-400">
                                        <Link href={item.path} className="block">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        <li>
                            <select
                                value={category}
                                onChange={handleCategoryChange}
                                className="text-[#0E2041] font-bold btn-select      hover:text-gray-400"
                            >
                                <option value="">Select Category</option>
                                <option value="Traditional Photography">Traditional Photographer</option>
                                <option value="Candid Photography">Candid Photographer</option>
                                <option value="Traditional Videography">Traditional Videographer</option>
                                <option value="Cinematography">Cinematographer</option>
                                <option value="Drone">Drone</option>
                                <option value="Crane">Crane</option>
                                <option value="LED wall">LED wall</option>
                                <option value="LED TV">LED TV</option>
                            </select>
                        </li>
                        <li>
                        <select
    value="policy"
    className="text-[#0E2041] font-bold btn-select hover:text-gray-400"
    onChange={(e) => {
        const selectedValue = e.target.value;
        let url = "";

        switch (selectedValue) {
            case "Privacy Policy":
                url = "https://drive.google.com/file/d/1SjvEX2Am-j7jXsSw4ZzNUB5JMijFzRuq/view?usp=drive_link";
                break;
            case "Cancellation and Refunds":
                url = "https://drive.google.com/file/d/1cxfJvPp4jmWqIQ_C5LjddX5eAH7p2HRa/view?usp=drive_link";
                break;
            case "Terms and Conditions":
                url = "https://drive.google.com/file/d/1hyvhQeo9hE7DqvGILuvkREfYSjG1IHcd/view?usp=drive_link";
                break;
            case "Shipping and Delivery":
                url = "https://drive.google.com/file/d/17FKCsPc3i_OdG3BH7HKAGeW9c7HFznoc/view?usp=drive_link";
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }}
>
    <option value="">Company policy</option>
    <option value="Privacy Policy">Privacy Policy</option>
    <option value="Cancellation and Refunds">Cancellation and Refunds</option>
    <option value="Terms and Conditions">Terms and Conditions</option>
    <option value="Shipping and Delivery">Shipping and Delivery</option>
</select>
                        </li>
                    </ul>
                    {userLogin ? (<div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <div className="flex ">
                            <div>
                                <img onClick={() => { setProfileState(!profileState) }} src={user.profilePhoto} alt="" className=" profile-btn w-12 cursor-pointer h-12 rounded-full border-2" />

                            </div>
                            <button onClick={() => { setProfileState(!profileState) }} className="profile-btn flex items-center justify-center gap-x-1 py-2 px-4 font-medium text-[#0E2041] hover:text-yellow-700 active:bg-[#0E2041] rounded-full md:inline-flex">
                                {user.name}
                            </button>
                        </div>

                        {profileState && !user.freelancer && <div className="absolute md:translate-y-32 bg-blue-600 w-[80vw] md:w-60 flex-col flex items-center gap-4 justify-center rounded-2xl  p-3 ">
                            <div>
                                <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full border-2" />

                            </div>
                            <h1 className="text-white font-bold">{user.name}</h1>
                            <div className="flex flex-col gap-5">
                                <Link href="/bookings" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#F5AA2B] hover:bg-yellow-400 active:bg-blue-600 rounded-full md:inline-flex">
                                    Bookings
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <button onClick={handleLogout} className="flex items-center w-full justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                    Logout
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </button>

                            </div>
                        </div>}
                        <div>
                            {profileState && user.freelancer && <div className=" absolute translate-y-10 -translate-x-[11vw] h-[95vh] bg-blue-600 w-[80vw] md:w-60 flex-col flex items-center gap-4  rounded-2xl  p-3 ">
                                <div>
                                    <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full border-2" />

                                </div>

                                <h1 className="text-white font-bold">{user.name}</h1>
                                <div className="flex flex-col gap-5">
                                    <Menu user={user} />

                                    <button onClick={handleLogout} className="flex items-center w-full justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                </div>
                            </div>}
                        </div>
                    </div>) :
                        (<div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                            <Link href="/log-in" className="block text-[#0E2041] hover:text-gray-400">
                                Log in
                            </Link>
                            <Link href="sign-up" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                Sign up
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link href="/register" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#F5AA2B] hover:bg-yellow-400 active:bg-[#0E2041] rounded-full md:inline-flex">
                                Register as Freelancer
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </nav>

    )
}