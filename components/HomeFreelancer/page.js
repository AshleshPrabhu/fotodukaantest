import React from 'react'
import Slider from "react-slick";

const HomeFreelancer = async () => {

    var settings2 = {

        infinite: true,
        speed: 350,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
    
        responsive: [
          {
            breakpoint: 600,
            settings: {
    
              infinite: true,
              speed: 350,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              pauseOnHover: true,
            }
          },]
      };

      const response = await fetch(`http://localhost:3000/api/freelancer`, {
        cache: 'no-store' // Ensures data is fetched fresh on every request
    });
    const freelancers = await response.json();


  return (
    <div className='bg-gradient-to-r w-[100vw]  from-white to-white'>
          <Slider {...settings2}>
            {freelancers.map(({ _id, profilePhoto, name,startingPrice }) => {

              // const [readMore, setReadMore] = useState(true)
              // const truncatedText = text.split(' ').length > 20
              //   ? text.split(' ').slice(0, 20).join(' ')
              //   : text;

              return (
                <>
                  <div key={_id} className='relative w-[90vw] md:w-[22vw] mx-auto bg-gradient-to-r   from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                    <div className='block h-64 w-64  mx-auto rounded-full pt-4'>
                      <img src={profilePhoto} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
                    </div>

                    <div className='flex flex-col items-center text-center mt-4'>
                      <p className='text-xl font-bold my-1'>{name}</p>
                      <p className='text-sm'> <span className='font-semibold text-xl'>{startingPrice} ₹ </span > Starting Price  </p>

                      {/* <div className="flex flex-wrap items-center justify-center gap-y-4 my-4 space-x-2">
                      
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className=" text-white text-xs p-2 min-w-20 font-medium mr-2  rounded bg-blue-700 "
                >
                  {skill}
                </span>
              ))}
            </div> */}
                      {/* <div className='h-5 flex'>
                        {Array(5).fill(0).map((_, index) => (
                          index < star ? (
                            <StarIcon key={index} size="small" className="text-yellow-500" />
                          ) : (
                            <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                          )
                        ))}
                      </div> */}

                      <button className="bg-blue-500 text-white px-6 py-3 my-4 rounded-full mr-4">Know more</button>

                    </div>
                  </div>
                </>
              )
            })}
          </Slider>
        </div>
  )
}




export default HomeFreelancer;