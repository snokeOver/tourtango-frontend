import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import RingLoading from "../sharedComponents/RingLoading";
import { AuthContext } from "../../providers/AuthProvider";
import SiteLogo from "../sharedComponents/SiteLogo";
import axios from "axios";
import { deleteCurrTheme, getCurrentTheme } from "../../services/themeStorage";
import {
  deleteAllCartIdsFromLST,
  getCartIdsFromLST,
} from "../../services/storeCartItems";
import Swal from "sweetalert2";

const NavBar = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const {
    loading,
    user,
    setUser,
    logOut,
    cartNumber,
    setCartNumber,
    setLogOutSuccess,
    pageLoading,
    currTheme,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  // Handle log out button
  const handleLogOut = async () => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Me Out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Save the user preferences like theme-mood, cart items into MongoDb
        const postData = {
          uid: user.uid,
          theme: getCurrentTheme(),
          cartIds: getCartIdsFromLST(user?.uid),
        };
        try {
          const response = await axios.post(
            `${baseURL}/api/user-preference`,
            postData
          );
          if (response.data) {
            deleteAllCartIdsFromLST(user?.uid);
            setCartNumber(0);
            deleteCurrTheme();

            // Perform the log out sequence
            logOut()
              .then((result) => {
                setUser(null);
                setLogOutSuccess(true);
                setCartNumber(0);
                navigate("/login");
              })
              .catch((err) => console.log(err.message));
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.log(err.response);
        }
      }
    });
  };

  // define the navlinks
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-yellow-400 border-b border-yellow-400"
                : "hover:text-yellow-400 "
            } mr-1`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <details>
          <summary>Company</summary>
          <ul className="p-2">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-yellow-400 border-b border-yellow-400"
                      : "hover:text-yellow-400 "
                  } mr-1`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-yellow-400 border-b border-yellow-400"
                      : "hover:text-yellow-400 "
                  } mr-1`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/branches"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-yellow-400 border-b border-yellow-400"
                      : "hover:text-yellow-400 "
                  } mr-1`
                }
              >
                Branches
              </NavLink>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <NavLink
          to="/tour-spots"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-yellow-400 border-b border-yellow-400"
                : "hover:text-yellow-400 "
            } mr-1`
          }
        >
          Tour Spots
        </NavLink>
      </li>

      {loading || pageLoading ? (
        <RingLoading />
      ) : (
        <>
          {user && (
            <>
              <li>
                <NavLink
                  to="/add-spot"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-yellow-400 border-b border-yellow-400"
                        : "hover:text-yellow-400 "
                    } mr-1`
                  }
                >
                  Add Spot
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-list"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-yellow-400 border-b border-yellow-400"
                        : "hover:text-yellow-400 "
                    } mr-1`
                  }
                >
                  My List
                </NavLink>
              </li>
            </>
          )}
          <li className="relative hidden lg:block">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-yellow-400 border-b border-yellow-400"
                    : "hover:text-yellow-400 "
                } mr-1`
              }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
            </NavLink>

            <div className="absolute right-1 -top-0 navbar-badge bg-primary rounded-full font-semibold flex justify-center">
              <span>{cartNumber}</span>
            </div>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar">
      {/* Start part */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo Part */}
        <div>
          <NavLink
            className="text-3xl font-semibold font-rubik flex items-center"
            to="/"
          >
            <img
              src="https://i.ibb.co/J2YD92S/logo.png"
              alt=""
              className="w-12"
            />

            <div className="hidden md:flex ">
              <SiteLogo />
            </div>
          </NavLink>
        </div>
      </div>

      {/* Center Part */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      {loading || pageLoading ? (
        <div className="lg:hidden">
          <RingLoading />
        </div>
      ) : (
        <div className="navbar-center hidden xs:flex lg:hidden">
          <ul className="menu menu-horizontal px-1">
            <li className="relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-yellow-400 border-b border-yellow-400"
                      : "hover:text-yellow-400 "
                  } mr-1`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </NavLink>

              <div className="absolute right-1 -top-0 navbar-badge bg-primary hover:bg-primary rounded-full font-semibold flex justify-center">
                <span>{cartNumber}</span>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* End part */}
      <div className="navbar-end">
        <ThemeButton />
        {loading || pageLoading ? (
          <RingLoading />
        ) : user ? (
          <>
            {/* New avatar */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoURL || fallbackPPUrl}
                    onError={handleImageError}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <div className="flex flex-col gap-1 text-xs ml-3">
                  <h3> {user.displayName}</h3>
                  <h3 className="mt-1"> {user.email || "<Private_Email>"}</h3>
                </div>
                <div className="divider my-1"></div>

                <li>
                  <NavLink
                    to="/user-profile"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-pink-400 border-b border-pink-400"
                          : "hover:text-pink-400 "
                      } w-full justify-between`
                    }
                  >
                    Profile <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-pink-400 border-b border-pink-400"
                          : "hover:text-pink-400 "
                      } w-full justify-between`
                    }
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="badge">{cartNumber}</span>
                  </NavLink>
                </li>
                <li onClick={handleLogOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>

            <a
              onClick={handleLogOut}
              className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 rounded-lg border-none text-gray-200 btn-sm"
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <>
              <Link
                className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 px-3 rounded-lg border-none text-gray-100 btn-sm mr-3"
                to="/register"
              >
                Register
              </Link>
              <Link
                className="btn hover:from-pink-500 hover:to-indigo-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 rounded-lg border-none text-gray-200 btn-sm"
                to="/login"
              >
                Login
              </Link>
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
