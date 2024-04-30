import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/sharedComponents/SectionTitle";

import SpotCard from "../components/all-tourist-spots/SpotCard";
import { AuthContext } from "../providers/AuthProvider";

import PageSkeleton from "../components/sharedComponents/PageSkeleton";
import {
  getCartIdsFromLST,
  storeCartIdsToLST,
} from "../services/storeCartItems";
import { goToTop } from "../services/goToTop";
import GoToTopBtn from "../components/sharedComponents/GoToTopBtn";

const TourSpots = () => {
  const {
    user,
    setCartNumber,
    setToastMsg,
    spotsArr,
    setSpotsArr,
    pageLoading,
    storeUserPreference,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // handle the show Tourist Spot button
  const handleShowDetailsBtn = (id) => {
    navigate(`/spot-details/${id}`);
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

  // handle the filter
  const handleFilterSpot = (filterOps) => {
    let newArr = [...spotsArr];

    if (filterOps === "cost") {
      newArr.sort(
        (a, b) =>
          parseInt(a.cost.replace(/\D/g, ""), 10) -
          parseInt(b.cost.replace(/\D/g, ""), 10)
      );
    } else if (filterOps === "popularity") {
      newArr.sort((a, b) => b.visitors_per_year - a.visitors_per_year);
    }

    setSpotsArr(newArr);
  };

  return (
    <>
      {goToTop()}
      <Helmet>
        <title>Tourist Spots | TourTango</title>
      </Helmet>
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className="md:container bg-base-100  mx-2 md:mx-auto px-2 w-full overflow-hidden">
          <SectionTitle
            title="Popular Tourist Spot in Asia"
            subTitle="Asia is a continent brimming with diverse and breathtaking tourist destinations, vibrant cultures."
          />
          {/* Sort Functionality */}
          <div className="flex justify-center text-center my-5">
            <ul className="menu w-fit">
              <li className=" ">
                <details className=" rounded-md text-gray-50 font-semibold ">
                  <summary className="px-16 md:px-10 bg-primary dark:hover:bg-green-600 hover:bg-blue-600 mb-1">
                    Sorted By
                  </summary>
                  <ul className="bg-gray-600  mx-auto  rounded-t-none rounded-b-lg py-2">
                    <li
                      className=" hover:border-b-2 rounded-lg hover:border-blue-500 dark:hover:hover:border-green-500 mr-2"
                      onClick={() => handleFilterSpot("all")}
                    >
                      <a>All</a>
                    </li>
                    <li
                      className=" hover:border-b-2 rounded-lg hover:border-blue-500 dark:hover:hover:border-green-500 mr-2"
                      onClick={() => handleFilterSpot("cost")}
                    >
                      <a>Average Cost</a>
                    </li>
                    <li
                      className=" hover:border-b-2 rounded-lg hover:border-blue-500 dark:hover:hover:border-green-500 mr-2"
                      onClick={() => handleFilterSpot("popularity")}
                    >
                      <a>Popularity</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="text-center bg-base-100 py-3 px-1 md:p-3 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:px-5 group">
              {spotsArr.map((spot) => (
                <SpotCard
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
      <GoToTopBtn />
    </>
  );
};

export default TourSpots;
