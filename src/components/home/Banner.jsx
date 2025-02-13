import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { IoIosSearch } from "react-icons/io";
// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { useTypewriter } from "react-simple-typewriter";
import CountUp from "react-countup";

const Banner = () => {
  const [images, setImages] = useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [text] = useTypewriter({
    words: [
      "Tourist Spot",
      "Destination",
      "Getaway",
      "Adventure",
      "Experience",
    ],
    loop: 0,
  });

  // Manage the search functionality
  const handleSearchButton = (e) => {
    e.preventDefault();
  };

  // Get the banner images urls from DB
  useEffect(() => {
    const fetchImagesUrl = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/spots/country`);
        if (response.data) {
          setImages(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchImagesUrl();
  }, []);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
  };

  return (
    <div className="pb-10 relative z-0 max-h-fit">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        effect={"fade"}
      >
        {images.map((image) => (
          <SwiperSlide key={image._id}>
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-30"></div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div className="absolute right-[5%] top-[8%]  z-10 flex flex-col gap-8 ">
        <div>
          <h2 className=" inline-block px-2 lg:px-4 py-1 text-gray-100 font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  text-center">
            <p className="text-sm md:text-xl lg:text-2xl text-gray-900 font-bold">
              <CountUp end={180} duration={4} />+
            </p>
            <p className="text-xs font-normal md:text-lg">Tourist spots</p>
          </h2>
        </div>
      </div>
      <div className="absolute left-[5%] top-[8%]  z-10 flex flex-col gap-8 ">
        <div>
          <h2 className=" inline-block px-2 lg:px-4 py-1 text-gray-100 bg-gray-400 font-semibold   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  text-center">
            <p className="text-sm md:text-xl lg:text-2xl text-gray-900 font-bold">
              <CountUp end={1500} duration={4} />+
            </p>
            <p className="text-xs font-normal md:text-lg">Happy Customers</p>
          </h2>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-8 lg:gap-16 w-[90%]">
        <div className="text-center">
          <h1 className=" text-xl md:text-4xl lg:text-6xl  text-gray-100">
            <span className="mr-2">Find Your Dream </span>
            <span className="font-bold">{text}</span>
          </h1>
        </div>
        <div className="w-[70%] lg:w-3/4 xl:w-1/2 mx-auto ">
          <form onSubmit={handleSearchButton}>
            <fieldset className="form-control w-full">
              <div className="join relative text-gray-200 text-xl font-semibold">
                <input
                  type="text"
                  placeholder="Search . . . "
                  className="input input-bordered join-item  w-full  bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  placeholder-gray-100"
                />
                <IoIosSearch className="absolute right-24 lg:right-28 top-4" />
                <button type="submit" className="btn btn-primary join-item">
                  Search
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
