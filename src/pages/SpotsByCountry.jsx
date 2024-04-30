import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SectionTitle from "../components/sharedComponents/SectionTitle";

import { AuthContext } from "../providers/AuthProvider";

import PageSkeleton from "../components/sharedComponents/PageSkeleton";
import {
  getCartIdsFromLST,
  storeCartIdsToLST,
} from "../services/storeCartItems";
import SpotCardForCountry from "../components/tourist-spots-by-countries/SpotCardForCountry";

const SpotsByCountry = () => {
  const { country } = useParams();
  const {
    user,
    setCartNumber,
    setToastMsg,
    spotsArr,
    pageLoading,
    storeUserPreference,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [newSpotArr, setNewSpotArr] = useState([]);

  // filer out the spot array based on the country name
  useEffect(() => {
    const capitalizedCountry =
      country.charAt(0).toUpperCase() + country.slice(1);
    console.log(capitalizedCountry);
    const newArr = spotsArr.filter(
      (spot) => spot.country === capitalizedCountry
    );
    setNewSpotArr(newArr);
  }, [spotsArr]);

  // handle the show Tourist Spot button
  const handleShowDetailsBtn = (id) => {
    navigate(`/spot-details/${id}`);
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    if (!user) {
      navigate("/login");
      return window.scrollTo(0, 0);
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

  return (
    <>
      {window.scrollTo(0, 0)}
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className="md:container bg-base-100 mx-2 md:mx-auto px-2 w-full overflow-hidden">
          <SectionTitle
            title={`Popular Tourist Spots in ${country}`}
            subTitle={`${country} is a country brimming with diverse and breathtaking tourist destinations, vibrant cultures.`}
          />

          <div className="text-center bg-base-100 py-3 px-1 md:p-3 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:px-5 group">
              {newSpotArr.map((spot) => (
                <SpotCardForCountry
                  key={spot._id}
                  spot={spot}
                  handleShowDetailsBtn={handleShowDetailsBtn}
                  handleAddCartButton={handleAddCartButton}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotsByCountry;
