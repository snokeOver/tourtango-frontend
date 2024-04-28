const SingleCartItem = ({ singleSpot, index, handleDeleteSpot }) => {
  return (
    <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200">
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
    </tr>
  );
};

export default SingleCartItem;
