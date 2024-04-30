import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      {window.scrollTo(0, 0)}
      <Helmet>
        <title> About | TourTango</title>
      </Helmet>
      <div className=" md:container bg-base-100 mx-2 md:mx-auto px-2 md:px-5  overflow-hidden ">
        <div className="my-10">
          <h3 className="text-3xl font-semibold pl-4 mb-5">
            TourTango History
          </h3>
        </div>
        <div className="card card-side bg-base-200  shadow-xl flex flex-col xl:flex-row gap-6 lg:gap-0 mb-10">
          <figure
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-easing="ease-in-sine"
            className="flex-1 p-3"
          >
            <img
              className="rounded-2xl"
              src="https://i.ibb.co/k85YGFF/office.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body flex-1 flex flex-col items-center justify-center gap-6">
            <h2
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="1600"
              data-aos-easing="ease-in-sine"
              className="card-title"
            >
              Embark on unforgettable journeys with our premier tourist website.
              Discover not just destinations, but the stories, cultures, and
              adventures that await beyond every horizon. Because when you
              travel with us, every step is a new chapter in your own
              extraordinary tale.
            </h2>
            <p
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="1300"
              data-aos-easing="ease-in-sine"
              className="font-light text-gray-400"
            >
              Explore beyond the usual tourist hotspots with our curated
              insights straight from locals. With over 34 unique experiences
              mapped out, you'll dive deeper into the heart of each destination,
              discovering hidden gems and local treasures that define the true
              essence of travel
            </p>
            <p
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="1000"
              data-aos-easing="ease-in-sine"
              className="font-light text-gray-400"
            >
              We’re committed to helping them discover a place where they will
              love to live and where they will feel more connected to the
              community and to each other. It’s why we strive every day to help
              build a more neighborly world.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
