'use client'
import React from 'react'
import { useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CustomizedAccordions from '@/components/accordian/Accordion';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReactCardFlip from 'react-card-flip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Slider from "react-slick";
import Modal from 'react-modal';
import PricePicker from '@/components/price/PricePicker';
import ReviewSection from '@/components/review/ReviewSection'
import DoneIcon from '@mui/icons-material/Done';
import jwt from "jsonwebtoken";


export default function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [freelancerData, setFreelancerData] = useState({
    freelancerDetails: {}
  });
  const [readMore, setReadMore] = useState(true)
  const [userName, setUserName] = useState('');
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [TestimonialData, setTestimonialData] = useState([])
  const [reviewLoading, setReviewLoading] = useState(true);

  const handleSubmitReview = async () => {
    let token = localStorage.getItem('token');

    if (token) {
      const decodedUser = jwt.decode(token);
      const name = decodedUser.name
      const text = userReview
      const star = userRating
      try {
        const response = await fetch(`/api/freelancer/review/${decodedUser.userid}/postReview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,text,star}),
        });
        // console.log('i am here3')
        const result = await response.json();
        if (response.ok) {
          alert('Review Done');
          setIsReviewModalOpen(false);
          setUserReview('');
          setUserRating(5);
          // Redirect or take other action
        } else {
          alert('Error doing review ' + result.message);
        }
      } catch (error) {
        // console.error('Error doing review', error);
        alert('Something went wrong. Please try again later.');
      }
    }
    else {
      alert('Please login to submit a review');
    }

    // Submit the review data (userName, userReview, userRating) to your backend or state management


  };



  const policyPoints = [
    "Minimum 20% of charge will be require to order",
    "Notify us 48 hours in advance to reschedule.",
    "Cancel booking with 48 hours' notice.",
    "10% fee deducted for cancellations over 48 hours.",
    "50% fee deducted for late cancellations.",
    "No refund for no-show without notice.",
    "Refunds take 7-10 business days to process.",
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);



  const handleReadMoreClick = (review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReview(null);
  };

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '600px',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  };

  var settings = {

    infinite: true,
    speed: 350,
    slidesToShow: 3,
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



  const getUser = async () => {
    const response = await fetch(`/api/freelancer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data)
    setFreelancerData(data);
    
    setLoading(false);
  };

  const getReview = async () => {
    setReviewLoading(true)
    const response = await fetch(`/api/freelancer/review/${id}/getReview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reviewData = await response.json();
    setTestimonialData(reviewData.reviews);
    // console.log(reviewData)
    setReviewLoading(false)
  };

  useEffect(() => {
    getUser();
    getReview();
  }, [id]);


 


  const displayCategories = (details) => {
    if (!details) return null;
    return Object.keys(details).map(category => (
      <div key={category}>
        <h4 className="flex w-full text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">{category}</h4>

      </div>
    ));
  };


  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
  let minamount = Number.MAX_VALUE;
  Object.keys(freelancerData?.freelancerDetails).forEach((key) => {
    const details = freelancerData?.freelancerDetails[key];
    const fullDayPrice = Number(details?.price?.fullDayPrice) || Number.MAX_VALUE;
    const weddingPrice = Number(details?.weddingPrice?.fullDayPrice) || Number.MAX_VALUE;

    minamount = Math.min(minamount, fullDayPrice, weddingPrice);
  });


  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedCardIndex(flippedCardIndex === index ? null : index);
  };


  //for accordian

  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  if (loading || reviewLoading) {
    return (<div className='min-h-[80vh] w-[100vw]'>
      <Box sx={{ display: 'flex' }}>
        <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
          <CircularProgress color="inherit" size="8rem" />
        </div>
      </Box>
    </div>);
  }

  //for image section



  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModalpic = () => setIsModalOpen(false);

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : freelancerData.image.length - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < freelancerData.image.length - 1 ? prevIndex + 1 : 0
    );
  };


  return (
    <div className='pt-20 overflow-x-hidden'>
      <section>
        <section className="text-gray-600 body-font overflow-hidden  bg-gradient-to-r from-white to-white">
          <div className="container lg:w-[75vw]  md:p-10 pt-10 mx-auto  bg-white  ">
            <div className=" mx-auto px-5 py-5 shadow-2xl md:p-10 flex flex-wrap   ">
              <img alt="ecommerce" className="lg:w-1/2 aspect-square w-full lg:h-auto h-64 object-cover object-center rounded" src={freelancerData.profilePhoto} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-700 tracking-widest">Freelancer</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{freelancerData.name}</h1>
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < Number(freelancerData.stars?.star) ? (
                        <StarIcon key={index} size="small" className="text-yellow-500" />
                      ) : (
                        <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                      )

                    )}
                  <span className="flex items-center">

                    <span className="text-gray-600 ml-3">{freelancerData.stars?.noOfPeople} Review</span>
                  </span>

                </div>
                <div>
                  <h1 className='text-xl font-bold'>{freelancerData.city}</h1>
                </div>

                <p className="leading-relaxed min-h-16 md:min-h-16">{freelancerData.aboutYourself}</p>


                <div className="flex flex-col mt-2 md:flex-row">
                  <p className='text-sm'> <span className='font-semibold text-3xl'>{minamount} ₹ </span > Starting Price  </p>
                  {/* <Link href={`/booking/${freelancerData._id}`} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Book Now</Link> */}


                </div>
                <div className='my-5'>
                  <PricePicker freelancerData={freelancerData} />
                </div>
                {/* <div className="hidden md:block mt-4">
                  
                  <h3 className="text-lg  font-bold mb-2">Categories</h3>
                  <div className='flex gap-4 flex-wrap'>
                    {displayCategories(freelancerData.freelancerDetails)}
                  </div>
                </div> */}
              </div>

            </div>




          </div>

        </section>



      </section>


      {/* this is for accordion */}
      {/* <section>
            {freelancerData.freelancerDetails && Object.keys(freelancerData.freelancerDetails).length > 0 ? (
              <CustomizedAccordions freelancerDetails={freelancerData.freelancerDetails}/>
            ) : (
              <p>Loading categories...</p>
            )}
        </section> */}

      <div className="w-full px-4 pt-5 ">
        <h1 className="text-3xl md:text-5xl text-center text-black mb-8" >
          Check Out My Services
        </h1>
        <div className="md:w-[50vw] md:mx-[15vw] bg-gradient-to-b  md:p-4 rounded-lg ">
          {Object.entries(freelancerData.freelancerDetails).map(([category, details], index) => (
            <div key={index} className=" border-b-2   rounded-lg">
              <div
                onClick={() => handleAccordionClick(index)}
                className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-blue-500  rounded-lg"
              >
                <div>
                  <p className='text-center'>{category.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                </div>
                <span className=" text-xl">{openIndex === index ? '-' : '+'}</span>
              </div>

              {openIndex === index && (
                <div className=" text-white bg-">
                  <div className="flex flex-col items-start">
                    {/* <h2 className="text-xl font-bold text-[#0E2041]">Subcategories:</h2> */}
                    <div className="flex items-center   flex-wrap  mb-4">
                      {details.subcategories.map((sub, idx) => (
                        <span key={idx} className="  text-sm  font-semibold border-r-2 px-3 text-gray-600">
                          {sub.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </span>
                      ))}
                    </div>

                    {details.cameraDetails && (
                      <div className="mb-4 flex ml-4 flex-col   ">
                        <h3 className="text-sm my-2 text-left   font-serife font-bold text-blue-600">
                          {category === 'Photography' || category === 'Videography' || category === 'Candid Photography' || category === 'Cinematography' ? 'Camera Details' :
                            category === 'Drone' ? 'Drone Details' :
                              category === 'Video Editing' ? 'Video Editing Software' : ''}
                        </h3>
                        <div className="text-sm  gap-x-5 items-left justify-center  text-[#0E2041]">
                          {Object.entries(details.cameraDetails).map(([key, value]) => (
                            <div className=''>

                              <p key={key} className="font-bold  px-1">
                                <span className='font-bold text-sm text-violet-900 '>{key.replace(/\b\w/g, (char) => char.toUpperCase())} : </span>
                                <span className='font-medium text-sm text-emerald-900'>{value}</span>
                              </p>
                            </div>

                          ))}
                        </div>
                      </div>
                    )}


                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* image section */}

      <section className='w-[100vw] mx-auto md:pr-[25vw] md:pl-[15vw]'>
        {freelancerData.image.length > 0 && freelancerData.video.length > 0 && (
          <h2 className='text-center text-3xl md:text-5xl my-6' >
            Glimpses of My Work
          </h2>
        )}

        {freelancerData.image.length > 0 && (
          <>
            <h2 className='text-center text-3xl text-blue-500 font-bold mb-6'>Image Gallery</h2>
            <div className='flex flex-wrap'>
              {freelancerData.image.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Freelancer Image ${index + 1}`}
                  onClick={() => openModal(index)} // Pass index here
                  className='md:w-[12vw] mx-auto w-[40vw] object-cover aspect-square my-4 md:mx-4 rounded-xl shadow-lg'
                />
              ))}
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                {/* Close Button */}
                <button
                  onClick={closeModalpic}
                  className="absolute top-8 right-8 text-white text-5xl font-bold bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90"
                >
                  &times;
                </button>

                {/* Image */}
                <div className="relative max-w-screen-lg flex justify-center items-center">
                  <img
                    src={freelancerData.image[currentImageIndex]}
                    alt={`Gallery ${currentImageIndex + 1}`}
                    className="w-full max-h-[80vh] object-contain"
                  />
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={showPreviousImage}
                  className="absolute bottom-10 left-4 text-white text-3xl font-bold bg-black bg-opacity-70 p-4 rounded-full hover:bg-opacity-90"
                >
                  &#9664;
                </button>
                <button
                  onClick={showNextImage}
                  className="absolute bottom-10 right-4 text-white text-3xl font-bold bg-black bg-opacity-70 p-4 rounded-full hover:bg-opacity-90"
                >
                  &#9654;
                </button>
              </div>
            )}
          </>
        )}
      </section>




      {/* Video Section */}
      {freelancerData.video.length > 0 && <section className='mt-10 px-auto md:pr-[25vw] md:pl-[15vw] w-[100vw]'>
        <h2 className='text-center text-3xl  text-blue-500 font-bold mb-6'>Video Gallery</h2>
        <div className='flex flex-wrap  '>
          {freelancerData.video?.map((videoLink, index) => (
            <div key={index} className=' mx-auto md:mx-0 md:w-[20vw] w-[93vw] p-4'>
              <div className='relative' style={{ paddingBottom: '70%' }}>
                <iframe
                  className='absolute top-0 left-0 w-full h-full rounded-xl'
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoLink)}`}
                  title={`Freelancer Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>}

      <section>
        {/* <ReviewSection/> */}
      </section>

      <section className=' px-auto md:pr-[25vw] md:pl-[15vw] w-[100vw]'>
        <div className='bg-gradient-to-r from-white to-white'>
          <div className=' text-3xl px-5  '>
            <h3 className='py-5 text-2xl lg:text-4xl font-semibold' >
              Review and Rating
            </h3>
            <p className='text-lg text-gray-600 '> {freelancerData.stars.star} star rating | {freelancerData.stars.noOfPeople} Review</p>
          </div>
          <div className=''>
            <Slider {...settings}>
              {Array.isArray(TestimonialData) && TestimonialData?.slice().reverse().map(({ id, profilePhoto, name, text, star,createdAt }) => {


                const truncatedText = text.split(' ').length > 20
                  ? text.split(' ').slice(0, 20).join(' ')
                  : text;

                  const formattedDate = new Date(createdAt).toLocaleDateString();

                  const reviewText = (() => {
                    switch (star) {
                      case 5:
                        return 'Excellent';
                      case 4:
                        return 'Nice';
                      case 3:
                        return 'Good';
                      case 2:
                        return 'Bad';
                      case 1:
                        return 'Worst';
                      default:
                        return ''; // In case of an unexpected star value
                    }
                  })();

                return (
                  <>
                    <div key={id} className='relative w-[90vw] md:w-[18vw] mx-auto bg-gradient-to-r h-[21rem] md:h-full from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                      {/* <div className='block w-24 h-24 mx-auto rounded-full pt-4'>
                        <img src={img} alt="" className='rounded-full h-24 w-24' />
                      </div> */}
                      <div className='h-5 flex items-end '>
                        {Array(5).fill(0).map((_, index) => (
                          index < star ? (
                            <StarIcon key={index} size="small" className="text-yellow-500" />
                          ) : (
                            <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                          )
                        ))}
                        <p className='text-[0.6rem] px-2'>{formattedDate}</p>

                        
                      </div>
                      <div>
                        <p className='my-3 font-bold text-xl '>{reviewText}</p>
                      </div>
                      <div className='flex flex-col items-center mt-5'>
                        <p className='text-sm h-28 md:h-20  text-gray-500'>{truncatedText} {text.split(' ').length > 18 && <button onClick={() => handleReadMoreClick({ profilePhoto, name, text, star })} className='blue1 inline-block'>...read more</button>}</p>

                        {/* <p className='text-xl font-bold my-4'>{name}</p> */}
                        {/* <p className='absolute top-0 right-0 dark:text-gray-400  text-9xl font-serif text-black/20'>,,</p> */}
                      </div>
                      <div className='flex py-5 items-center gap-x-4'>
                        <div className='block w-10 h-10 rounded-full '>
                          <img src={profilePhoto} alt="" className='rounded-full h-10 w-10 object-cover' />
                        </div>
                        <p className='text-xl font-bold my-4'>{name}</p>
                      </div>
                    </div>
                  </>
                )
              })}
            </Slider >
          </div>
        </div>

        {/* Modal */}
        {selectedReview && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Review Modal">
            <div className="text-center">
              <img src={selectedReview.profilePhoto} alt={selectedReview.name} className="rounded-full  md:w-24 h-24 mx-auto mb-4 object-cover" />
              <h2 className="text-2xl font-bold mb-2">{selectedReview.name}</h2>
              <div className="flex justify-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) =>
                    index < selectedReview.star ? (
                      <StarIcon key={index} size="small" className="text-yellow-500" />
                    ) : (
                      <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                    )
                  )}
              </div>
              <p className="text-gray-700">{selectedReview.text}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Modal>
        )}

        <section className="my-5 mx-5 border-y-2">
          <h1 className="text-2xl py-2 font-bold">Write a review</h1>
          <div
            className="my-2 cursor-pointer"
            onClick={() => {
              setIsReviewModalOpen(true);
            }}
          >
            <div className="flex flex-col md:flex-row md:gap-x-5 gap-3 md:gap-0 md:items-center text-xl">
              <div className="">

                <Rating
                  name="user-rating"
                  value={userRating}
                  precision={1}
                  onChange={(e, newValue) => setUserRating(newValue)}
                />
              </div>
              <textarea
                placeholder="Write your review here..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                className="w-[88vw] md:w-[35vw] p-2 border text-lg rounded-lg"
                rows="1"
              />
              <div className='w-full text-lg '>
                <button
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className=" bg-blue-500 text-white text-sm py-3 px-4   rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Modal for writing a review */}
          <Modal
            isOpen={isReviewModalOpen}
            onRequestClose={() => {
              setIsReviewModalOpen(false);
            }}
            style={customModalStyles}
            contentLabel="Review Modal"
          >
            <div className="text-center p-4">
              <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>



              {/* Text Area for Review */}
              <textarea
                placeholder="Write your review here..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                className="w-full mb-4 p-2 border rounded-lg"
                rows="4"
              />

              {/* Star Rating Selection */}
              <div className="mb-4">
                <p className="text-lg mb-2">Rating:</p>
                <Rating
                  name="user-rating"
                  value={userRating}
                  precision={1}
                  onChange={(e, newValue) => setUserRating(newValue)}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitReview}
                className="mt-4 bg-blue-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Submit Review
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="mt-2 bg-red-500 mx-2 py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 text-white hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </Modal>
        </section>

        <section className='my-2'>
          <div>
            <h1 className='pl-5  text-2xl text-gray-700 font-bold'>Policies</h1>
          </div>
          <div>
            <ul className='pl-5'>
              {policyPoints.map((point, index) => (
                <li key={index} className='text-gray-600 py-1 font-bold text-sm'> <span><DoneIcon className='text-green-900 ' /></span> {point}</li>
              ))}
            </ul>
          </div>
        </section>
      </section>






    </div>
  )
}

