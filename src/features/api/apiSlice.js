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
  tagTypes: ["Post"],
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
      query: () => "/users/me",
    }),
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (result = [], error, arg) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post", id })),
      ],
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    addNewPost: builder.mutation({
      query: (postContent) => ({
        url: "/posts",
        method: "POST",
        body: postContent,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id },
      ],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg },
      ],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetPostsQuery,
  useGetMeQuery,
  useGetUserQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = apiSlice;
