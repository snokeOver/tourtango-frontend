import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import PageSkeleton from "../components/sharedComponents/PageSkeleton";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import {
  getCartIdsFromLST,
  storeCartIdsToLST,
} from "../services/storeCartItems";
import { goToTop } from "../services/goToTop";
import GoToTopBtn from "../components/sharedComponents/GoToTopBtn";

const SpotDetails = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { user, setCartNumber, setToastMsg, storeUserPreference } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [spotToShow, setSpotToShow] = useState({});
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);

  // Get the Spots that this user added
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/spot/${id}`);
        if (response.data) {
          setSpotToShow(response.data);
          setPageLoading(false);
        } else {
          console.log(response.data);
          setPageLoading(false);
        }
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };
    if (user) {
      setPageLoading(true);
      fetchData();
    }
  }, [user]);

  // Calculate Total price
  const formateTotalVisitors = (visitors) => {
    const formatedVisitors = visitors.toLocaleString("en-US");
    return formatedVisitors;
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    if (!user) {
      navigate("/login");
      return goToTop();
    }
    const result = getCartIdsFromLST(user?.uid);
    if (result.includes(id)) {
      return setToastMsg("Tourist Spot Already Added To Cart  !");
    } else {
      storeCartIdsToLST(user?.uid, id);
      setCartNumber(result.length + 1);
      storeUserPreference();
      return setToastMsg("Tourist Spot added succesfully  !");
    }
  };

  return (
    <>
      <Helmet>
        <title>Spot Details | TourTango</title>
      </Helmet>
      <div className="md:container mx-2 bg-base-100 md:mx-auto">
        <div className="card card-compact w-full  px-4 py-4">
          {pageLoading ? (
            <div>
              <PageSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:p-8">
              <figure className="w-full mx-auto rounded-xl ">
                <img
                  className="h-full py-4 "
                  src={spotToShow.imageUrl}
                  alt={spotToShow.imageUrl}
                />
              </figure>
              <div className="card-body text-left w-full">
                <div className="flex justify-between">
                  <h2 className="card-title text-2xl md:text-4xl font-bold text-heading-color playfair-font">
                    {spotToShow.spot}
                  </h2>
                  <div>
                    <h5 className=" px-4 py-1 bg-primary text-gray-100 font-semibold rounded-xl inline-block">
                      {spotToShow.country}
                    </h5>
                  </div>
                </div>

                <div className=" font-mediumpy-5 mt-3 text-message-color">
                  <h4 className="text-lg text-left">
                    <span className="font-extrabold text-lg mr-2">
                      Average Cost:
                    </span>{" "}
                    {spotToShow.cost}
                  </h4>
                </div>

                <div className="my-2">
                  <span className="font-extrabold text-lg mr-2">
                    Description:
                  </span>
                  <br />
                  <p className="text-justify">{spotToShow.description}</p>
                </div>
                <div className="my-2">
                  <div>
                    <span className="font-extrabold text-lg mr-2">
                      Seasonality:
                      <span className="text-base font-normal ml-3">
                        {spotToShow.seasonality}
                      </span>
                    </span>
                  </div>
                </div>

                {/* <div className="bg-red-500">
                <p className="bg-green-500 inline-block">#living-room</p>
              </div> */}
                <div className="divider mb-0"></div>
                <div className="flex flex-col gap-3 font-medium  pt-5 text-message-color">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <FaLocationDot className="text-lg" />
                      <h3 className="text-message-color">Location:</h3>
                    </div>
                    <span className="font-bold">{spotToShow.location}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <IoAirplaneOutline className="text-lg" />
                      <h3 className="text-message-color">Travel Time:</h3>
                    </div>
                    <span className="font-bold">{spotToShow.travel_time}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <RxAvatar className="text-lg" />
                      <h3 className="text-message-color">Visitors Per Year:</h3>
                    </div>
                    <span className="font-bold">
                      {formateTotalVisitors(
                        parseInt(spotToShow.visitors_per_year)
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-10 w-[90%] mx-auto mt-8">
                  <button
                    onClick={() => handleAddCartButton(spotToShow._id)}
                    className="btn  hover:from-pink-500 hover:to-indigo-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3  border-none text-gray-200 flex-1   py-3 mb-3  rounded-md"
                  >
                    <BsCart4 className=" text-xl" />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default SpotDetails;
