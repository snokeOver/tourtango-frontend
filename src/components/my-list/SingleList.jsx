import { Tooltip } from "react-tooltip";
const SingleList = ({ sSpot, index, handleDeleteSpot, handleUpdateSpot }) => {
  return (
    <>
      <tr
        className={`cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200 my_tooltip_${index}`}
      >
        <th>{index + 1}</th>
        <td>{sSpot.country}</td>
        <td>{sSpot.spot}</td>
        <td>{sSpot.cost}</td>
        <td className="">
          <button
            onClick={() => handleDeleteSpot(sSpot._id)}
            className="btn btn-outline btn-warning "
          >
            Delete
          </button>
        </td>
        <td className="">
          <button
            onClick={() => handleUpdateSpot(sSpot)}
            className="btn btn-outline btn-info "
          >
            Update
          </button>
        </td>
      </tr>
      <Tooltip
        anchorSelect={`.my_tooltip_${index}`}
        place="bottom"
        className="z-50"
      >
        <img
          className="w-40 h-32 md:w-80 md:h-52 rounded-xl"
          src={sSpot.imageUrl}
          alt=""
        />
      </Tooltip>
    </>
  );
};

export default SingleList;
