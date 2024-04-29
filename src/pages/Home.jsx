import { Helmet } from "react-helmet-async";
import Banner from "../components/home/Banner";
import MarqueeSection from "../components/home/MarqueeSection";
import TouristSpotsSection from "../components/home/TouristSpotsSection";
import CountrySection from "../components/home/CountrySection";
import HowWeHelpSection from "../components/home/HowWeHelpSection";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Helmet>
        <title>Home | TourTango</title>
      </Helmet>
      <Banner />
      <div className="md:container mx-auto">
        <TouristSpotsSection />
      </div>
      <MarqueeSection />

      <div className="md:container mx-auto">
        <CountrySection />
      </div>
      <HowWeHelpSection />
    </div>
  );
};

export default Home;
