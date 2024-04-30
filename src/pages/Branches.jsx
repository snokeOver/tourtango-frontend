import { Helmet } from "react-helmet-async";

import CustomMap from "../components/sharedComponents/CustomMap";
import OfficeLocations from "../components/officeLocations/OfficeLocations";
import { goToTop } from "../services/goToTop";
import GoToTopBtn from "../components/sharedComponents/GoToTopBtn";

const Branches = () => {
  return (
    <>
      {goToTop()}
      <Helmet>
        <title> Branches | TourTango</title>
      </Helmet>
      <div className=" md:container bg-base-100 mx-2 md:mx-auto px-2 md:px-5  overflow-hidden pb-10">
        <div className="my-10">
          <h3 className="text-3xl font-semibold mb-5 my-10">Office Location</h3>
        </div>
        <div className="card  bg-base-200 shadow-xl grid grid-cols-1 xl:grid-cols-5 ">
          <div className="xl:col-span-2">
            <OfficeLocations />
          </div>
          <div className=" xl:col-span-3 bg-base-200 border my-3 shadow-xl mx-3 min-h-96 grid items-center rounded-xl">
            <CustomMap />
          </div>
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Branches;
