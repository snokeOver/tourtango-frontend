import NavBar from "./NavBar";

const Header = () => {
  return (
    <>
      <div className="bg-blue-400 dark:bg-gray-700 sticky top-0 z-50">
        <div className="container mx-auto">
          <NavBar />
        </div>
      </div>
    </>
  );
};

export default Header;
