import LoginSlidder from "./LoginSlidder";

const SideSectionWithSlidder = ({ writings }) => {
  return (
    <>
      <div>
        <div className="text-center lg:text-left flex flex-col gap-5">
          <h1 className="text-4xl text-gray-700 hover:text-blue-500 font-bold">
            Welcome to TourTango
          </h1>
          <h2 className="font-rubik text-2xl xl:text-3xl font-semibold dark:text-purple-700 text-blue-700">
            {writings}
          </h2>
        </div>
      </div>
      <div className="flex px-2 xl:px-0">
        <LoginSlidder />
      </div>
    </>
  );
};

export default SideSectionWithSlidder;
