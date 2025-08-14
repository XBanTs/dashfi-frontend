import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";

// Base URL for API calls
const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    // Production backend URL
    return import.meta.env.VITE_BASE_URL_PROD || "https://dashfi-backend.onrender.com";
  }
  // Local development backend URL
  return import.meta.env.VITE_BASE_URL || "http://localhost:9000"; // your local server port
};

export const api = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "/kpi/kpis",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "/products/products",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "/transaction/transactions",
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} = api;
