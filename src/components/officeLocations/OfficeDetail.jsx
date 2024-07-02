import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuClock4 } from "react-icons/lu";
const OfficeDetail = ({ officeDetail }) => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label={officeDetail.role}
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <div className=" flex flex-col gap-6">
          <div className="mb-2">
            <p className="font-semibold flex items-center gap-2 mt-5 sm:mt-0">
              <span>
                <FaLocationDot />
              </span>
              <span>Address:</span>
            </p>
            <p dangerouslySetInnerHTML={{ __html: officeDetail.address }}></p>
          </div>
          <div className="mb-2">
            <p className="font-semibold flex items-center gap-2">
              <span>
                <FaPhoneAlt />
              </span>
              <span>Phone:</span>
            </p>
            <p>{officeDetail.phone}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold flex items-center gap-2">
              <span>
                <MdEmail />
              </span>
              <span>Email:</span>
            </p>
            <p>{officeDetail.email}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold flex items-center gap-2">
              <span>
                <LuClock4 />
              </span>
              <span>Hours:</span>
            </p>
            <p>{officeDetail.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeDetail;
