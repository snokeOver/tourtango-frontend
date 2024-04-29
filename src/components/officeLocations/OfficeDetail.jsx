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
            <p className="font-semibold">Address:</p>
            <p dangerouslySetInnerHTML={{ __html: officeDetail.address }}></p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Phone:</p>
            <p>{officeDetail.phone}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Email:</p>
            <p>{officeDetail.email}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Hours:</p>
            <p>{officeDetail.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeDetail;
