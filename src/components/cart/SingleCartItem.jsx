import { Tooltip } from "react-tooltip";
const SingleCartItem = ({ singleSpot, index, handleDeleteSpot }) => {
  return (
    <tr
      className={`cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200 my_tooltip_cart_${index}`}
    >
      <th>{index + 1}</th>
      <td>{singleSpot.spot}</td>
      <td>{singleSpot.travel_time}</td>
      <td>{singleSpot.cost}</td>
      <td className="">
        <button
          onClick={() => handleDeleteSpot(singleSpot._id)}
          className="btn btn-outline btn-warning"
        >
          Delete
        </button>
      </td>
      <Tooltip
        anchorSelect={`.my_tooltip_cart_${index}`}
        place="bottom"
        className="z-50"
      >
        <img
          className="w-40 h-32  rounded-xl"
          src={singleSpot.imageUrl}
          alt=""
        />
      </Tooltip>
    </tr>
  );
};

export default SingleCartItem;
