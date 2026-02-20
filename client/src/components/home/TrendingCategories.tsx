import { useTheme } from "../../hooks/useTheme";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const categories = [
  { name: "Beachfront", icon: "🏖️" },
  { name: "Cabins", icon: "🏡" },
  { name: "Luxury", icon: "✨" },
  { name: "Treehouses", icon: "🌳" },
  { name: "Amazing Pools", icon: "🏊" },
];

const TrendingCategories = () => {
  const { mode } = useTheme();

  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          title="Trending Now"
          subtitle="Most popular categories this week"
        />

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`group px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                mode === "dark"
                  ? "border-gray-700 hover:border-emerald-500 hover:bg-emerald-500/10"
                  : "border-gray-200 hover:border-emerald-500 hover:bg-emerald-50"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrendingCategories;
