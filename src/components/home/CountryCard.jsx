import { FaLocationDot } from "react-icons/fa6";
const CountryCard = ({ country, handleCountryCardBtn }) => {
  return (
    <button
      onClick={() => handleCountryCardBtn(country.country_name)}
      className="card card-compact w-auto bg-base-100 rounded-xl border hover:!scale-105 duration-500"
    >
      <figure className="relative mb-3 ">
        <img
          className="w-full rounded-t-xl h-[17rem]  "
          src={country.image_url}
          alt={country.country_name}
        />
        <h5 className="absolute  top-5 right-5 px-3 text-gray-100 font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-300 hover:text-gray-800 flex items-center justify-center">
          <span>
            <FaLocationDot />
          </span>
          <span className="ml-1">{country.country_name}</span>
        </h5>
      </figure>

      <div className="card-body">
        <div className="flex justify-between">
          <h4 className="text-justify font-normal  flex-grow">
            {country.short_description}
          </h4>
        </div>
      </div>
    </button>
  );
};

export default CountryCard;
