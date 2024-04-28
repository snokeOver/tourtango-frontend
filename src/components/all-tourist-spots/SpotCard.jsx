import { FaLocationDot } from "react-icons/fa6";
import { BsFillEyeFill, BsCart4 } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { IoAirplaneOutline } from "react-icons/io5";

const SpotCard = ({ spot, handleShowDetailsBtn, handleAddCartButton }) => {
  // Calculate Total price
  const formateTotalVisitors = (visitors) => {
    const formatedVisitors = visitors.toLocaleString("en-US");
    return formatedVisitors;
  };

  return (
    <div className="card card-compact w-auto bg-base-100 rounded-xl    border">
      <figure className="relative mb-3 ">
        <img
          className="w-full rounded-t-xl h-[17rem] group-hover:scale-[0.95] hover:!scale-100 duration-500"
          src={spot.imageUrl}
          alt={spot.imageUrl}
        />
        <h5 className="absolute  top-5 left-5 px-3 text-gray-100 font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
          {spot.country}
        </h5>
      </figure>

      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title font-bold flex-grow">{spot.spot}</h2>
          <h4 className="font-semibold text-lg  text-left">{spot.cost}</h4>
        </div>
        <div className="divider p-0 m-0"></div>

        <div className="grid grid-cols-3  py-3 text-message-color">
          <div className="flex flex-col items-center gap-2 text-center">
            <FaLocationDot className="text-lg" />
            <h3>{spot.location}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <RxAvatar className="text-lg" />
            <h3>{formateTotalVisitors(parseInt(spot.visitors_per_year))}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <IoAirplaneOutline className="text-lg" />
            <h3>{spot.travel_time}</h3>
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

export default SpotCard;
