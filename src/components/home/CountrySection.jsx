import { useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import axios from "axios";
import CountryCard from "./CountryCard";
import { useNavigate } from "react-router-dom";

const CountrySection = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [countres, setCountries] = useState([]);
  const navigate = useNavigate();

  // Fetch all the country information from DB
  useEffect(() => {
    const fetchImagesUrl = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/spots/country`);
        if (response.data) {
          setCountries(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchImagesUrl();
  }, []);

  //  handle the Country Card Button to redirect to the tour spots cards regarding to the country.
  const handleCountryCardBtn = (countryName) => {
    console.log(countryName);
    navigate(`/spots-by-country/${countryName}`);
  };

  return (
    <div className=" px-2 w-full bg-base-100 mb-10 pb-10 overflow-hidden">
      <div>
        <SectionTitle title="Countries For Tourist Spots" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:px-5 group mt-2 md:mt-10">
        {countres.map((country) => (
          <CountryCard
            key={country._id}
            country={country}
            handleCountryCardBtn={handleCountryCardBtn}
          />
        ))}
      </div>
    </div>
  );
};

export default CountrySection;
