import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialLinkedin,
} from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";

const SocialLinks = () => {
  return (
    <nav>
      <div className="grid grid-flow-col items-center gap-8 group">
        <div>
          <div className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
            <BsTwitterX className="text-xl text-blue-400" />
          </div>
        </div>
        <div>
          <div className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
            <TiSocialFacebook className="text-3xl text-blue-700" />
          </div>
        </div>
        <div>
          <div className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
            <TiSocialYoutube className="text-3xl text-red-500" />
          </div>
        </div>
        <div>
          <div className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
            <TiSocialLinkedin className="text-3xl" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SocialLinks;
