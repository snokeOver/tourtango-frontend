import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PrimaryButton from "../components/sharedComponents/PrimaryButton";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Swal from "sweetalert2";

const AddSpot = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { user, setBtnLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    email: "",
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

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Set data from available user
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      }));
    }
  }, [user]);
  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      email: formData.email || "",
      travel_time: `${formData.travel_time} Days`,
      cost: `$${formData.cost}`,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setBtnLoading(true);
          const response = await axios.post(
            `${baseURL}/api/spots/add`,
            postData
          );
          if (response.data) {
            setBtnLoading(false);
            Swal.fire({
              title: "Saved!",
              text: "Your tourist spot has been saved.",
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

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: "",
      spot: "",
      country: "",
      location: "",
      description: "",
      cost: "",
      seasonality: "",
      travel_time: "",
      visitors_per_year: "",
    }));
  };

  return (
    <>
      <Helmet>
        <title>Add Spot | TourTango</title>
      </Helmet>
      <div className=" md:container bg-base-100 mx-2 md:mx-auto">
        <div className="bg-base-200 flex flex-col gap-5 mx-2 md:mx-10 py-10 px-5">
          <div>
            <h2 className="text-2xl md:text-3xl text-center font-semibold">
              Add New Spot
            </h2>
          </div>
          <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
            <form className="" onSubmit={handleFormSubmit}>
              {/* first row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full">
                {/* Image part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Image URL <span className="text-red-500">*</span>
                    </span>
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
                    <span className="label-text text-lg">
                      Country <span className="text-red-500">*</span>
                    </span>
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
                      Tourist Spot Name <span className="text-red-500">*</span>
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
                    <span className="label-text text-lg">
                      Location <span className="text-red-500">*</span>
                    </span>
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
                    <span className="label-text text-lg">
                      Seasonality <span className="text-red-500">*</span>
                    </span>
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
                <PrimaryButton btnTitle="Add Spot" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSpot;
