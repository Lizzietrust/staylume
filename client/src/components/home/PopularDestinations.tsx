import { useTheme } from "../../hooks/useTheme";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const destinations = [
  { name: "Paris", stays: "1,240 stays", image: "/images/paris.jpg" },
  { name: "Tokyo", stays: "850 stays", image: "/images/tokyo.jpg" },
  { name: "New York", stays: "2,100 stays", image: "/images/newyork.jpg" },
  { name: "London", stays: "1,560 stays", image: "/images/london.jpg" },
];

const PopularDestinations = () => {
  const { mode } = useTheme();

  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          title="Popular Destinations"
          subtitle="The most loved cities by our travelers right now"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className={`group relative rounded-lg overflow-hidden cursor-pointer ${
                mode === "dark" ? "shadow-lg shadow-black/30" : "shadow-lg"
              }`}
            >
              <div className="aspect-4/3">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm opacity-90">{destination.stays}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularDestinations;
