import Container from "../common/Container.tsx";
import SectionTitle from "../common/SectionTitle";

const offers = [
  {
    title: "LAST MINUTE",
    subtitle: "Escape this weekend and save 20%",
    description:
      "Book within the next 48 hours for stays in selected luxury properties.",
    buttonText: "Book Now",
    bgColor: "from-red-500 to-red-600",
  },
  {
    title: "SUMMER DEALS",
    subtitle: "Summer adventures start here",
    description:
      "Discover unique beach houses and coastal retreats at member-only prices.",
    buttonText: "Explore Deals",
    bgColor: "from-emerald-500 to-emerald-600",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <SectionTitle
          title="Special Offers"
          subtitle="Exclusive deals just for you"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg bg-linear-to-r ${offer.bgColor} p-8 text-white`}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <h4 className="text-xl font-semibold mb-3">{offer.subtitle}</h4>
                <p className="mb-6 opacity-90">{offer.description}</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  {offer.buttonText}
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SpecialOffers;
