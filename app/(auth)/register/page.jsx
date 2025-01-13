'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OTPInput from 'react-otp-input';
import { auth } from '@/app/firebase.config';
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
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
        subcategories: ['Events'],
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

export default function Page() {
    const router = useRouter()
    const [selectedCategories, setSelectedCategories] = useState({});
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
    const [otpValue, setOtpValue] = useState('')
    const [loading, setLoading] = useState(false);
    const [place, setPlace] = useState('')


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        profilePhoto: null,
        city: "",
        address: "",
        aboutYourself: "",
    });

    const [formErrors, setFormErrors] = useState({});


    //for otp start here
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    'recaptcha-container',
                    {
                        size: 'invisible',
                        callback: (response) => {
                            console.log('reCAPTCHA solved:', response);
                        },
                        'expired-callback': () => {
                            console.log('reCAPTCHA expired');
                        },
                    },

                );
                window.recaptchaVerifier.render().then((widgetId) => {
                    window.recaptchaWidgetId = widgetId;
                    setRecaptchaLoaded(true);
                });
            } catch (error) {
                console.error('Error initializing reCAPTCHA:', error);
            }
        }
    }


    // Validation rules
    const validate = () => {
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.phone) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number must be 10 digits";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (steps == 3) {

            if (!formData.profilePhoto) {
                errors.profilePhoto = "Profile photo is required";
            }
            if (place=='') {
                errors.city = "City is required";
            }
            if (!formData.address) {
                errors.address = "Address is required";
            }
            Object.entries(selectedCategories).forEach(([category, details]) => {
                if (!errors[category]) errors[category] = {};

                // Validate subcategories
                if (!details.subcategories || details.subcategories.length === 0) {
                    errors[category].subcategories = "Please select at least one subcategory";
                }

                // Validate prices
                if (!errors[category].price) errors[category].price = {};
                if (details.price.fullDayPrice === '') {
                    errors[category].price.fullDayPrice = "Full day price is required";
                }
                if (details.price.halfDayPrice === '') {
                    errors[category].price.halfDayPrice = "Half day price is required";
                }
                if (details.price.extraHourPrice === '') {
                    errors[category].price.extraHourPrice = "Extra hour price is required";
                }

                // Validate wedding prices only if 'Wedding' subcategory is selected
                if (details.subcategories && details.subcategories.includes('Wedding')) {
                    if (!errors[category].weddingPrice) errors[category].weddingPrice = {};
                    if (details.weddingPrice.fullDayPrice === '') {
                        errors[category].weddingPrice.fullDayPrice = "Wedding full day price is required";
                    }
                    if (details.weddingPrice.halfDayPrice === '') {
                        errors[category].weddingPrice.halfDayPrice = "Wedding half day price is required";
                    }
                    if (details.weddingPrice.extraHourPrice === '') {
                        errors[category].weddingPrice.extraHourPrice = "Wedding extra hour price is required";
                    }
                }

                // Validate LED details
                if (category === "LED wall" || category === "LED TV") {
                    if (!details.ledDetails || !details.ledDetails.size) {
                        if (!errors[category].ledDetails) errors[category].ledDetails = {};
                        errors[category].ledDetails.size = "LED size is required";
                    }
                }
            });

            // if (!formData.halfDayPrice) {
            //     errors.halfDayPrice = "Half-day price is required";
            // }
            // if (!formData.extraHourPrice) {
            //     errors.extraHourPrice = "Extra hour price is required";
            // }
            if (!formData.aboutYourself) {
                errors.aboutYourself = "About yourself is required";
            }
        }

        return errors;
    };

    const step1 = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            // Proceed to the next step if no errors
            setStep((prevState) => ({ ...prevState, currentStep: 2 }));
        } else {
            setFormErrors(errors);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(place==''){
            alert('please select city')
            return
        }
        const errors = validate();

        if (Object.keys(errors).length === 0) {
            if (!recaptchaLoaded) {
                toast.error('reload and try again', {
                    position: 'top-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                return;
            }

            setFormData((prevData) => ({
                ...prevData,
                city:place,
            }));

            const appVerifier = window.recaptchaVerifier;
            const phoneNumber = '+91' + formData.phone;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setStep((prevState) => ({ ...prevState, currentStep: 4 }));
                })
                .catch((error) => {
                    
                    toast.error('error sending otp try again', {
                        position: 'top-left',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                });
        } else {
            setFormErrors(errors);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!isTermsAccepted) {
            alert("You must accept the Terms and Conditions to proceed.");
            return;
        }
        try {
            // Step 1: Handle profile photo upload to Cloudinary
            let profilePhotoUrl = "";
            if (formData.profilePhoto) {
                const imgData = new FormData();
                imgData.append("file", formData.profilePhoto);
                imgData.append("upload_preset", "social");
                imgData.append("cloud_name", "hritiksarraf");

                const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
                    method: "POST",
                    body: imgData,
                });

                if (imgResponse.ok) {
                    const imgResult = await imgResponse.json();
                    profilePhotoUrl = imgResult.url; // Get the URL from Cloudinary response
                } else {
                    throw new Error("Image upload failed");
                }
            }
            // console.log("step 1 passed")
            // Step 2: Prepare the rest of the form data
            setFormData((prevData) => ({
                ...prevData,
                city:place,
            }));
            const payload = {
                ...formData,
                profilePhoto: profilePhotoUrl, // Add the photo URL here
                selectedCategories,
                isTermsAccepted: true,
            };
            // console.log("step up 2 passed")
            // Step 3: Send the payload to your register API
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            // console.log("step 3 db register")
            const response = await res.json();
            // console.log("a", res, "b", response)
            setLoading(false);
            if (response.success) {
                toast.success("Signup Successful", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: "light",
                });
                setTimeout(() => {
                    router.push("/log-in");
                }, 2000);
            } else {
                toast.error(response.error, {
                    position: "top-left",
                    autoClose: 5000,
                    theme: "light",
                });
            }
        } catch (error) {
            // console.error(error);
            toast.error("Signup Failed", {
                position: "top-left",
                autoClose: 5000,
                theme: "light",
            });
        }

        // console.log(selectedCategories, formData);
    };



    function OTPVerify(e) {
        e.preventDefault();
        setLoading(true);
        window.confirmationResult
            .confirm(otpValue)
            .then(async (res) => {
                // console.log(res);

                handleRegister(e);
            })
            .catch((err) => {
                // console.log('Invalid OTP:', err);
                setLoading(false);
                toast.error('Invalid OTP. Please try again.', {
                    position: 'top-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    }

    const handleButtonClick = (category) => {
        setSelectedCategories(prevState => {
            const categoryData = prevState[category.name] || { subcategories: [], cameraDetails: {} };
            return {
                ...prevState,
                [category.name]: { ...categoryData, subcategories: category.subcategories }
            };
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCategoryClick = (category) => {
        setSelectedCategories(prevState => {
            if (prevState[category]) {
                const { [category]: _, ...rest } = prevState;
                return rest;
            }
            return {
                ...prevState,
                [category]: {
                    subcategories: [],
                    cameraDetails: {},
                    price: { fullDayPrice: '', halfDayPrice: '', extraHourPrice: '' },
                    weddingPrice: { fullDayPrice: '', halfDayPrice: '', extraHourPrice: '' }
                }
            };
        });
    };


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
                    ...prevState[category].cameraDetails,
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
    const [steps, setStep] = useState({
        stepsItems: ["Details", "Service", "Profile"],
        currentStep: 1
    });

    const handlestep2 = () => {
        const isValid = Object.values(selectedCategories).some(
            (category) => category.subcategories && category.subcategories.length > 0
        );
        if (isValid) {
            
            setStep((prevState) => ({ ...prevState, currentStep: 3 }));
        } else {
            alert("Please select at least one category and subcategory.");
        }
    }

    useEffect(() => {
        onCaptchVerify();
    }, []);


    //for city
    const uniqueSortedCities = [...new Set(cityArray.map(city => city.split(",")[0]))].sort();

    return (
        <div>
            <ToastContainer />
            <div id='recaptcha-container'></div>
            <div className="max-w-2xl mx-auto mt-10 p-4   shadow-2xl ">
                <ul aria-label="Steps" className="items-center text-gray-600 font-medium flex">
                    {steps.stepsItems.map((item, idx) => (
                        <li
                            aria-current={steps.currentStep === idx + 1 ? "step" : false}
                            key={idx}
                            className="flex-1 last:flex-none flex gap-x-2 md:items-center"
                        >
                            <div className="flex items-center flex-col gap-x-2">
                                <div
                                    className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1
                                        ? "bg-indigo-600 border-indigo-600"
                                        : "" || steps.currentStep === idx + 1
                                            ? "border-indigo-600"
                                            : ""
                                        }`}
                                >
                                    <span
                                        className={`${steps.currentStep > idx + 1
                                            ? "hidden"
                                            : "" || steps.currentStep === idx + 1
                                                ? "text-indigo-600"
                                                : ""
                                            }`}
                                    >
                                        {idx + 1}
                                    </span>
                                    {steps.currentStep > idx + 1 && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="h-8 flex items-center md:h-auto">
                                <h3
                                    className={`text-sm ${steps.currentStep === idx + 1 ? "text-indigo-600" : ""
                                        }`}
                                >
                                    {item}
                                </h3>
                            </div>
                            <hr
                                className={`hidden mr-2 w-full md:border md:block ${idx + 1 === steps.stepsItems.length
                                    ? "hidden"
                                    : "" || steps.currentStep > idx + 1
                                        ? "md:border-indigo-600"
                                        : ""
                                    }`}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {steps.currentStep === 1 && (
                    <section>
                        {/* this is details section */}
                        <section className="bg-gradient-to-b from-white to-yellow-200 h-[100vh]">
                            <div className="flex flex-col items-center  h-[80vh] px-6 py-2 mx-auto md:h-screen lg:py-0">
                                <Link
                                    href="/"
                                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                                >
                                    <Image
                                        className="mr-2"
                                        src="/assets/logo-light.png"
                                        width={150}
                                        height={50}
                                        alt="fotodukaan logo"
                                    />
                                </Link>
                                <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                            Sign-up as a freelancer and start earning
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" onSubmit={step1}>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Hritik Sarraf"
                                                    required
                                                />
                                                {formErrors.name && <p className="text-red-600">{formErrors.name}</p>}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                >
                                                    Your email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="name@company.com"
                                                    required
                                                />
                                                {formErrors.email && <p className="text-red-600">{formErrors.email}</p>}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                                                >
                                                    Your Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="7061652485"
                                                    required
                                                />
                                                {formErrors.phone && <p className="text-red-600">{formErrors.phone}</p>}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-yellow-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required
                                                />
                                                {formErrors.password && <p className="text-red-600">{formErrors.password}</p>}
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Next
                                            </button>
                                            <p className="text-sm font-light text-gray-900 dark:text-black">
                                                Already have an account?{" "}
                                                <Link href="#" className="font-medium text-yellow-600 hover:underline dark:text-primary-500">
                                                    Login here
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                )}
                {steps.currentStep === 2 && (

                    <section className="bg-gradient-to-b md:min-h-[100vh] min-h-[100vh]  from-white to-yellow-200 ">
                        <div className="flex flex-col items-center    px-6  mx-auto ">
                            <Link href="/" className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
                                <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center   justify-center shadow-2xl bg-white  border-2 w-[90vw] md:w-[30vw]  px-6 py-8 mx-auto  lg:py-0">

                            <h1 className="text-xl font-bold mt-5 md:mt-15 leading-tight tracking-tight text-blue-500 md:text-3xl ">
                                Step-2
                            </h1>
                            <h1 className="text-xl font-bold mt-4 mb-10 leading-tight tracking-tight text-black md:text-4xl ">
                                Select Your Services
                            </h1>
                            <form action="" onSubmit={handlestep2}>
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
                                                        {(category.name !== "Crane" && category.name !== "LED wall" && category.name !== "LED TV") && (
                                                            <div className='w-full flex items-center justify-center'>
                                                                <button
                                                                    className="rounded-md bg-blue-400 w-[30%] p-4"
                                                                    onClick={() => handleButtonClick(category)}
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




                                                    {(category.name === "Photography" || category.name === "Videography" || category.name === "Candid Photography" || category.name === "Cinematography") && (
                                                        <div className="mt-2 mb-5 ">
                                                            <div className='block w-[100%] h-[100%]'>
                                                                <h2 className="text-3xl text-center my-5 font-semibold">Camera Details</h2>

                                                                <label htmlFor="brand" className="block mb-2">Camera Brand</label>
                                                                <select
                                                                    id="brand"
                                                                    value={selectedCategories[category.name]?.cameraDetails?.brand || ''}
                                                                    onChange={(e) => handleCameraDetailsChange(category.name, 'brand', e.target.value)}
                                                                    className="block w-full bg-blue-100 p-2 border rounded"
                                                                    required
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
                                                                    required
                                                                />

                                                                <label htmlFor="specs" className="block mb-2 mt-4">Camera Lense</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Camera Lense"
                                                                    value={selectedCategories[category.name]?.cameraDetails?.lanse || ''}
                                                                    onChange={(e) => handleCameraDetailsChange(category.name, 'lanse', e.target.value)}
                                                                    className="block bg-blue-100 w-full p-2 border rounded mt-2"
                                                                    required
                                                                />
                                                                <label htmlFor="Gimble" className="block mb-2 mt-4">Gimble</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Camera Lense"
                                                                    value={selectedCategories[category.name]?.cameraDetails?.gimble || ''}
                                                                    onChange={(e) => handleCameraDetailsChange(category.name, 'gimble', e.target.value)}
                                                                    className="block w-full bg-blue-100 p-2 border rounded mt-2"
                                                                    required
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
                                                                    value={selectedCategories[category.name].price.fullDayPrice}
                                                                    onChange={(e) => handlePriceChange(category.name, 'price', 'fullDayPrice', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                    required
                                                                />
                                                                {formErrors[category.name]?.price?.fullDayPrice && (
                                                                    <p className="text-red-500 text-xs mt-1">{formErrors[category.name].price.fullDayPrice}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                        {category.pricing.halfDayPrice && (
                                                            <div>
                                                                <label className="block">Half Day Price:</label>
                                                                <input
                                                                    type="number"
                                                                    required
                                                                    value={selectedCategories[category.name].price.halfDayPrice}
                                                                    onChange={(e) => handlePriceChange(category.name, 'price', 'halfDayPrice', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                />
                                                                {formErrors[category.name]?.price?.halfDayPrice && (
                                                                    <p className="text-red-500 text-xs mt-1">{formErrors[category.name].price.halfDayPrice}</p>
                                                                )}
                                                            </div>

                                                        )}
                                                        {category.pricing.extraHourPrice && (
                                                            <div>
                                                                <label className="block">Extra Hour Price:</label>
                                                                <input
                                                                    type="number"
                                                                    required
                                                                    value={selectedCategories[category.name].price.extraHourPrice}
                                                                    onChange={(e) => handlePriceChange(category.name, 'price', 'extraHourPrice', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                />
                                                                {formErrors[category.name]?.price?.extraHourPrice && (
                                                                    <p className="text-red-500 text-xs mt-1">{formErrors[category.name].price.extraHourPrice}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {category?.weddingPrice && (
                                                        <h3 className="text-lg font-medium mt-4 mb-1">Wedding Pricing:</h3>
                                                    )}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {category?.weddingPrice?.fullDayPrice && (
                                                            <div>
                                                                <label className="block">Wedding Full Day Price:</label>
                                                                <input
                                                                    type="number"
                                                                    required
                                                                    value={selectedCategories[category.name].weddingPrice.fullDayPrice}
                                                                    onChange={(e) => handlePriceChange(category.name, 'weddingPrice', 'fullDayPrice', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                />
                                                                {formErrors[category.name]?.weddingPrice?.fullDayPrice && (
                                                                    <p className="text-red-500 text-xs mt-1">{formErrors[category.name].weddingPrice.fullDayPrice}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                        {category?.weddingPrice?.halfDayPrice && (
                                                            <div>
                                                                <label className="block">Wedding Half Day Price:</label>
                                                                <input
                                                                    type="number"
                                                                    required
                                                                    value={selectedCategories[category.name].weddingPrice.halfDayPrice}
                                                                    onChange={(e) => handlePriceChange(category.name, 'weddingPrice', 'halfDayPrice', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                />
                                                                {formErrors[category.name]?.weddingPrice?.halfDayPrice && (
                                                                    <p className="text-red-500 text-xs mt-1">{formErrors[category.name].weddingPrice.halfDayPrice}</p>
                                                                )}
                                                            </div>
                                                        )}
                                                        {category?.weddingPrice?.extraHourPrice && (
                                                            <div>
                                                                <label className="block">Wedding Extra Hour Price:</label>
                                                                <input
                                                                    type="number"
                                                                    required
                                                                    value={selectedCategories[category.name].weddingPrice.extraHourPrice}
                                                                    onChange={(e) => handlePriceChange(category.name, 'weddingPrice', 'extraHourPrice', e.target.value)}
                                                                    className="w-full p-2 border rounded"
                                                                />
                                                                {formErrors[category.name]?.weddingPrice?.extraHourPrice && (
                                                                    <p className="text-red-500 text-xs mt-1">{formErrors[category.name].weddingPrice.extraHourPrice}</p>
                                                                )}
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
                                                                        required
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
                                                                        required
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
                                                                    required
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
                                <div className='flex justify-between w-[100%] md:mb-5'>
                                    <button onClick={() => setStep(prevState => ({ ...prevState, currentStep: 1 }))} className="mt-4  md:w-[15%]  text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">back</button>
                                    <button type='submit' className="mt-4  md:w-[15%]  text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>

                                </div>
                            </form>
                        </div>
                    </section>
                )}

                {steps.currentStep === 3 && (
                    <section>
                        {/* this is profile section */}
                        <section className="bg-gradient-to-b min-h-[100vh] from-white py-5 to-yellow-200">
                            <div className="flex flex-col items-center my-auto justify-center px-6 py-8 mx-auto lg:py-0">
                                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                                </Link>
                                <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                            Set Up Your Profile
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                            {/* <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}> */}
                                            {/* Profile Photo */}
                                            <div>
                                                <label htmlFor="profile-photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                                    Profile Photo
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="profilePhoto"
                                                    id="profile-photo"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    onChange={handleInputChange}
                                                    required

                                                />
                                                {formErrors.profilePhoto && <p className="text-red-500 text-sm">{formErrors.profilePhoto}</p>}
                                            </div>

                                            {/* City */}
                                            <div>
                                                {/* <label htmlFor="city" className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                    City
                                                </label>
                                                <select
                                                    name="city"
                                                    id="city"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    onChange={handleInputChange}
                                                    value={formData.city}
                                                    required
                                                >
                                                    <option value="">Select City</option>
                                                    {uniqueSortedCities.map((city) => (
                                                        <option key={city} value={city}>
                                                            {city}
                                                        </option>
                                                    ))}
                                                </select>
                                                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>} */}
                                                <p className="block text-sm font-semibold mb-2 text-gray-700">City</p>
                  <div className="w-full border rounded-xl py-1">
          <Location onSelectLocation={setPlace} />
          </div>
                                                
                                            </div>

                                            {/* Full Address */}
                                            <div>
                                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                    Full Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    placeholder="Your full address"
                                                    onChange={handleInputChange}
                                                    value={formData.address}
                                                    required
                                                    
                                                />
                                                {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                                            </div>

                                            {/* About Yourself */}
                                            <div>
                                                <label htmlFor="about-yourself" className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                    About Yourself
                                                </label>
                                                <textarea
                                                    name="aboutYourself"
                                                    id="about-yourself"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    placeholder="Write a few sentences about yourself"
                                                    rows="4"
                                                    onChange={handleInputChange}
                                                    value={formData.aboutYourself}
                                                    required
                                                ></textarea>
                                                {formErrors.aboutYourself && <p className="text-red-500 text-sm">{formErrors.aboutYourself}</p>}
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={isTermsAccepted}
                                                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                                />
                                                <label htmlFor="terms">
                                                    I accept the <a href="https://drive.google.com/file/d/1hyvhQeo9hE7DqvGILuvkREfYSjG1IHcd/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                                                </label>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setStep((prevState) => ({ ...prevState, currentStep: 2 }))}
                                                    type="button"
                                                    className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                )}

                {steps.currentStep === 4 && <section className='bg-gradient-to-b from-white to-blue-200 h-[100vh] w-[100vw] flex flex-col gap-8 justify-center items-center'>
                    <div className='flex flex-col gap-8 justify-center items-center '>
                        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Image
                                className="mr-2"
                                src="/assets/logo-light.png"
                                width={150}
                                height={50}
                                alt="fotodukaan logo"
                            />
                        </Link>

                        <div><h1 className='text-black text-3xl md:text-5xl'>Please Verify Your OTP</h1></div>
                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                            <BsFillShieldLockFill className='' size={30} />
                        </div>
                        <label
                            htmlFor="otp"
                            className="font-bold text-xl  text-blue-600 text-center"
                        >
                            Enter your OTP
                        </label>
                        <div className='text-5xl '>
                            <OTPInput
                                value={otpValue}
                                onChange={setOtpValue}
                                numInputs={6}
                                renderSeparator={<span className='m-1'></span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        <button
                            onClick={OTPVerify}
                            className="bg-emerald-600 px-32 flex gap-1 items-center justify-center py-2.5 text-white rounded"
                        >
                            {loading && (
                                <CgSpinner size={20} className="mt-1 animate-spin" />
                            )}
                            <span>Verify OTP</span>
                        </button>
                    </div>
                </section>}




            </div>
            <ToastContainer />
        </div>
    );
}
