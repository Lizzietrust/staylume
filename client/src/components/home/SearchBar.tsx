import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const SearchBar = () => {
  const { mode } = useTheme();
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2 adults",
  });

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-20">
      <div
        className={`rounded-lg shadow-xl p-6 ${
          mode === "dark"
            ? "bg-gray-800/90 backdrop-blur-md"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchData.location}
              onChange={(e) =>
                setSearchData({ ...searchData, location: e.target.value })
              }
            />
          </div>

          {/* Check In */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Check In
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Check Out
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
