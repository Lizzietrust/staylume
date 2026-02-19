import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Hotel", "Booking", "Review", "User"],
  endpoints: (builder) => ({
    // Define your endpoints here
    getHotels: builder.query({
      query: (params) => ({ url: "/hotels", params }),
      providesTags: ["Hotel"],
    }),
    getHotelById: builder.query({
      query: (id) => `/hotels/${id}`,
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateBookingMutation,
} = apiSlice;
