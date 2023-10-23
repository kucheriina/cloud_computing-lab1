import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseApiPath } from "config/api";
import baseQueryWithAuth from "services/baseQueries/baseQueryWithAuth";

const baseAuthApi = createApi({
  reducerPath: "baseAuthApi",
  baseQuery: baseQueryWithAuth({ baseUrl: baseApiPath.base }),
  endpoints: () => ({}),
});

export default baseAuthApi;
