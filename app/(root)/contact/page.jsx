import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

export default function page() {
  return (
    <div className='pt-20'>
        <div className='w-[100vw] h-[80vh] bg-cover bg-center pt-20 bg-[url("/assets/contact.jpg")]'>
          <div className="md:w-[60vw]">
            <h1 className="px-3 md:px-10 py-5 text-5xl md:text-8xl font-bold text-left text-yellow-500">Need Help!</h1>
            <h1 className="px-3 md:px-10 pt-5 text-5xl md:text-8xl font-bold text-left text-white">Contact Us</h1>
            <h1 className="px-3 md:px-10 pt-8 md:pt-0 pb-12 text-5xl md:text-8xl font-bold text-left text-white">Call Or Message Us</h1>
            <h1 className="px-3 md:px-10 text-xl md:text-4xl font-bold text-left text-black">Scrolle down for Details  </h1>
          </div>
        </div>
        <section>
        <section className='bg-gradient-to-tr from-white   to-blue-200'>
      <div  id="contact" className="flex flex-col items-center lg:h-96 justify-center    text-black dark:text-black">
        <div className="text-black pb-12">
        <div className='text-center  text-4xl lg:text-9xl'><h3 className='text-center pt-5 text-3xl lg:text-6xl  font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Get in touch with us</h3></div>
        </div>
        <div useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex flex-col lg:flex-row  items-center justify-center  text-white">
          <div className="flex flex-col items-center border-blue-600 lg:border-r md:h-48 p-5">
          <PermPhoneMsgIcon className='text-blue-600 text-5xl'/>
            
            <p className="text-blue-700 ">Phone no</p>
            <div className='flex items-center'>
            
            <p className='text-black dark:text-black mx-2'>+917258866055</p>
            </div>
            
          </div>
          <div  data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex border-green-600  flex-col items-center whitespace-nowrap lg:border-r md:h-48 w-80 p-5">
            {/* <i class="fa-solid text-green-600 mb-4 fa-2xl fa-location-dot"></i> */}
            <EmailIcon className='text-blue-600 text-5xl'/>
            <p className="text-blue-600 text-xl">Email</p>
            <p className='text-xl text-black dark:text-black'>info@fotodukaan.com

</p>
            
          </div>
          <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex flex-col items-center  h-48 p-5">
            {/* <i class="fa-regular mb-4 text-green-600 fa-2xl fa-clock"></i> */}
            <LocationOnIcon className='text-blue-600 text-5xl'/>
            <p className="text-blue-700 ">Location</p>
            <p className=' mt-3 text-center md:w-[10vw] px-5 md:px-0 text-black'>154,1st Floor,Maharaja Kameshwar Complex Fraser Road Patna</p>
           
          </div>
        </div>
      </div>
      <div className="" style={{ height: "80vh" }}>
        <form
          action="https://formspree.io/f/mgvewagv"
          method="post"
          className="flex flex-col items-center justify-center "
        >
          <h1 
            useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
            className=" lg:text-5xl text-black text-4xl lg:mt-8 dark:text-black"
            style={{ fontFamily: "Roboto Condensed" }}
          >
            If you have any question{" "}
          </h1>
          <h1
            useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
            className=" lg:text-4xl text-2xl text-center text-black  my-4"
            style={{ fontFamily: "Roboto Condensed" }}
          >
            Please do not hesitate to send us a message
          </h1>

          <input
            useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
            className="w-4/5 lg:w-1/3  bg-blue-100 border-yellow-600 border-2 rounded-md  text-black   h-12 p-2 my-2 "
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            required
          />
          <input
          useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
            className="w-4/5 lg:w-1/3 bg-blue-100 border-yellow-600 border-2 rounded-md  text-black   h-12 p-2 my-2 "
            type="text"
            id="email"
            name="email"
            placeholder="Email"
          />
          <input
          useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
            className="w-4/5 lg:w-1/3 bg-blue-100 border-yellow-600 border-2 rounded-md  text-black   h-12 p-2 my-2 "
            type="text"
            id="phone"
            name="phone"
            placeholder="Your Phone No"
            required
          />
          <textarea
          useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
            className="w-4/5 lg:w-1/3  border-yellow-600 border-2 rounded-md  bg-blue-100  text-black   h-48 p-2 my-2 "
            name="message"
            id="message"
            placeholder="How can we help you"
          ></textarea>
          <button useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="w-40 h-12 my-2   bg-blue-600 text-white" type="submit">
            MESSAGE
          </button>
        </form>
      </div>
      </section>
        </section>
    </div>
  )
}
