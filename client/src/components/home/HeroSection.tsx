import heroBg from "../../assets/images/hero-bg.webp";

const HeroSection = () => {
  return (
    <section className="relative h-150 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={heroBg}
          alt="hero image"
          className="w-full h-full object-cover"
        />
        {/* <div
          className={`absolute inset-0 ${
            mode === "dark" ? "bg-black/60" : "bg-black/40"
          }`}
        /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-5xl md:text-7xl font-black mb-4 font-beVietnamPro">
          Find your next stay
        </h1>
        <p className="text-text-tertiary text-lg md:text-xl font-medium">
          Search deals on hotels, homes, and much more across the globe.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
