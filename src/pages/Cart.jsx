import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import {
  deleteCartIdsFromLST,
  getCartIdsFromLST,
} from "../services/storeCartItems";
import SingleCartItem from "../components/cart/SingleCartItem";

const Cart = () => {
  const { user, setCartNumber, spotsArr, storeUserPreference } =
    useContext(AuthContext);
  const [selectedSpot, setselectedSpot] = useState([]);
  const [deleteCall, setDeleteCall] = useState(true);
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
        setDeleteCall(true);
        storeUserPreference();
        Swal.fire({
          title: "Deleted!",
          text: "Cart item deleted succesfully  !",
          icon: "success",
        });
      }
    });
  };

  //   get the stored Cart ids
  useEffect(() => {
    if (deleteCall) {
      const currPropIds = getCartIdsFromLST(user?.uid);
      setCartNumber(currPropIds.length);
      const newSpots = spotsArr.filter((spot) =>
        currPropIds.includes(spot._id)
      );
      setselectedSpot(newSpots);
      setDeleteCall(false);
    }
  }, [deleteCall]);

  useEffect(() => {
    calculateTotalCost();
  }, [selectedSpot]);

  return (
    <>
      <Helmet>
        <title> Cart | TourTango</title>
      </Helmet>
      <div className=" container bg-base-100 px-3 md:px-5 mx-auto ">
        {/* testing */}
        <div className="hero   py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center flex-col">
            <div className="text-center">
              <h1
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="text-4xl font-bold"
              >
                {selectedSpot.length > 0
                  ? "Your Cart Details"
                  : "You didn't select any Tour Spot yet!"}
              </h1>
            </div>
            <div className="max-w-[21rem] md:max-w-2xl lg:max-w-3xl">
              {selectedSpot.length > 0 && (
                <div
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-sine"
                  className="card w-full  shadow-2xl bg-base-100"
                >
                  {/* Table for cart */}
                  <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="900"
                    data-aos-easing="ease-in-sine"
                    className="overflow-x-auto py-7 "
                  >
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Tour Spot</th>
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
    </>
  );
};

export default Cart;
