import Link from "next/link";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
export default function Footer() {
    return (
        <footer className="bg-[#0E1F41] pt-8">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="mb-10 md:mb-0">
                        <Link href="/ " to="#home" smooth className="flex items-center mb-10">
                            <img
                                src="https://res.cloudinary.com/hritiksarraf/image/upload/v1728397187/logo-dark_tsro8u.jpg"
                                width={150}
                                height={50}
                                alt="fotodukaan logo"
                            />
                        </Link>
                        <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="text-sm flex mt-4 justify-end sm:mt-0 text-gray-200 flex-col ">
                            <p className="text-lg text-white font-normal h  lg:mt- w[screen] lg:pr-16 font- lg:w-[35vw]"><span className="text-blue-400">At Foto Dukan </span> we believe that every memories are unique and deserves a celebration that reflects its distinct charm.

                                The top-rated Photography services.</p>

                        </div>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibol uppercase text-white">
                                Quick Links
                            </h2>
                            <ul className="text-white font-medium">
                                <li className="mb-4">
                                    <Link href="#home" smooth className="hover:underline hover:text-blue-800">
                                        HOME
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#products" smooth className="hover:underline hover:text-blue-800">
                                        PRODUCT
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#testimonials" smooth className="hover:underline pt-4 hover:text-blue-800">
                                        TESTIMONIALS
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#about" smooth className="hover:underline hover:text-blue-800">
                                        ABOUT US
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                                Follow us
                            </h2>
                            <ul className="text-gray-400  font-medium">
                                <li className="mb-4 flex items-center">

                                    <a href="https://www.instagram.com/fotodukaan?utm_source=qr&igsh=MW9teGpocXNlY2NyNQ%3D%3D" target="_blank" className="hover:underline text-lg  flex items-center -mx-2 hover:text-red-600 ">
                                        <div className="inline mr-2 pb-2">
                                            <InstagramIcon className="text-2xl mx" />
                                        </div>
                                        <span className="mb-2 ">
                                            Instagram
                                        </span>
                                    </a>
                                </li>
                                <li className="mb-4 flex items-center">

                                    <a href="https://www.facebook.com/fotodukaan/" target="_blank" className="hover:underline text-lg  flex items-center -mx-2 hover:text-red-600 ">
                                        <div className="inline mr-2 pb-2">
                                            <FacebookIcon className="text-2xl mx" />
                                        </div>
                                        <span className="mb-2 ">
                                            Facebook
                                        </span>
                                    </a>
                                </li>
                                <li className="mb-4 flex items-center">

                                    <a href="#" target="_blank" className="hover:underline text-lg  flex items-center -mx-2 hover:text-red-600 ">
                                        <div className="inline mr-2 pb-2">
                                            <YouTubeIcon className="text-2xl mx" />
                                        </div>
                                        <span className="mb-2 ">
                                            YouTube
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                                Contact us
                            </h2>
                            <ul className="text-gray-400  font-medium">
                                <li className="mb-4">
                                    <p className="hover:underline text-green-400">
                                        info@fotodukaan.com
                                    </p>
                                </li>
                                <li className="flex items-center  ">
                                    <WhatsAppIcon />
                                    <p className="hover:underline mx-2">

                                        +917258866055
                                    </p>
                                </li>
                                <li>
                                    <p className="hover:underline pt-2">
                                        154,1st Floor,Maharaja Kameshwar Complex Fraser Road Patna-800001


                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="my-6 h-[2px] bg-gradient-to-r from-blue-500 to-blue-600 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-200 sm:text-center text-center m-auto ">
                        Made with ❤️ by Dev'n'Des


                    </span>
                </div>
            </div>
        </footer>
    );
}
