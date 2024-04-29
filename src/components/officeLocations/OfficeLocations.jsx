import OfficeDetail from "./OfficeDetail";

const OfficeLocations = () => {
  const officeDetails = [
    {
      id: 1,
      role: "Elizabeth Branch",
      address: "456 Elm Street, <br> Elizabeth, New Jersey, USA",
      phone: "+1 (555) 123-4567",
      email: "info@homestead-elizabeth.com",
      hours: "Monday - Friday, 9:00 AM - 5:00 PM",
    },
    {
      id: 2,
      role: "Newark Branch",
      address: "54 Street, <br> Newark City, New York, USA",
      phone: "+1 (555) 123-4567",
      email: "info@homestead-newark.com",
      hours: "Monday - Friday, 9:00 AM - 5:00 PM",
    },
    {
      id: 3,
      role: "Head Office",
      address: "123 Main Street, <br> New York City, New York, USA",
      phone: "+1 (555) 123-4567",
      email: "info@homestead-newyork.com",
      hours: "Monday - Friday, 9:00 AM - 5:00 PM",
    },
  ];

  return (
    <div role="tablist" className="tabs tabs-lifted p-5 ">
      {officeDetails.map((officeDetail) => (
        <OfficeDetail key={officeDetail.id} officeDetail={officeDetail} />
      ))}
    </div>
  );
};

export default OfficeLocations;
