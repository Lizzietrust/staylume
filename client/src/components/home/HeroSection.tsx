import { useTheme } from "../../hooks/useTheme";

const HeroSection = () => {
  const { mode } = useTheme();

  return (
    <section className="relative h-150 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury hotel lobby"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 ${
            mode === "dark" ? "bg-black/60" : "bg-black/40"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">LuxeStay</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Find your next stay
        </p>
        <p className="text-lg md:text-xl opacity-90">
          Search deals on hotels, homes, and much more across the globe.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
