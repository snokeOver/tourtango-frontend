import { FaQuoteLeft } from "react-icons/fa";
const CustomerCard = ({ customer }) => {
  return (
    <div className="card w-72 bg-base-200 shadow-xl mr-10 md:mr-16 lg:mr-28">
      <figure className=" px-2 pt-2">
        <img
          src={customer.photoUrl}
          alt={customer.name}
          className="rounded-xl h-64 hover:!scale-105 duration-500"
        />
      </figure>
      <div className="card-body  text-center flex-grow">
        <h2 className="text-lg font-semibold text-center mb-2">
          {customer.name}
        </h2>
        <div className="text-justify text-sm flex-grow">
          <FaQuoteLeft />

          <span className="ml-4 mt-1">{customer.speech}</span>
        </div>

        <h5 className=" text-sm bg-primary  rounded-md bg-clip-padding backdrop-filter text-gray-100 py-1 hover:text-gray-800">
          {customer.visiting_spot}
        </h5>
      </div>
    </div>
  );
};

export default CustomerCard;
