import axios from "axios";

export const RestApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
