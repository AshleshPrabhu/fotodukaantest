
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Image from 'next/image';


export default function page() {
  return (
    <>
      <div className="pt-20 ">
        <div className='w-[100vw] h-[80vh] bg-[#9b5810] bg-cover bg-center pt-20 bg-[url("/assets/about-pic.png")]'>
          <div className="md:w-[60vw]">
            <h1 className="px-3 md:px-10 py-5 text-5xl md:text-8xl font-bold text-left text-blue-500">Want's to Know</h1>
            <h1 className="px-3 md:px-10 pt-5 text-5xl md:text-8xl font-bold text-left text-white">What We Are Doing?</h1>
            <h1 className="px-3 md:px-10 pt-8 md:pt-0 pb-12 text-5xl md:text-8xl font-bold text-left text-white">What's Our story?</h1>
            <h1 className="px-3 md:px-10 text-xl md:text-4xl font-bold text-left text-black">Scrolle down for the answer <KeyboardArrowDownIcon className='text-3xl text-blue-700' /> </h1>
          </div>
        </div>
        <section>
          <div className=''>
            <h1 className=" pt-5 text-4xl md:text-7xl  text-center text-black">What We Are Doing?</h1>
            <h1 className=" pt-5 text-4xl md:text-7xl  text-center text-black">For Freelancer</h1>
          </div>

          <div className="bg-cover  bg-center w-full my-8  flex flex-col md:flex-row text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-[#0E2041] to-[#0E2041]">
            <div className="flex bg bg-white rounded-b-[9rem] md:rounded-r-[17rem] justify-center items-center  md:w-[55%]  ">
              <div className='h-full'>
                <img className='object-cover h-full md:w-[50vw] shadow-2xl rounded-b-[6rem] md:rounded-r-[17rem]' src="https://images.pexels.com/photos/2179205/pexels-photo-2179205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              </div>
            </div>
            <div className="w-full md:w-[60%] px-7 py-10 md:px-20 md:py-20">
              <h1 className="text-3xl md:text-5xl  text-left md:pr-10  text-white " style={{
                fontFamily: "poppins"

              }}>
                Get Hired & Reach More Clients! Register and Start Earning
              </h1>
              <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-40 font-serif text-left text-white  text-[0.6rem]">
                At Foto Dukaan, we’re committed to connecting talented freelancers with clients who need professional photographers, cinematographers, drone operators, crane operators, and video editors for their projects. Whether it’s for weddings, events, corporate videos, or creative personal projects, our platform makes it easy for freelancers to showcase their skills and clients to find the right professionals.
              </p>
              <div className='mt-9'>

                <div className='flex'>
                  <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl  md:text-4xl text-white ' /></div>
                  <div className='ml-2 text-white '>
                    <h1 className='text-xl md:text-3xl text-left  font-serif '>Get More Bookings</h1>
                    <p className="md:text-sm  text-left  md:pr-64  font-serif text-[0.6rem]">Our platform helps you increase your visibility and land more gigs.</p>


                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-blue-500 rounded-md h-full  inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2 text-white '>
                    <h1 className='text-xl md:text-3xl font-serif  text-left '>Start Earning Instantly</h1>
                    <p className="md:text-sm  text-left  md:pr-64  font-serif text-[0.6rem]">Once your profile is set up, clients can start booking your services right away.</p>

                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-yellow-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl  md:text-4xl text-white' /></div>
                  <div className='ml-2 text-white '>
                    <h1 className='text-xl md:text-3xl font-serif text-left  '>Simple Registration Process</h1>
                    <p className="md:text-sm md:pr-64 text-left  font-serif text-[0.6rem]">We’ve made the registration process quick and hassle-free! Just:

                      Fill in your details in the registration form.
                      Upload your portfolio and set your availability.
                      Start earning money and get booked for more projects.
                      It’s that easy! Join us today and grow your freelance career effortlessly.</p>
                  </div>
                </div>

              </div>
              <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-full mr-4">Contact Us</button>

              </div>
            </div>
          </div>



        </section>

        <section>
          <div className=''>

            <h1 className=" pt-5 text-4xl md:text-7xl  text-center text-black">For Clients</h1>
          </div>

          <div className="bg-cover  bg-center w-full my-8  flex flex-col md:flex-row-reverse text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-[#F5AA2B] to-[#F5AA2B]">
            <div className="flex  bg bg-white rounded-b-[9rem] md:rounded-l-[17rem] justify-center items-center  md:w-[55%]  ">
              <div className='h-full'>
                <img className='object-cover h-full md:w-[50vw] shadow-2xl rounded-b-[9rem] md:rounded-br-0  md:rounded-l-[17rem] ' src="https://images.pexels.com/photos/4307935/pexels-photo-4307935.jpeg" alt="" />
              </div>
            </div>
            <div className="w-full md:w-[60%] px-7 py-10 md:px-10 md:py-20">
              <h1 className="text-3xl md:text-5xl  text-left md:pr-10  text-black " style={{
                fontFamily: "poppins"

              }}>
                Hassle-Free Hiring. Book Freelancers Instantly!
              </h1>
              <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-20 font-serif text-left text-black text-[0.6rem]">
                At Photo Dukaan, we make it easy for talented freelancers and clients to connect. Whether you need professional photographers, cinematographers, drone operators, crane operators, or video editors, we’re here to simplify the process. From weddings and events to corporate shoots and creative projects, we ensure clients find the right experts, and freelancers get the exposure they deserve.
              </p>
              <div className='mt-9'>

                <div className='flex'>
                  <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl  md:text-4xl text-white' /></div>
                  <div className='ml-2 '>
                    <h1 className='text-xl md:text-3xl text-left  font-serif '>Browse Top Talent:</h1>
                    <p className="md:text-sm  text-left text-black md:pr-64  font-serif text-[0.6rem]">Explore portfolios of skilled freelancers and find the perfect match for your project.</p>


                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-blue-500 rounded-md h-full  inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2 '>
                    <h1 className='text-xl md:text-3xl font-serif  text-left '>Save Time & Effort</h1>
                    <p className="md:text-sm  text-left text-black md:pr-64  font-serif text-[0.6rem]">No need to worry about managing freelancers – simply book, and let the professionals handle the work.</p>

                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-yellow-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl  md:text-4xl text-white' /></div>
                  <div className='ml-2 '>
                    <h1 className='text-xl md:text-3xl font-serif text-left text-black '>Simple Booking Process</h1>
                    <p className="md:text-sm md:pr-64 text-left text-black font-serif text-[0.6rem]">We’ve made it effortless for you:

                      Browse and select the freelancers that suit your needs.
                      Book instantly by paying a small token amount.
                      Relax and enjoy the peace of mind as your project is handled by the pros.
                      It’s that simple! Let us help you find the right professionals for your next project..</p>
                  </div>
                </div>

              </div>
              <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">Contact Us</button>

              </div>
            </div>
          </div>



        </section>



        <section>
          <div className=''>

            <h1 className=" pt-5 text-4xl md:text-7xl  text-center text-black">Our Story!</h1>
          </div>

          <div className="bg-cover  bg-center w-full my-8  flex flex-col md:flex-row text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-[#0E2041] to-[#0E2041]">
            <div className="flex bg bg-white rounded-b-[9rem] md:rounded-r-[17rem] justify-center items-center  md:w-[55%]  ">
              <div className='my-auto'>
                <img className='  md:w-[50vw] my-auto rounded-b-[6rem] md:rounded-r-[17rem]' src="https://res.cloudinary.com/hritiksarraf/image/upload/v1728397188/logo-light_bvqacf.png" alt="" />
              </div>
            </div>
            <div className="w-full md:w-[60%] px-7 py-10 md:px-20 text-white md:py-20">
              <h1 className="text-3xl md:text-5xl  text-left md:pr-10   " style={{
                fontFamily: "poppins"

              }}>
                Connecting Creativity with Memories – Your Go-To Platform for Freelance Visual Artists
              </h1>
              <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-40 font-serif text-left  text-[0.7rem]">
                Founded in 2024, Fotodukaan.com emerged from a simple idea: to bridge the gap between talented photographers and cinematographers and those who cherish their special moments. Our founder, driven by a passion for storytelling and visual arts, saw the challenges both freelancers and clients faced in finding each other. Freelancers often struggled to showcase their work and reach potential clients, while people frequently found it difficult to locate skilled professionals who could understand and capture their vision.
              </p>
              <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-20 font-serif text-left  text-[0.7rem]">Recognizing this gap, Fotodukaan.com was established as a dedicated platform where freelancers can display their portfolios and connect with clients seamlessly. Our mission is to empower freelance photographers, cinematographers, drone operators, and video editors by providing them with a platform to showcase their talents, and to offer clients a convenient, reliable way to find the perfect professionals for their needs.</p>
              <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-20 font-serif text-left  text-[0.7rem]">From weddings and birthdays to corporate events and personal projects, Fotodukaan.com aims to be a trusted partner in every significant life event. We believe in the power of visual storytelling and the importance of preserving memories, and we are committed to making high-quality photography and videography accessible to everyone across India.</p>
              <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-20 font-serif text-left  text-[0.7rem]">Today, Fotodukaan.com continues to grow, bringing together a vibrant community of creatives and clients. We are proud to facilitate connections that not only create beautiful memories but also support and celebrate the incredible talent of freelance visual artists in India.</p>

              <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-full mr-4">Contact Us</button>

              </div>
            </div>
          </div>



        </section>





      </div>
    </>
  )
}
