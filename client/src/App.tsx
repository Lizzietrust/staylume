import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";

import Home from "./pages/Home";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Hotel pages
import HotelList from "./pages/hotels/HotelList";
import HotelDetails from "./pages/hotels/HotelDetails";
import HotelSearch from "./pages/hotels/HotelSearch";

// Booking pages
import BookingCheckout from "./pages/bookings/BookingCheckout";
import BookingConfirmation from "./pages/bookings/BookingConfirmation";
import BookingHistory from "./pages/bookings/BookingHistory";

// Profile pages
import ProfileDashboard from "./pages/profile/ProfileDashboard";
import EditProfile from "./pages/profile/EditProfile";
import Wishlist from "./pages/profile/Wishlist";
import MyReviews from "./pages/profile/MyReviews";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageHotels from "./pages/admin/ManageHotels";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers.tsx";

// Static pages
import About from "./pages/static/About";
import Contact from "./pages/static/Contact";
import Terms from "./pages/static/Terms";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "hotels", element: <HotelList /> },
      { path: "hotels/search", element: <HotelSearch /> },
      { path: "hotels/:id", element: <HotelDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "terms", element: <Terms /> },

      // Auth routes (with AuthLayout)
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password/:token", element: <ResetPassword /> },
        ],
      },

      // Protected user routes
      {
        path: "account",
        element: <PrivateRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "dashboard", element: <ProfileDashboard /> },
              { path: "profile/edit", element: <EditProfile /> },
              { path: "bookings", element: <BookingHistory /> },
              { path: "bookings/:id", element: <BookingConfirmation /> },
              { path: "wishlist", element: <Wishlist /> },
              { path: "reviews", element: <MyReviews /> },
            ],
          },
        ],
      },

      // Booking flow (protected)
      {
        path: "booking",
        element: <PrivateRoute />,
        children: [
          { path: "checkout/:hotelId", element: <BookingCheckout /> },
          { path: "confirmation/:id", element: <BookingConfirmation /> },
        ],
      },

      // Admin routes
      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "hotels", element: <ManageHotels /> },
              { path: "bookings", element: <ManageBookings /> },
              { path: "users", element: <ManageUsers /> },
            ],
          },
        ],
      },

      // 404 route
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
