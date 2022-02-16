import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set("content-type", "application/json");

      return headers;
    }
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/local/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/local",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: () => "/users/me"
    }),
    getPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetPostsQuery,
  useGetMeQuery,
} = apiSlice;
