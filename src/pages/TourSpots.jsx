import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SectionTitle from "../components/sharedComponents/SectionTitle";
import axios from "axios";
import SpotCard from "../components/all-tourist-spots/SpotCard";
import { AuthContext } from "../providers/AuthProvider";
import { getPropertyIds, storePropertyId } from "../services/storeCartItems";
import PageSkeleton from "../components/sharedComponents/PageSkeleton";

const TourSpots = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { user, setCartNumber, setToastMsg } = useContext(AuthContext);

  const [pageLoading, setPageLoading] = useState(false);

  const [spotsArr, setSpotsArr] = useState([]);

  const navigate = useNavigate();

  // Get all the tourist spot from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/spots`);
        if (response.data) {
          setSpotsArr(response.data);
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
    if (!pageLoading) {
      setPageLoading(true);
      fetchData();
    }
  }, [user]);

  // handle the show property button
  const handleShowDetailsBtn = (id) => {
    navigate(`/spot-details/${id}`);
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    if (!user) {
      navigate("/login");
      return window.scrollTo(0, 0);
    }
    const result = getPropertyIds(user?.email);
    if (result.includes(id)) {
      return setToastMsg("Property already added to cart  !");
    } else {
      storePropertyId(user?.email, id);
      setCartNumber(result.length + 1);
      return setToastMsg("Property added succesfully  !");
    }
  };

  return (
    <>
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className="container mx-auto px-2 w-full overflow-hidden">
          <SectionTitle
            title="Popular Tourist Spot in Asia"
            subTitle="Asia is a continent brimming with diverse and breathtaking tourist destinations, vibrant cultures."
          />
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
    </>
  );
};

export default TourSpots;
