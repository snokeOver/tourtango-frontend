const LogoWithTitle = ({ title }) => {
  return (
    <>
      <div className="bg-gray-100 border border-blue-200 dark:bg-gray-700 dark:border-blue-400 rounded-full p-3">
        <img src="https://i.ibb.co/J2YD92S/logo.png" alt="" className="w-16" />
      </div>
      <div className="text-center lg:text-left ">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </>
  );
};

export default LogoWithTitle;
