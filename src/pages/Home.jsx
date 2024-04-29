import { Helmet } from "react-helmet-async";
import Banner from "../components/home/Banner";
import MarqueeSection from "../components/home/MarqueeSection";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Helmet>
        <title>Home | TourTango</title>
      </Helmet>
      <Banner />
      <div className="md:container mx-auto">
        {/* <EstateSection /> */} <MarqueeSection />
      </div>
      {/* <ChooseUs /> */}
      <div className="container mx-auto">{/* <OurPartner /> */}</div>
    </div>
  );
};

export default Home;
