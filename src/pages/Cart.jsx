import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import {
  deleteCartIdsFromLST,
  getCartIdsFromLST,
} from "../services/storeCartItems";
import SingleCartItem from "../components/cart/SingleCartItem";
import { goToTop } from "../services/goToTop";
import GoToTopBtn from "../components/sharedComponents/GoToTopBtn";

const Cart = () => {
  const {
    user,
    cartNumber,
    setCartNumber,
    spotsArr,
    storeUserPreference,
    currTheme,
  } = useContext(AuthContext);
  const [selectedSpot, setselectedSpot] = useState([]);
  const [totalCost, setTotalCost] = useState("");

  // Calculate Total Cost
  const calculateTotalCost = () => {
    let totalCost = 0;
    for (let spot of selectedSpot) {
      const cost = parseFloat(spot.cost.replace(/[^0-9.-]+/g, ""));
      totalCost += cost;
    }
    const formattedTotalCost = totalCost.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    setTotalCost(formattedTotalCost);
  };

  //  handle the delete button and delete the ids from the local storage
  const handleDeleteSpot = (id) => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteCartIdsFromLST(user?.uid, id);
        const currSpotIds = getCartIdsFromLST(user?.uid);
        setCartNumber(currSpotIds.length);
        storeUserPreference();
        Swal.fire({
          background: currTheme === "dark" ? "#1f2937 " : "",
          title: "Deleted!",
          text: "Cart item deleted succesfully  !",
          icon: "success",
        });
      }
    });
  };

  //   Update selected spots
  useEffect(() => {
    const currSpotIds = getCartIdsFromLST(user?.uid);
    const newSpots = spotsArr.filter((spot) => currSpotIds.includes(spot._id));
    setselectedSpot(newSpots);
  }, [cartNumber]);

  useEffect(() => {
    calculateTotalCost();
  }, [selectedSpot]);

  return (
    <>
      {goToTop()}
      <Helmet>
        <title> Cart | TourTango</title>
      </Helmet>
      <div className=" md:container bg-base-100 mx-2 md:mx-auto ">
        {/* testing */}
        <div className="hero py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center flex-col">
            <div className="text-center">
              <h1 className="text-4xl font-bold">
                {selectedSpot.length > 0
                  ? "Your Cart Details"
                  : "You didn't select any Tourist Spot yet!"}
              </h1>
            </div>
            <div className="max-w-[20.9rem] xs:max-w-[23rem] md:max-w-2xl lg:max-w-3xl">
              {selectedSpot.length > 0 && (
                <div className="card w-full  shadow-2xl bg-base-100">
                  {/* Table for cart */}
                  <div className="overflow-x-auto py-7 ">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Tourist Spot</th>
                          <th>Travel Time</th>
                          <th>Cost</th>
                        </tr>
                        <tr>
                          <th colSpan="5">
                            <div className="divider -my-3"></div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedSpot.map((singleSpot, index) => (
                          <SingleCartItem
                            index={index}
                            key={singleSpot._id}
                            singleSpot={singleSpot}
                            handleDeleteSpot={handleDeleteSpot}
                          />
                        ))}
                        <tr>
                          <th colSpan="5">
                            <div className="divider -my-3"></div>
                          </th>
                        </tr>
                        <tr>
                          <th className="text-right" colSpan={3}>
                            Total Cost =
                          </th>
                          <th>{totalCost}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Cart;
