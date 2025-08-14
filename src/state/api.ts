import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

// Determine the base URL based on environment
const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_BASE_URL_PROD || 'https://dashfi-backend.onrender.com';
  }
  return import.meta.env.VITE_BASE_URL || 'http://localhost:1337';
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      // Use a leading slash so it concatenates correctly with baseUrl
      query: () => "/kpi/kpis",
      providesTags: ["Kpis"]
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      // Match server route mounting at "/products" and router path "/products"
      query: () => "/products/products",
      providesTags: ["Products"]
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      // Use a leading slash so it concatenates correctly with baseUrl
      query: () => "/transaction/transactions",
      providesTags: ["Transactions"]
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;