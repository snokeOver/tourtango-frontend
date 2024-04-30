import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      {window.scrollTo(0, 0)}
      <Helmet>
        <title>Not Found | TourTango</title>
      </Helmet>
      <div className=" xl:my-20 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="hero py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="text-5xl font-bold "
              >
                <img src="https://i.ibb.co/cY9kysS/404.png" alt="" />
                <p className="playfair-font -mt-10">Not Found</p>
              </h1>
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                data-aos-easing="ease-in-sine"
                className="py-6"
              >
                The page your are looking for was not found!
              </p>

              <NavLink to="/">
                <button
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="1000"
                  data-aos-easing="ease-in-sine"
                  className="btn hover:from-pink-500 hover:to-indigo-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-200"
                >
                  Go Home
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
