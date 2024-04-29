const HowWeHelpCard = ({ reason }) => {
  return (
    <div className="card hover:!scale-105 duration-500  bg-base-200 shadow-xl">
      <figure className=" px-2 pt-2">
        <img
          src={reason.image}
          alt={reason.title}
          className="rounded-full w-24 h-24 border border-gray-300 dark:border-gray-700 p-1 "
        />
      </figure>
      <div className="card-body  text-center flex-grow">
        <h2 className="text-lg font-semibold text-center mb-2">
          {reason.title}
        </h2>
        <div className="text-justify text-sm">
          <p className=" mt-1">{reason.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HowWeHelpCard;
