'use client'
import ServiceCard from '@/components/card/ServiceCard';
import Image from 'next/image';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import Link from 'next/link';
import Modal from 'react-modal';
import SearchBar from '@/components/searchBar/SearchBar';
import Location from '@/components/location/Location';

export default function Home() {

  const Services = [
    {
      title: "Traditional Photographer",
      img: "https://images.unsplash.com/photo-1490638114763-02630949efda?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/freelancer/event/Traditional Photography",
      des: "Our professional photographers capture the essence of your special moments, from weddings and events to personal and corporate shoots."
    },
    {
      title: "Candid Photographer",
      img: "https://res.cloudinary.com/hritiksarraf/image/upload/v1733410783/professional-indian-young-photographer-taking-photos-studio-with-leight_oxf5jx.jpg",
      link: "/freelancer/event/Candid Photography",
      des: "Specializing in capturing authentic, unposed moments, our candid photography services provide a natural, storytelling approach to documenting your special events."
    },
    {
      title: "Traditional Videographer",
      img: "https://images.unsplash.com/photo-1653851792843-077ee7c5e7cb?q=80&w=2601&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/freelancer/event/Traditional Videography",
      des: "Our videographers create stunning visual narratives that highlight the most important moments of your events, preserving your memories in a cinematic way."
    },
    {
      title: "Cinematographer",
      img: "https://images.unsplash.com/photo-1520904504199-f040f78d6f66?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/freelancer/event/Cinematography",
      des: "Our talented cinematographers specialize in creating high-quality films that evoke emotion and beautifully capture the essence of your events or projects."
    },
    {
      title: "Drone",
      img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/freelancer/event/Drone",
      des: "Our skilled drone operators provide breathtaking aerial photography and videography, offering a unique perspective perfect for large events, real estate, and outdoor shoots."
    },
    {
      title: "Crane",
      img: "https://res.cloudinary.com/hritiksarraf/image/upload/v1733410442/istockphoto-636166868-612x612_pzf1pm.jpg",
      link: "/freelancer/type/Crane",
      des: "Our crane operators bring cinematic movement to your videos, ideal for large-scale productions such as concerts, weddings, and film shoots."
    },
    {
      title: "LED wall",
      img: "https://ultravisionledsolutions.com/cdn/shop/products/STAGERenderingForMarketingPurpose-min-min.png?v=1658158319&width=4000",
      link: "/freelancer/type/LED wall",
      des: "Enhance your events with our LED wall services, providing high-quality visual displays perfect for large gatherings, corporate events, and concerts."
    },
    {
      title: "LED TV",
      // img: "https://maduraievents.in/wp-content/uploads/2014/05/wedding-led-tv-videography.jpg",
      img:"https://5.imimg.com/data5/IOS/Default/2024/9/454121300/VQ/PI/NH/7956633/product-jpeg-500x500.png",
      link: "/freelancer/type/LED TV",
      des: "We provide high-definition LED TVs for events and presentations, ensuring a clear and vibrant display for your content."
    }
  ];

  const Partner = [
    {
      title: "Nikon",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PgiYFeA8kO7ZxH4jUDHsf0AloYOgW2tu-Q&s"
    },
    {
      title: "Canon",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR259mvG2KqBVCsIboYWBGd-UNSkp6dEKJJAg&s"
    },
    {
      title: "Sony",
      img: "data:image/png;base64,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"
    },
    {
      title: "GoPro",
      img: "data:image/jpeg;base64,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"
    }
  ]


  //review section start here
  const TestimonialData = [
    {
      id: 1,
      name: "Hritik",
      text: "The photographers and videographers from this platform truly captured the essence of our event. Their professionalism and creativity exceeded all expectations.",
      img: "https://www.shutterstock.com/image-photo/young-handsome-business-man-dressed-260nw-1487434763.jpg",
      star: 5,
      skills: ['photographer', 'videographer', 'drone']
    },
    {
      id: 2,
      name: "Mani",
      text: "Hiring a photographer through this platform was the best decision for our corporate event. The attention to detail and the quality of the photos were outstanding.",
      img: "https://www.shutterstock.com/image-photo/have-great-idea-handsome-businessman-260nw-1282628038.jpg",
      star: 4,
      skills: ['photographer']
    },
    {
      id: 3,
      name: "Piyush",
      text: "The drone operator captured breathtaking aerial shots of our wedding. The cinematic quality of the video blew everyone away. Highly recommended!",
      img: "https://media.gettyimages.com/id/1310980400/photo/portrait-of-burnout-businesswoman-in-an-office.jpg?s=612x612&w=gi&k=20&c=fLkvB7hcl7zWJIOUBamNe0lbKIkc4kWFQ1vpQrVwTXQ=",
      star: 5,
      skills: ['videographer', 'drone']
    },
    {
      id: 4,
      name: "Saurav",
      text: "From photography to videography, the team was on point. The visuals turned out beautifully, and their professionalism was evident throughout the event.",
      img: "https://media.gettyimages.com/id/641199822/photo/businesswomen-at-workstation-in-start-up-office.jpg?s=612x612&w=gi&k=20&c=uk6k1ILVRf7yKT26DtfgemzQtOyISm72Egn5xr_XT_4=",
      star: 4,
      skills: ['photographer', 'videographer', 'drone']
    },
    {
      id: 5,
      name: "Aditya",
      text: "The entire experience, from booking a photographer to getting the final edits, was seamless. The quality and timeliness of the deliverables were impressive.",
      img: "https://t4.ftcdn.net/jpg/01/42/20/17/360_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.jpg",
      star: 5,
      skills: ['photographer', 'videographer', 'drone']
    },
    {
      id: 6,
      name: "Riya",
      text: "The candid photography was superb! They really know how to capture those fleeting moments that matter the most. I couldn’t have asked for better photographers.",
      img: "https://www.shutterstock.com/image-photo/portrait-happy-woman-smiling-camera-260nw-1531112350.jpg",
      star: 5,
      skills: ['photographer', 'candid photography']
    },
    {
      id: 7,
      name: "Amit",
      text: "We hired a cinematographer through this platform, and the end result was incredible. The video quality was top-notch, and the storytelling was perfect for our corporate project.",
      img: "https://www.shutterstock.com/image-photo/portrait-confident-young-man-standing-260nw-767916349.jpg",
      star: 4,
      skills: ['cinematographer', 'videographer']
    },
    {
      id: 8,
      name: "Sanya",
      text: "The drone footage for our outdoor event was stunning. The wide angles and smooth shots added a cinematic feel to the final video. I highly recommend their drone services!",
      img: "https://www.shutterstock.com/image-photo/young-woman-holding-paper-coffee-260nw-1172777339.jpg",
      star: 5,
      skills: ['drone', 'videographer']
    },
    {
      id: 9,
      name: "Karthik",
      text: "The crane operator we hired added an extra layer of professionalism to our event's video production. The dynamic camera movements made our footage stand out. Exceptional service!",
      img: "https://www.shutterstock.com/image-photo/smiling-handsome-young-man-260nw-729510768.jpg",
      star: 5,
      skills: ['crane operator', 'videographer']
    },
    {
      id: 10,
      name: "Anjali",
      text: "The LED wall setup transformed our event’s visual experience. It was perfect for showcasing live footage and presentations. We were thrilled with the results.",
      img: "https://www.shutterstock.com/image-photo/young-woman-glasses-sitting-coffee-260nw-1922522086.jpg",
      star: 4,
      skills: ['LED wall', 'event management']
    }
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

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

  // review setiing ends here

  const imgurl = "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


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

  var partnerSettings = {

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


  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Photographer", "Candid Photographer", "Videographer", "Cinematographer", "Drone", "Crane", "LED Wall", "LED TV"];
  const [freelancer, setFreelancer] = useState([])
  const period = 2000;

  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");

  const getFeelancer = async () => {
    // console.log('getting freelancer')
    const response = await fetch("/api/freelancer");
    const data = await response.json();
    // console.log('got freelancer', data)
    setFreelancer(data);
  };


  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  useEffect(() => {
    getFeelancer()
  }, [])

  const isSearchDisabled = !category;



  return (
    <div className="bg-gradient-to-r from-white overflow-x-hidden  to-white ">
      <section>

      </section>
      {/* Hero Section */}
      <section className="  bg-cover flex flex-col-reverse md:flex-row bg-gradient-to-t md:bg-gradient-to-r from-blue-800 to-blue-400   bg-center w-full h-full pt-20  text-center md:text-left ">
        <div className=" md:w-[70vw] p-5 md:p-10 md:px-15">

          <h1 className="text-5xl md:text-8xl font-bold text-left text-white">Find the Best Freelancers <p className="text-yellow-500 h-12 " >{' '}<span className=' text-3xl md:text-6xl  my-7   md:block stikey '> <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "papper cups", "", "UI/UX Designer" ]'><span className="wrap border-r-4 px-1 border-yellow-950">{text}</span></span></span></p></h1>

          {/* <p className='text-gray-300 border-l-2 px-2 text-left font-light hidden md:block  my-4 md:my-8 md:mr-48 font-[Halant]'>Are you looking for a skilled photographer, cinematographer, drone operator, or video editor? Or are you a freelancer ready to showcase your talent and get hired for exciting projects? Our platform connects creative professionals with those who need them, making it easier than ever to hire the right person for the job.</p>
          <p className='text-gray-300 border-l-2 px-2 text-left font-light md:hidden  my-4 md:my-8 md:mr-48 font-[Halant]'>Are you looking for a skilled photographer, cinematographer, drone operator, or video editor? Our platform connects creative professionals with those who need them.</p> */}
          <p className='py-8 text-white text-lg'> Are you looking for a skilled photographer, cinematographer, drone operator, or video editor? Our platform connects creative professionals with those who need them.</p>
          <div className="mt-10 sm:mt-8  ">
            <div className="bg-white rounded-md shadow-lg  w-full sm:w-[45vw] f gap-9 space-y-4  space-x-4">
              {/* <select
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
                className="w-full sm:w-auto border-gray-300 rounded-md p-2"
              >
                <option value="">Select Category</option>
                <option>Photography</option>
                <option>Videography</option>
                <option>Drone</option>
                <option>Video Editing</option>
                <option>Crane</option>
              </select>

              <select
                value={place}
                onChange={(e) => { setPlace(e.target.value) }}
                className="w-full sm:w-auto border-gray-300 rounded-md p-2"
              >
                <option value="">Select Place</option>
                <option>patna</option>
                <option>muzaffarpur</option>
              </select>

              <Link
                href={isSearchDisabled ? "#" : `/freelancer/type/${category}/${place}`}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${isSearchDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                  }`}
              >
                Find Freelancer →
              </Link> */}
              <SearchBar/>
            </div>
          </div>
          <div className="mt-8 flex mx-auto w-[100%] justify-center md:justify-start">

            <Link href={"/contact"} className="bg-yellow-600 text-white px-6 py-3 rounded-full mr-4">Contact Us</Link>

          </div>
        </div>
        <div className="  ">
          <img
            // src='https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            src='https://wedding-planner-ui-by-mani.vercel.app/endpic1.jpg'
            // src='https://unsplash.com/photos/beautiful-indian-bride-and-groom-hand-with-mehandi-design-BDWH_GDKVCIhttps://plus.unsplash.com/premium_photo-1670524465634-93cf255ffa8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwd2VkZGluZyUyMGltYWdlfGVufDB8fDB8fHwwhttps://plus.unsplash.com/premium_photo-1670524465634-93cf255ffa8b?q=80&w=3254&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            width={800}
            height={900}
            className=" rounded-lg shadow-lg md:w-[70vw]  object-cover rounded-b-[10rem] md:rounded-br-[0rem] md:rounded-bl-[25rem]  h-[40vh] md:h-[80vh]"
            alt="Camera"
          />
        </div>
      </section>
      
      <section>
        <div>
          <h1 className="text-4xl md:text-6xl py-10 text-center text-gradient-to-r from-white to-blue-100"
            
          >Services we provide</h1>
        </div>
        <div className='flex flex-wrap items-center justify-center'>

          {Services.map(({ service, index, img, title, link, des }) => {


            return (
              <Link href={link}>
                <div key={index} className='relative border-[0.4rem] md:w-[21vw] mx-6 bg-gradient-to-r   from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10  '>
                  <div className='block md:h-[17rem] md:w-[17rem] mx-6 md:mx-auto rounded-full pt-6'>
                    <img src={img} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
                  </div>

                  <div className='flex flex-col items-center text-center mt-4'>
                    <p className='text-xl font-bold my-1'>{title}</p>
                    <p className='text-sm mb-8 px-3 '> <span className='font-semibold text-lg'> </span >{des}</p>



                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="bg-cover  bg-center w-full py-8  flex flex-col md:flex-row text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-white to-blue-300">
        <div className="flex bg bg-white rounded-b-[9rem] p-5 md:p-0 md:rounded-r-[17rem] justify-center items-center  md:w-[40%]  ">
          <div className="md:w-[500px] md:h-[500px] rounded-t-[10rem]   flex justify-center  relative">
            <Image
              src="/assets/hero3.png" // Ensure this image has a transparent background (e.g., PNG)

              objectFit="cover"
              width={1000}
              height={1000}
              className="rounded-[5rem] z-10 "
              alt="Camera"
            />
          </div>
        </div>
        <div className="w-full md:w-[60%] px-7  md:px-20">
          <h1 className="text-3xl md:text-4xl  text-left md:pr-32  text-black " >
            Hire Us to Turn    <span className="">Your Moments</span> into Masterpieces
          </h1>
          <p className="  md:text-sm mt-2  md:mt-5 m-auto md:pr-40 font-serif text-left text-black text-[0.6rem]">
            We are here to help you capture and preserve life’s most precious moments. Whether it’s a wedding, corporate event, or personal milestone, our expert team ensures that every detail is beautifully immortalized, leaving you with timeless memories.
          </p>
          <div className='mt-9'>

            <div className='flex'>
              <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-2xl  md:text-4xl text-white' /></div>
              <div className='ml-2 '>
                <h1 className='text-xl md:text-2xl  text-left text-black '>For Freelancers</h1>
                <p className="md:text-sm md:pr-64 text-left text-black font-serif text-[0.6rem]">At Fotodukaan, we empower talented freelancer to showcase their skills and connect with clients. Our platform helps freelancers reach more customers, secure more bookings, and grow their careers effortlessly.</p>
              </div>
            </div>

            <div className='flex mt-8'>
              <div className='bg-yellow-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-2xl  md:text-4xl text-white' /></div>
              <div className='ml-2 '>
                <h1 className='text-xl md:text-2xl   text-left '>For Customers</h1>
                <p className="md:text-sm  text-left text-black md:pr-64  font-serif text-[0.6rem]">We make it easy for you to find the perfect professionals for any event or project. Whether you're planning a wedding, hosting a corporate event, or working on a creative project, our platform connects you with top-rated freelancers who specialize in capturing your vision.</p>
              </div>
            </div>

            <div className='flex mt-8'>
              <div className='bg-blue-500 rounded-md h-full  inline-block p-1'><CameraAltOutlinedIcon className='text-2xl md:text-4xl text-white' /></div>
              <div className='ml-2 '>
                <h1 className='text-xl md:text-2xl text-left   '>Our Mission</h1>
                <p className="md:text-sm  text-left text-black md:pr-64  font-serif text-[0.6rem]">Our mission at Fotodukaan is to bridge the gap between talented freelancers and clients who value the art of visual storytelling. We strive to make high-quality photography and videography accessible to everyone while supporting the creative community. </p>
              </div>
            </div>



          </div>
          <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
            <Link href='/contact' className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">Contact Us</Link>

          </div>
        </div>
      </section>

      <section>
        <div className='my-0 md:my-10'>
          <h1 className="text-4xl md:text-6xl pt-10 font-serif text-center text-gradient-to-r from-white to-blue-100"
            style={{
              fontFamily: "poppins"

            }}
          >Our Best freelancer</h1>
        </div>
        <div className='bg-gradient-to-r w-[100vw]  from-white to-white'>
          <Slider {...settings2}>
            {freelancer.map(({ _id, profilePhoto, name, startingPrice, stars, freelancerDetails }) => {

              // const [readMore, setReadMore] = useState(true)
              // const truncatedText = text.split(' ').length > 20
              //   ? text.split(' ').slice(0, 20).join(' ')
              //   : text;
              let minamount = Number.MAX_VALUE;
              Object.keys(freelancerDetails).forEach((key) => {
                const details = freelancerDetails[key];
                const fullDayPrice = Number(details?.price?.fullDayPrice) || Number.MAX_VALUE;
                const weddingPrice = Number(details?.weddingPrice?.fullDayPrice) || Number.MAX_VALUE;

                minamount = Math.min(minamount, fullDayPrice, weddingPrice);
              });

              return (
                <>
                <Link href={`/freelancer/${_id}`} className="">
                  <div key={_id} className='relative w-[90vw] md:w-[22vw] mx-auto bg-gradient-to-r   from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                    <div className='block h-64 w-64  mx-auto rounded-full pt-4'>
                      <img src={profilePhoto} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
                    </div>

                    <div className='flex flex-col items-center text-center mt-4'>
                      <p className='text-xl font-bold my-1'>{name}</p>
                      <p className='text-sm'> <span className='font-semibold text-xl'>{minamount} ₹ </span > Starting Price  </p>

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
                      <div className='h-5 flex'>
                        {Array(5).fill(0).map((_, index) => (
                          index < Number(stars.star) ? (
                            <StarIcon key={index} size="small" className="text-yellow-500" />
                          ) : (
                            <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                          )
                        ))}
                      </div>

                      <Link href={`/freelancer/${_id}`} className="bg-blue-500 text-white px-6 py-3 my-4 rounded-full mr-4">Know more</Link>

                    </div>
                  </div>
                  </Link>
                </>
              )
            })}
          </Slider>
        </div>



      </section>


      <section>
        <h1 className='text-center t lg:text-5xl font-mono  whitespace-no-wrap my-16' style={{ fontFamily: 'Lora', }}>Some of the beautyfull moment captured by our freelancer</h1>
        <div class="ratio ratio-4x3 md:h-[60vh] w-screen " >
          <iframe src="https://www.youtube.com/embed/34Tpyu7oogs?si=7fpy43deQISY6DEJ" title="YouTube video" allowfullscreen="true" className='md:h-[60vh] md:w-[80vw] h-[40vh] w-[90vw] m-auto rounded-2xl '></iframe>
        </div>


        <div>
          <section class="text-gray-600 body-font">
            <div className='text-center  text-3xl lg:text-9xl'><h3 className='text-center py-24  text-[18px] lg:text-7xl  pt-10 font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Our gallery</h3></div>
            <div class="container md:px-32 px-5  mx-auto flex flex-wrap">
              <div class="flex flex-col md:flex-row flex-wrap md:-m-2 -m-1">
                <div class="flex flex-col md:flex-row flex-wrap md:w-1/2">
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://wedding-planner-ui-by-mani.vercel.app/pictureperfect.jpeg`} />
                  </div>
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://wedding-planner-ui-by-mani.vercel.app/fest1.jpeg`} />
                  </div>
                  <div class="md:p-2 p-1 md:w-full">
                    <img alt="gallery" class="w-full h-full object-cover object-center block" src={`https://wedding-planner-ui-by-mani.vercel.app/venue2.jpeg`} />
                  </div>
                </div>
                <div class="md:flex flex-col hidden md:flex-row flex-wrap md:w-1/2">
                  <div class="md:p-2 p-1 w-full">
                    <img alt="gallery" class="w-full h-full object-cover object-center block" src={imgurl} />
                  </div>
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://wedding-planner-ui-by-mani.vercel.app/venue4.jpeg`} />
                  </div>
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://wedding-planner-ui-by-mani.vercel.app/artex.webp`} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className='mt-20'>
        <div className='bg-gradient-to-r from-blue-100 to-blue-300'>
          <div className='text-center text-3xl lg:text-9xl'>
            <h3 className='text-center py-5 text-[18px] lg:text-6xl font-extrabold' style={{ fontFamily: 'Caveat' }}>
              Testimonial
            </h3>
          </div>
          <div className=''>
            <Slider {...settings}>
              {TestimonialData.map(({ id, img, name, text, star }) => {

                const [readMore, setReadMore] = useState(true)
                const truncatedText = text.split(' ').length > 20
                  ? text.split(' ').slice(0, 20).join(' ')
                  : text;

                return (
                  <>
                    <div key={id} className='relative md:w-[30vw] mx-auto bg-gradient-to-r h-[21rem] md:h-80 from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                      <div className='block w-24 h-24 mx-auto rounded-full pt-4'>
                        <img src={img} alt="" className='rounded-full h-24 w-24' />
                      </div>
                      <div className='flex flex-col items-center text-center mt-10'>
                        <p className='text-sm h-28 md:h-20 text-center text-gray-500'>{truncatedText} {text.split(' ').length > 20 && <button onClick={() => handleReadMoreClick({ img, name, text, star })} className='blue1 inline-block'>...read more</button>}</p>

                        <div className='h-5 flex'>
                          {Array(5).fill(0).map((_, index) => (
                            index < star ? (
                              <StarIcon key={index} size="small" className="text-yellow-500" />
                            ) : (
                              <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                            )
                          ))}
                        </div>

                        <p className='text-xl font-bold my-4'>{name}</p>
                        <p className='absolute top-0 right-0 dark:text-gray-400  text-9xl font-serif text-black/20'>,,</p>
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
              <img src={selectedReview.img} alt={selectedReview.name} className="rounded-full w-24 h-24 mx-auto mb-4" />
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
      </section>

      <section>
        <div className='my-12'>
          <div className='text-center  text-3xl lg:text-9xl'><h3 className='text-center py-5  text-[18px] lg:text-6xl  font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Our Partners</h3></div>
          <div className='bg-gradient-to-r  from-white to-white'>
            <Slider {...partnerSettings}>
              {Partner.map(({ id, img, title, }) => {

                const [readMore, setReadMore] = useState(true)
                const truncatedText = text.split(' ').length > 20
                  ? text.split(' ').slice(0, 20).join(' ')
                  : text;

                return (
                  <>
                    <div key={id} className=' md:w-[20vw] mx-auto bg-gradient-to-r   from-white to-white  dark:text-black my-6  shadow-xl  bg-primary/10  '>
                      <div className='block h-64 w-64  mx-auto rounded-full pt-4'>
                        <img src={img} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
                      </div>

                      <div className='flex flex-col items-center text-center my-4'>
                        <p className='text-xl font-bold my-1'>{title}</p>




                      </div>
                    </div>
                  </>
                )
              })}
            </Slider>
          </div>
        </div>
      </section>

      <section className='bg-gradient-to-tr from-white   to-blue-400'>
        <div id="contact" className="flex flex-col items-center lg:h-96 justify-center pt-10   text-black dark:text-black">
          <div className="text-black pb-12">
            <div className='text-center  text-3xl lg:text-9xl'><h3 className='text-center py-5  text-4xl lg:text-6xl  font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Get in touch with us</h3></div>
          </div>
          <div useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex flex-col lg:flex-row  items-center justify-center  text-white">
            <div className="flex flex-col items-center border-blue-600 lg:border-r md:h-48 p-5">
              <PermPhoneMsgIcon className='text-blue-600 text-5xl' />

              <p className="text-blue-700 ">Phone no</p>
              <div className='flex items-center'>

                <p className='text-black dark:text-black mx-2'>+917258866055</p>
              </div>

            </div>
            <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex border-green-600  flex-col items-center whitespace-nowrap lg:border-r md:h-48 w-80 p-5">
              {/* <i class="fa-solid text-green-600 mb-4 fa-2xl fa-location-dot"></i> */}
              <EmailIcon className='text-blue-600 text-5xl' />
              <p className="text-blue-600 text-xl">Email</p>
              <p className='text-xl text-black dark:text-black'>info@fotodukaan.com

              </p>

            </div>
            <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex flex-col items-center  md:h-48 p-5">
              {/* <i class="fa-regular mb-4 text-green-600 fa-2xl fa-clock"></i> */}
              <LocationOnIcon className='text-blue-600 text-5xl' />
              <p className="text-blue-700 ">Location</p>
              <p className=' mt-3 px-5 text-center md:w-[10vw] text-black'>154,1st Floor,Maharaja Kameshwar Complex Fraser Road Patna</p>

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
              className="w-4/5 lg:w-1/3  bg-blue-100 border-yellow-600 border-2 rounded-md dark:text-black text-black   h-12 p-2 my-2 "
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              required
            />
            <input
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3 bg-blue-100 border-yellow-600 border-2 rounded-md dark:text-black text-black   h-12 p-2 my-2 "
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3 bg-blue-100 border-yellow-600 border-2 rounded-md dark:text-black text-black   h-12 p-2 my-2 "
              type="text"
              id="phone"
              name="phone"
              placeholder="Your Phone No"
              required
            />
            <textarea
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3  border-yellow-600 border-2 rounded-md  bg-blue-100 dark:text-black text-black   h-48 p-2 my-2 "
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


    </div>
  );
}
