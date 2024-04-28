import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SpinnerAtButton from "./SpinnerAtButton";

const PrimaryButton = ({ disabledStat = false, btnTitle }) => {
  const { btnLoading } = useContext(AuthContext);
  return (
    <button
      disabled={disabledStat}
      className="btn  hover:from-pink-500 hover:to-indigo-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 rounded-lg border-none text-gray-200"
    >
      {btnLoading && <SpinnerAtButton />} {btnTitle}
    </button>
  );
};

export default PrimaryButton;
