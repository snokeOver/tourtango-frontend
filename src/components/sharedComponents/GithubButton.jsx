import { FaGithub } from "react-icons/fa";
const GithubButton = ({ text, handleBtn }) => {
  return (
    <button onClick={handleBtn} className="btn  btn-outline btn-info ">
      <FaGithub className="text-xl" />
      <span className="ml-1">{text}</span>
    </button>
  );
};

export default GithubButton;
