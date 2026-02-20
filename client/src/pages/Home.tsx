import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import PopularDestinations from "../components/home/PopularDestinations";
import SpecialOffers from "../components/home/SpecialOffers";
import TrendingCategories from "../components/home/TrendingCategories";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SearchBar />
      <PopularDestinations />
      <SpecialOffers />
      <TrendingCategories />
      <Newsletter />
    </div>
  );
};

export default Home;
