import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import MainLayouts from "../layouts/MainLayouts";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import UserProfile from "../pages/UserProfile";
import SpotDetails from "../pages/SpotDetails";
import TourSpots from "../pages/TourSpots";
import AddSpot from "../pages/AddSpot";
import MyList from "../pages/MyList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/user-profile",
        element: (
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/tour-spots",
        element: <TourSpots />,
      },
      {
        path: "/my-list",
        element: (
          <PrivateRoutes>
            <MyList />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-spot",
        element: (
          <PrivateRoutes>
            <AddSpot />
          </PrivateRoutes>
        ),
      },
      {
        path: "/spot-details/:id",
        element: (
          <PrivateRoutes>
            <SpotDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
    ],
  },
]);

export default router;
