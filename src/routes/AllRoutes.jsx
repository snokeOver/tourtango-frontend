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
      //  {
      //    path: "/update-profile",
      //    element: (
      //      <PrivateRoutes>
      //        <UpdateProfile />
      //      </PrivateRoutes>
      //    ),
      //  },
      //  {
      //    path: "/user-profile",
      //    element: (
      //      <PrivateRoutes>
      //        <UserProfile />
      //      </PrivateRoutes>
      //    ),
      //  },
      //  {
      //    path: "/estate-details/:id",
      //    element: (
      //      <PrivateRoutes>
      //        <EstateDetails />
      //      </PrivateRoutes>
      //    ),
      //  },
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
