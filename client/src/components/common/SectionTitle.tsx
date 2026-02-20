import { useTheme } from "../../hooks/useTheme";

const SectionTitle = ({ title, subtitle }) => {
  const { mode } = useTheme();

  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          mode === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
