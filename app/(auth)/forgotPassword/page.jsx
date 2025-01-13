'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '@/app/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';


export default function Pages() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [loading, setLoading] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const router = useRouter();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {
              
            },
            'expired-callback': () => {
              
            },
          },
          
        );
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
          setRecaptchaLoaded(true);
        });
      } catch (error) {
        
      }
    }
  }

  function onSignup(e) {
    e.preventDefault();
    let formErrors = {};
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      formErrors.phone = 'Phone number must be 10 digits.';
    }
    if (password.length < 8 || !/\d/.test(password)) {
      formErrors.password = 'Password must be at least 8 characters long and contain at least one number.';
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setVerifyLoading(true)
      setErrors({});
      if (!recaptchaLoaded) {
        console.error('Recaptcha verifier is not loaded');
        return;
      }

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = '+91' + phone;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtp(true);
          setVerifyLoading(false)
        })
        .catch((error) => {
          console.error('Error sending OTP:', error);
        });
    }
  }

  function OTPVerify(e) {
    e.preventDefault();
    setLoading(true);
    window.confirmationResult
      .confirm(otpValue)
      .then(async (res) => {
        // console.log(res);
        
        handleSignUp();
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

  const handleSignUp = async () => {
    
    const data = { phone, password };
    // console.log(name, email, phone, password )
    try {
      let res = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      setLoading(false);
      
      

      let response = await res.json();
      
      if(response.success){
        
        toast.success('Password Reset Successful', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        
      }
      else{
        toast.error( response.error, {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      setTimeout(() => {
        router.push('/log-in');
      }, 2000);
      
      
    } catch (error) {
      
      toast.error('Password Reset Failed', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    onCaptchVerify();
  }, []);


  return (
    <div>
      <ToastContainer/>
      {otp && <section className='bg-gradient-to-b from-white to-blue-200 h-[100vh] w-[100vw] flex flex-col gap-8 justify-center items-center'>
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
      
      {!otp && <section className="bg-gradient-to-b from-white to-blue-200 h-[100vh]">
      <div id='recaptcha-container'></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image
              className="mr-2"
              src="/assets/logo-light.png"
              width={150}
              height={50}
              alt="fotodukaan logo"
            />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Reset Your Password
              </h1>
              <form className="space-y-4 md:space-y-6" >
                
                
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Your Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="7061652485"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button
                type="submit"
                  onClick={onSignup}
                  className="bg-blue-600 w-full  flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {verifyLoading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Update Password</span>
                </button>
                
                <p className="text-sm font-light text-gray-500 dark:text-black">
                  Already have an account?{' '}
                  <Link href="/log-in" className="font-medium text-primary-600 hover:underline dark:text-blue-500">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>}
      <ToastContainer/>
    </div>
  );
}
