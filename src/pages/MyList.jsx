import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../providers/AuthProvider";
import SingleList from "../components/my-list/SingleList";
import axios from "axios";
import Swal from "sweetalert2";
import PageSkeleton from "../components/sharedComponents/PageSkeleton";
import PrimaryButton from "../components/sharedComponents/PrimaryButton";
import { Link } from "react-router-dom";
import { goToTop } from "../services/goToTop";
import GoToTopBtn from "../components/sharedComponents/GoToTopBtn";

const MyList = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { user, setBtnLoading, currTheme } = useContext(AuthContext);
  const [loadedSpots, setLoadedSpot] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    imageUrl: "",
    spot: "",
    country: "",
    location: "",
    description: "",
    cost: "",
    seasonality: "",
    travel_time: "",
    visitors_per_year: "",
  });

  // Get the Spots that this user added
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/spots/${user.uid}`);
        if (response.data) {
          setLoadedSpot(response.data);
          setPageLoading(false);
          setPageUpdate(false);
        } else {
          console.log(response.data);
          setPageLoading(false);
          setPageUpdate(false);
        }
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
        setPageUpdate(false);
      }
    };
    if (user) {
      setPageLoading(true);
      fetchData();
    }
  }, [user, pageUpdate]);

  // Handle the update spot
  const handleDeleteSpot = (id) => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setBtnLoading(true);
          const response = await axios.delete(`${baseURL}/api/spot/${id}`);
          if (response.data) {
            setPageUpdate(true);
            setBtnLoading(false);
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Deleted!",
              text: "Your tourist spot has been Deleted.",
              icon: "success",
            });
          } else {
            setBtnLoading(false);
            console.log(response.data);
          }
        } catch (err) {
          setBtnLoading(false);
          console.log(err.response);
        }
      }
    });
  };

  // Handle the update spot
  const handleUpdateSpot = (singleSpot) => {
    setBtnDisabled(true);
    const travelTimeNumeric = parseInt(singleSpot.travel_time.match(/\d+/)[0]);

    const costNumeric = parseInt(singleSpot.cost.replace(/\D/g, ""), 10);

    setFormData((prevData) => ({
      ...prevData,
      id: singleSpot._id,
      imageUrl: singleSpot.imageUrl,
      travel_time: travelTimeNumeric,
      spot: singleSpot.spot,
      country: singleSpot.country,
      location: singleSpot.location,
      description: singleSpot.description,
      seasonality: singleSpot.seasonality,
      visitors_per_year: singleSpot.visitors_per_year,
      cost: costNumeric,
    }));
    document.getElementById("spot_update_modal").showModal();
  };

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBtnDisabled(false);
  };

  // Handle the update button from Modal
  const handleUpdateFromModal = (e) => {
    e.preventDefault();
    const { id, ...postData } = formData;
    postData.travel_time = `${formData.travel_time} Days`;
    postData.cost = `$${formData.cost}`;

    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      target: document.getElementById("form-modal"),
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setBtnLoading(true);
        try {
          const response = await axios.patch(
            `${baseURL}/api/spot/${formData.id}`,
            postData
          );
          if (response.data) {
            setPageUpdate(true);
            setBtnLoading(false);
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Updated!",
              text: "Your tourist spot has been Updated.",
              icon: "success",
            });
          } else {
            console.log(response.data);
            setBtnLoading(false);
          }
        } catch (err) {
          console.log(err.response);
          setBtnLoading(false);
        }
      }
    });
  };

  return (
    <>
      {goToTop()}
      <Helmet>
        <title>My List | TourTango</title>
      </Helmet>
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className=" md:container bg-base-100 mx-2 md:mx-auto">
          {/* testing */}
          <div className="hero py-10 rounded-lg bg-base-200">
            <div className="hero-content text-center flex-col">
              <div className="text-center">
                <h1 className="text-4xl font-bold">
                  {loadedSpots.length > 0
                    ? "All The Spots You Added"
                    : "You didn't add any Spot yet!"}
                </h1>
              </div>
              <div className="max-w-[20.9rem] xs:max-w-[23rem] md:max-w-2xl lg:max-w-3xl">
                {loadedSpots.length > 0 && (
                  <div className="card w-full  shadow-2xl bg-base-100">
                    {/* Table for cart */}
                    <div className="overflow-x-auto py-7 ">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr className="text-center">
                            <th></th>
                            <th>Country</th>
                            <th>Spot</th>
                            <th>Cost</th>
                            <th colSpan="2">Actions</th>
                          </tr>
                          <tr>
                            <th colSpan="6">
                              <div className="divider -my-3"></div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {loadedSpots.map((sEstate, index) => (
                            <SingleList
                              index={index}
                              key={sEstate._id}
                              sSpot={sEstate}
                              handleDeleteSpot={handleDeleteSpot}
                              handleUpdateSpot={handleUpdateSpot}
                            />
                          ))}
                          <tr>
                            <th colSpan="6">
                              <div className="divider -my-3"></div>
                            </th>
                          </tr>

                          <tr>
                            <th className="text-center text-lg" colSpan="6">
                              <span className="mr-3">To add more spot</span>
                              <span className="inline-block">
                                <Link to="/add-spot">
                                  <PrimaryButton btnTitle="Click Here" />
                                </Link>
                              </span>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* modal to update spot */}
          <dialog id="spot_update_modal" className="modal">
            <div id="form-modal" className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <h2 className="text-2xl text-center font-semibold mb-5">
                  Update This Spot
                </h2>
              </div>
              <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
                <form className="" onSubmit={handleUpdateFromModal}>
                  {/* first row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full">
                    {/* Image part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Image URL</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          required
                          type="text"
                          name="imageUrl"
                          placeholder="Image URL"
                          value={formData.imageUrl || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>

                    {/* Country part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Country</span>
                      </label>
                      <select
                        required
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                      >
                        <option disabled value="">
                          Select a country
                        </option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Cambodia">Cambodia</option>
                      </select>
                    </div>
                  </div>

                  {/* second row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                    {/* Tourist spot part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">
                          Tourist Spot Name{" "}
                        </span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          required
                          type="text"
                          name="spot"
                          placeholder="Spot Name"
                          value={formData.spot || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>

                    {/* Location part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Location</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          required
                          type="text"
                          name="location"
                          placeholder="Location"
                          value={formData.location || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Third row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                    {/* Seasonality part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Seasonality</span>
                      </label>
                      <select
                        required
                        name="seasonality"
                        value={formData.seasonality || ""}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                      >
                        <option disabled value="">
                          Select a Seasonality
                        </option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Year Around">Year Around</option>
                      </select>
                    </div>
                    {/* Average cost part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">Average Cost</span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          type="number"
                          name="cost"
                          placeholder="Average Cost"
                          value={formData.cost || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fourth row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                    {/* Travel Time part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">
                          Travel Time (Days)
                        </span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          type="number"
                          name="travel_time"
                          placeholder="Travel Time"
                          value={formData.travel_time || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>

                    {/* Total Visitors Per Year part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">
                          Total Visitors Per Year
                        </span>
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          type="number"
                          name="visitors_per_year"
                          placeholder="Visitors/Year"
                          value={formData.visitors_per_year || ""}
                          className="grow placeholder-gray-400 text-sm"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fifth row */}
                  <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                    {/* Short Description part */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg">
                          Short Description
                        </span>
                      </label>
                      <textarea
                        name="description"
                        rows={6}
                        value={formData.description || ""}
                        onChange={handleChange}
                        placeholder="Write relevant description here . . . "
                        className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control mt-6 md:w-1/2 mx-auto">
                    <PrimaryButton
                      disabledStat={btnDisabled}
                      btnTitle="Update This Spot"
                    />
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
      <GoToTopBtn />
    </>
  );
};

export default MyList;
