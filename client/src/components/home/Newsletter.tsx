import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import Container from "../common/Container";

const Newsletter = () => {
  const { mode } = useTheme();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
  };

  return (
    <section className="py-16 bg-emerald-600 dark:bg-emerald-700">
      <Container>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
          <p className="text-lg mb-8 opacity-90">
            Sign up for our newsletter to receive secret deals, travel tips, and
            destination inspiration directly in your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Subscribe
              </button>
            </div>
          </form>

          <p className="text-sm mt-4 opacity-75">
            By selecting "Join my list" you agree to our Terms of Use and
            Privacy Policy.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
