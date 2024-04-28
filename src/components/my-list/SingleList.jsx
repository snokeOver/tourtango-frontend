const SingleList = ({ sSpot, index, handleDeleteSpot, handleUpdateSpot }) => {
  return (
    <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200">
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
  );
};

export default SingleList;
