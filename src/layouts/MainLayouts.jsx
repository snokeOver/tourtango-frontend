import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

// Import AOS and Initialize
// import AOS from "aos";
// import "aos/dist/aos.css";
// AOS.init();

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
