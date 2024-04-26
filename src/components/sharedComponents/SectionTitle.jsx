const SectionTitle = ({ title, subTitle = "" }) => {
  return (
    <div className="text-center bg-base-100 p-3 md:py-4">
      <h1
        data-aos="fade-down-left"
        data-aos-duration="800"
        data-aos-easing="ease-in-sine"
        className="text-2xl md:text-4xl font-extrabold text-heading-color my-4"
      >
        {title}
      </h1>
      {subTitle && (
        <p
          data-aos="fade-up-right"
          data-aos-duration="800"
          data-aos-delay="400"
          data-aos-easing="ease-in-sine"
          className="text-message-color font-inter hidden md:inline-block md:text-base lg:text-lg md:w-3/4 "
        >
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
