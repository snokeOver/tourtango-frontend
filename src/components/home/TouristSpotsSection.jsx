import { useContext, useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import { AuthContext } from "../../providers/AuthProvider";
import SpotCard from "../all-tourist-spots/SpotCard";
import { Link, useNavigate } from "react-router-dom";
import {
  getCartIdsFromLST,
  storeCartIdsToLST,
} from "../../services/storeCartItems";
import PrimaryButton from "../sharedComponents/PrimaryButton";
import { goToTop } from "../../services/goToTop";

const TouristSpotsSection = () => {
  const { spotsArr, user, setCartNumber, setToastMsg, storeUserPreference } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [featuredSpots, setFeaturedSpots] = useState([]);

  // handle the show Tourist Spot button
  const handleShowDetailsBtn = (id) => {
    navigate(`/spot-details/${id}`);
    return goToTop();
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    if (!user) {
      navigate("/login");
      return goToTop();
    }
    const result = getCartIdsFromLST(user?.uid);
    if (result.includes(id)) {
      return setToastMsg("Tourist Spot already added to cart  !");
    } else {
      storeCartIdsToLST(user?.uid, id);
      setCartNumber(result.length + 1);
      storeUserPreference();
      return setToastMsg("Tourist Spot added succesfully  !");
    }
  };

  // Filter out the featured tourist spots from each country
  useEffect(() => {
    if (spotsArr) {
      const newFeaturedSpot = [];
      let countryCounts = {};
      spotsArr.forEach((spot) => {
        const country = spot.country;
        if (!countryCounts[country]) {
          countryCounts[country] = 0;
        }
        if (countryCounts[country] < 1) {
          newFeaturedSpot.push(spot);
          countryCounts[country]++;
        }
      });
      setFeaturedSpots(newFeaturedSpot);
    }
  }, [spotsArr]);

  return (
    <div className=" px-2 w-full bg-base-100 mb-10 pb-10 overflow-hidden">
      <div>
        <SectionTitle title="Featured Tourist Spots" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:px-5 group">
        {featuredSpots.map((spot) => (
          <SpotCard
            key={spot._id}
            spot={spot}
            handleShowDetailsBtn={handleShowDetailsBtn}
            handleAddCartButton={handleAddCartButton}
          />
        ))}
      </div>
      <div className="w-full mt-10">
        <Link
          to="/tour-spots"
          className="flex  justify-center w-full md:w-3/4 lg:w-[40%] mx-auto"
        >
          <PrimaryButton btnTitle="View All Tourist Spots" />
        </Link>
      </div>
    </div>
  );
};

export default TouristSpotsSection;
