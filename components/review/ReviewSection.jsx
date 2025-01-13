import React from "react";

const reviews = [
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
const ReviewSection = () => {
    return (
      <div className="p-6 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>
          <a href="#" className="text-pink-500 text-sm font-semibold">View all &gt;</a>
        </div>
        
        {/* Average Ratings */}
        <div className="flex items-center space-x-4 text-gray-800 mb-6">
          <span className="text-2xl font-semibold">5.0</span>
          <span className="text-sm">30 Reviews</span>
        </div>
        <div className="flex justify-between border-t border-b py-4 text-center text-gray-500">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-800">5.0</p>
            <p className="text-sm">Value</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-800">5.0</p>
            <p className="text-sm">Flexibility</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-800">5.0</p>
            <p className="text-sm">Professionalism</p>
          </div>
        </div>
  
        {/* Reviews */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.974 2.887a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.887a1 1 0 00-1.175 0l-3.974 2.887c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.036 9.101c-.783-.57-.381-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
                </svg>
                <span className="text-sm text-gray-500">{review.timeAgo}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800">{review.rating}.0 Excellent</h3>
              <p className="text-sm text-gray-600 mt-1">
                {review.text} <a href="#" className="text-blue-500">Show More</a>
              </p>
              <div className="flex items-center mt-4 space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-8a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ReviewSection;
  