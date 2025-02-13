import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SocialLinks from "../sharedComponents/SocialLinks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../providers/AuthProvider";
import SiteLogo from "../sharedComponents/SiteLogo";
import { FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  const { toastMsg, setToastMsg, currTheme } = useContext(AuthContext);
  useEffect(() => {
    if (toastMsg) {
      toast(toastMsg, {
        position: "bottom-center",
      });
    }
    setToastMsg("");
  }, [toastMsg]);
  return (
    <footer className=" p-10 bg-blue-100 dark:bg-base-100 text-base-content rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3.5rem] border-t-2 border-blue-500 dark:border-pink-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 ">
        <div className="footer  flex md:justify-center">
          <nav>
            <h6 className="footer-title">Services</h6>
            <NavLink className="link link-hover" to="#">
              Tour Location
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Tour Guid
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Tour Booking
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Customer Services
            </NavLink>
          </nav>
        </div>
        <div className="footer flex md:justify-center">
          <nav>
            <h6 className="footer-title">Company</h6>

            <NavLink className="link link-hover" to="/about">
              About Us
            </NavLink>
            <NavLink className="link link-hover" to="/contact">
              Contact
            </NavLink>
            <NavLink className="link link-hover" to="/branches">
              Our Branches
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Terms of use
            </NavLink>
          </nav>
        </div>
        <div className="footer flex md:justify-center">
          <nav>
            <h6 className="footer-title">Quick Links</h6>

            <NavLink className="link link-hover" to="#">
              My Account
            </NavLink>
            <NavLink className="link link-hover" to="/my-list">
              My List
            </NavLink>
            <NavLink className="link link-hover" to="/cart">
              Cart
            </NavLink>
            <NavLink className="link link-hover" to="#">
              Promotions
            </NavLink>
          </nav>
        </div>
        <div className="footer flex md:justify-center">
          <nav>
            <h6 className="footer-title">Newsletter</h6>
            <a className=" ">Save up to 50% on tours!</a>
            <div className="relative">
              <input
                name="email"
                type="text"
                placeholder="Email . . . "
                className="input  input-bordered  input-md w-full max-w-xs "
              />
              <FaLocationArrow className=" cursor-pointer text-lg absolute text-primary right-5 bottom-4 sm:right-20 md:right-5 " />
            </div>
          </nav>
        </div>
      </div>
      <div className="divider py-10"></div>
      {/* Last part */}
      <div className="footer footer-center ">
        <div className="flex flex-col-reverse md:flex-row gap-10 justify-between  w-full">
          {/* Copy Write part */}
          <aside className="text-xs">
            <p>© TourTango - {new Date().getFullYear()} - All right reserved</p>
          </aside>
          {/* Address part */}
          <aside>
            <div className="footer flex md:justify-center">
              <nav>
                <a className=" cursor-pointer  flex items-center gap-2">
                  <FaLocationDot className="text-primary" />
                  <span className="hover:text-primary text-left">
                    123 Main Street, <br /> New York City, New York, USA
                  </span>
                </a>
                <a className=" cursor-pointer  flex items-center gap-2">
                  <FaPhoneAlt className="text-primary" />
                  <span className="hover:text-primary">+(880) 15171-66682</span>
                </a>
                <a className=" cursor-pointer  flex items-center gap-2">
                  <MdEmail className="text-primary" />
                  <span className="hover:text-primary">
                    snokeover@gmail.com
                  </span>
                </a>
              </nav>
            </div>
          </aside>
          {/* Logo and social icond part */}
          <aside>
            <div className="mb-3">
              <Link to="/" className="text-3xl font-semibold font-rubik">
                <SiteLogo />
              </Link>
            </div>
            <div>
              <SocialLinks />
            </div>
          </aside>
        </div>
      </div>
      <ToastContainer theme={currTheme} autoClose={2600} />
    </footer>
  );
};

export default Footer;
