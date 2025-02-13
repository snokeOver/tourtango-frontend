import { FaLocationDot } from "react-icons/fa6";
import { BsFillEyeFill, BsCart4 } from "react-icons/bs";

import { TfiMoney } from "react-icons/tfi";
import { TiWeatherPartlySunny } from "react-icons/ti";

const SpotCardForCountry = ({
  spot,
  handleShowDetailsBtn,
  handleAddCartButton,
}) => {
  // Calculate Total price
  const formateTotalVisitors = (visitors) => {
    const formatedVisitors = visitors.toLocaleString("en-US");
    return formatedVisitors;
  };

  return (
    <div className="card card-compact w-auto bg-base-100 rounded-xl    border">
      <figure className="relative mb-3 ">
        <img
          className="w-full rounded-t-xl h-[17rem]  hover:!scale-110 duration-500"
          src={spot.imageUrl}
          alt={spot.imageUrl}
        />
        <h5 className="absolute  top-5 right-5 px-3 text-gray-100 font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-300 hover:text-gray-800">
          {spot.country}
        </h5>
      </figure>

      <div className="card-body">
        <div className="text-left flex gap-5 flex-col flex-grow">
          <h2 className="text-2xl text-primary  font-bold ">{spot.spot}</h2>
          <h2 className="">
            <span className="text-2xl font-semibold">Short Description: </span>
            <p className="text-justify">
              {spot.description.split(" ").slice(0, 25).join(" ")} . . .{" "}
              <span className="inline-block">
                <button
                  onClick={() => handleShowDetailsBtn(spot._id)}
                  className="bg-primary px-3 rounded-lg text-gray-100"
                >
                  Show Details
                </button>
              </span>
            </p>
          </h2>
        </div>
        <div className="divider p-0 m-0"></div>

        <div className="grid grid-cols-3 flex-grow  py-3 text-message-color">
          <div className="flex flex-col items-center gap-2 text-center  justify-center">
            <FaLocationDot className="text-2xl" />
            <h3>{spot.location}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center  justify-center">
            <TiWeatherPartlySunny className="text-3xl" />
            <h3>{spot.seasonality}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center  justify-center">
            <TfiMoney className="text-2xl" />
            <h3>{spot.cost}</h3>
          </div>
        </div>
        <div className="pt-3 flex gap-4">
          <button
            onClick={() => handleShowDetailsBtn(spot._id)}
            className="btn btn-primary btn-outline flex-1   py-3 mb-3  rounded-md"
          >
            <BsFillEyeFill className="text-xl" />
            View Details
          </button>
          <button
            onClick={() => handleAddCartButton(spot._id)}
            className="btn btn-secondary btn-outline flex-1   py-3 mb-3  rounded-md"
          >
            <BsCart4 className=" text-xl" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotCardForCountry;
