import { useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import Marquee from "react-fast-marquee";
import axios from "axios";
import CustomerCard from "./CustomerCard";

const MarqueeSection = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [customers, setCusomers] = useState([]);

  // get all the customers reviews from DB
  useEffect(() => {
    const fetchCustomerReviews = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/customers`);
        if (response.data) {
          setCusomers(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchCustomerReviews();
  }, []);

  return (
    <div className=" px-2 w-full bg-base-100 mb-10 overflow-hidden">
      <div>
        <h3 className="mt-8 ml-5 text-lg text-center md:text-left">
          Over <span className="text-primary font-semibold">1500+</span> Happy
          Customers
        </h3>
        <SectionTitle title="Our Happy Customers" />
      </div>

      <div className="text-center  py-3 px-1 md:p-3 md:py-14">
        <Marquee>
          <div className="flex ">
            {customers.map((cusotmer) => (
              <CustomerCard key={cusotmer._id} customer={cusotmer} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSection;
