const PrimaryButton = ({ btnTitle }) => {
  return (
    <button className="btn  hover:from-pink-500 hover:to-indigo-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 rounded-lg border-none text-gray-200">
      {btnTitle}
    </button>
  );
};

export default PrimaryButton;
