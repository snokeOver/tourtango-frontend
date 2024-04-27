import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { IoHome } from "react-icons/io5";
import RingLoading from "../sharedComponents/RingLoading";
import { AuthContext } from "../../providers/AuthProvider";
import SiteLogo from "../sharedComponents/SiteLogo";

const NavBar = () => {
  const {
    loading,
    user,
    setUser,
    logOut,
    cartNumber,
    setCartNumber,
    setLogOutSuccess,
    pageLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  const [isHovering, setIsHovering] = useState(false);

  // Handle log out button
  const handleLogOut = () => {
    logOut()
      .then((result) => {
        setUser(null);
        setLogOutSuccess(true);
        setCartNumber(0);
        navigate("/login");
      })
      .catch((err) => console.log(err.message));
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

      {loading || pageLoading ? (
        <RingLoading />
      ) : (
        <>
          {user && (
            <>
              <li>
                <NavLink
                  to="/user-profile"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-yellow-400 border-b border-yellow-400"
                        : "hover:text-yellow-400 "
                    } mr-1`
                  }
                >
                  Profile
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
              Cart
            </NavLink>

            <div className="absolute right-1 -top-0 navbar-badge bg-primary rounded-full font-semibold flex justify-center">
              <span>{cartNumber}</span>
            </div>
          </li>
        </>
      )}
    </>
  );

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  return (
    <div className="navbar">
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks} </ul>
      </div>
      {loading || pageLoading ? (
        <div className="lg:hidden">
          <RingLoading />
        </div>
      ) : !user ? (
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
                Cart
              </NavLink>

              <div className="absolute right-1 -top-0 navbar-badge bg-primary hover:bg-primary rounded-full font-semibold flex justify-center">
                <span>{cartNumber}</span>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-center  lg:hidden">
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
                Cart
              </NavLink>

              <div className="absolute right-1 -top-0 navbar-badge bg-primary hover:bg-primary rounded-full font-semibold flex justify-center">
                <span>{cartNumber}</span>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="navbar-end">
        <ThemeButton />

        {loading || pageLoading ? (
          <RingLoading />
        ) : user ? (
          <>
            <div
              tabIndex={0}
              role="button"
              className="relative btn btn-ghost btn-circle avatar mr-1"
            >
              <div
                className="w-8 rounded-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  alt="User Photo"
                  src={user.photoURL || fallbackPPUrl}
                  onError={handleImageError}
                />
                {isHovering && (
                  <div className="absolute bg-base-100 top-10 -left-16 text-xs text-left shadow-md py-5 px-4 rounded-lg z-10">
                    <h3> {user.displayName}</h3>
                    <h3 className="mt-1"> {user.email || "<Private_Email>"}</h3>
                    <div className="divider my-1"></div>
                    <div className=" w-full">
                      <NavLink
                        to="/user-profile"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "text-pink-400 border-b border-pink-400"
                              : "hover:text-pink-400 "
                          } w-full`
                        }
                      >
                        Profile
                      </NavLink>
                    </div>
                    <div className="w-full my-2 relative">
                      <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "text-pink-400 border-b border-pink-400"
                              : "hover:text-pink-400 "
                          } mr-1`
                        }
                      >
                        Cart
                      </NavLink>

                      <div className="absolute right-1 -top-0 navbar-badge bg-primary hover:bg-primary rounded-full font-semibold flex justify-center">
                        <span>{cartNumber}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link
              onClick={handleLogOut}
              className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 rounded-lg border-none text-gray-200 btn-sm"
              to="/"
            >
              Logout
            </Link>
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
