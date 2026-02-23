import { useState } from "react";
import { MapPinPlus, Users, Search, CalendarDays } from "lucide-react";

type SearchDataKey = "location" | "checkIn" | "checkOut" | "guests";

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2 adults",
  });

  const [focusedField, setFocusedField] = useState<SearchDataKey | null>(null);

  const isFieldActive = (fieldName: SearchDataKey) => {
    if (fieldName === "checkIn" || fieldName === "checkOut") {
      return (
        focusedField === "checkIn" ||
        focusedField === "checkOut" ||
        searchData.checkIn.length > 0 ||
        searchData.checkOut.length > 0
      );
    }
    return focusedField === fieldName || searchData[fieldName].length > 0;
  };

  return (
    <div className="container mx-auto px-3 -mt-16 relative z-20">
      <div className="rounded-xl shadow-xl p-4 bg-[#1A1D23]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Location - 3 columns */}
          <div className="md:col-span-3">
            <div
              className={`w-full h-18 p-4 rounded-lg border flex items-center gap-3 transition-colors duration-200 ${
                isFieldActive("location")
                  ? "border-emerald-500"
                  : "border-[#334155]"
              } bg-[#0F172A]`}
            >
              <MapPinPlus
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFieldActive("location")
                    ? "text-emerald-500"
                    : "text-[#94A3B8]"
                }`}
              />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full h-full bg-transparent text-white focus:ring-0 focus:border-transparent outline-none placeholder-gray-400 text-sm"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({ ...searchData, location: e.target.value })
                }
                onFocus={() => setFocusedField("location")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <div
              className={`w-full h-18 rounded-lg border flex items-stretch transition-colors duration-200 ${
                // Check if either check-in OR check-out is focused OR has a value
                focusedField === "checkIn" ||
                focusedField === "checkOut" ||
                searchData.checkIn.length > 0 ||
                searchData.checkOut.length > 0
                  ? "border-emerald-500"
                  : "border-[#334155]"
              } bg-[#0F172A] overflow-hidden`}
            >
              {/* Calendar Icon Container - full height - now clickable */}
              <div
                className="w-12 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  // Focus the check-in field when icon is clicked
                  const checkInInput = document.querySelector(
                    'input[placeholder="Check-in"]',
                  ) as HTMLInputElement;
                  if (checkInInput) {
                    checkInInput.focus();
                    setFocusedField("checkIn");
                  }
                }}
              >
                <CalendarDays
                  className={`w-5 h-5 transition-colors duration-200 ${
                    // Same condition for the icon
                    focusedField === "checkIn" ||
                    focusedField === "checkOut" ||
                    searchData.checkIn.length > 0 ||
                    searchData.checkOut.length > 0
                      ? "text-emerald-500"
                      : "text-[#94A3B8]"
                  }`}
                />
              </div>

              {/* Check-in Section - full height */}
              <div className="flex-1 flex flex-col justify-center px-3 border-[#334155]">
                <input
                  type="date"
                  placeholder="Check-in"
                  className="w-full bg-transparent text-white text-sm focus:ring-0 focus:border-transparent outline-none [color-scheme:dark] p-0"
                  value={searchData.checkIn}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkIn: e.target.value })
                  }
                  onFocus={() => setFocusedField("checkIn")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Check-out Section - full height */}
              <div className="flex-1 flex flex-col justify-center px-3 border-[#334155]">
                <input
                  type="date"
                  placeholder="Check-out"
                  className="w-full bg-transparent text-white text-sm focus:ring-0 focus:border-transparent outline-none [color-scheme:dark] p-0"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkOut: e.target.value })
                  }
                  onFocus={() => setFocusedField("checkOut")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
          </div>

          {/* Guests - 3 columns */}
          <div className="md:col-span-3">
            <div
              className={`w-full h-18 p-4 rounded-lg border flex items-center gap-3 transition-colors duration-200 ${
                isFieldActive("guests")
                  ? "border-emerald-500"
                  : "border-[#334155]"
              } bg-[#0F172A]`}
            >
              <Users
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFieldActive("guests")
                    ? "text-emerald-500"
                    : "text-[#94A3B8]"
                }`}
              />
              <select
                className="w-full h-full bg-transparent text-white focus:ring-0 focus:border-transparent outline-none text-sm"
                value={searchData.guests}
                onChange={(e) =>
                  setSearchData({ ...searchData, guests: e.target.value })
                }
                onFocus={() => setFocusedField("guests")}
                onBlur={() => setFocusedField(null)}
              >
                <option value="1 adult" className="bg-[#0F172A]">
                  1 adult
                </option>
                <option value="2 adults" className="bg-[#0F172A]">
                  2 adults
                </option>
                <option value="3 adults" className="bg-[#0F172A]">
                  3 adults
                </option>
                <option value="4 adults" className="bg-[#0F172A]">
                  4 adults
                </option>
                <option value="2 adults, 1 child" className="bg-[#0F172A]">
                  2 adults, 1 child
                </option>
                <option value="2 adults, 2 children" className="bg-[#0F172A]">
                  2 adults, 2 children
                </option>
              </select>
            </div>
          </div>

          {/* Search Button - 2 columns */}
          <div className="md:col-span-3">
            <button className="w-full h-18 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
