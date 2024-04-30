import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const MainLayouts = () => {
  return (
    <div className="font-poppins">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayouts;
