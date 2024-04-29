import { useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import axios from "axios";
import HowWeHelpCard from "./HowWeHelpCard";

const HowWeHelpSection = () => {
  const [reasons, setReasons] = useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;

  // Get the reasons ho-we-help-you from DB
  useEffect(() => {
    const fetchImagesUrl = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/how-we-help`);
        if (response.data) {
          setReasons(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchImagesUrl();
  }, []);

  return (
    <div className=" px-2  w-full bg-base-100 mt-10 pb-10 overflow-hidden">
      <div>
        <h3 className="mt-8 ml-5 text-lg text-center md:text-left">
          <span>Find, </span>
          <span className="text-primary font-semibold">Book </span>
          <span className="text-sm">and </span> Go !
        </h3>
        <SectionTitle title="How We Can Help Your Journey" />
      </div>

      <div className="text-center py-3 px-1 md:p-3 md:py-14 md:container md:mx-auto">
        {
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reasons.map((reason) => (
              <HowWeHelpCard key={reason._id} reason={reason} />
            ))}
          </div>
        }
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:container md:mx-auto">
        <div className="relative">
          <div>
            <img
              src="https://i.ibb.co/H49cKMH/dis-1.jpg"
              className="max-h-80 rounded-md"
              alt=""
            />
          </div>
          <div className="absolute  top-16 left-10">
            <h2 className=" text-gray-100 text-5xl font-bold">30% Off</h2>
            <h4 className=" text-gray-100 text-lg">Now live: super hotel</h4>
          </div>
        </div>
        <div className="relative">
          <div>
            <img
              src="https://i.ibb.co/M9T00vR/dis-2.jpg"
              className="max-h-80 rounded-md"
              alt=""
            />
          </div>
          <div className="absolute  top-16 left-10">
            <h2 className=" text-gray-100 text-2xl font-bold">
              Experience more <br /> when you travel
            </h2>
            <h2 className=" mt-2 text-gray-100 text-5xl font-bold">15% Off</h2>
            <h4 className=" text-gray-100 text-lg">Now live: super hotel</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeHelpSection;
