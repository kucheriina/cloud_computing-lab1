import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { FetchArgs, FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import queryError, { QueryError } from "utils/queryError";

export interface CommonBaseQueryArgs extends FetchBaseQueryArgs {}

export interface CommonFetchArgs extends FetchArgs {}

type CommonBaseQuery = (args: CommonBaseQueryArgs) => BaseQueryFn<CommonFetchArgs, unknown, QueryError>;

const commonBaseQuery: CommonBaseQuery = ({ prepareHeaders, ...args }) => {
  const baseQuery = fetchBaseQuery({
    prepareHeaders: (headers, api) => {
      headers.set("Content-Type", "application/json");

      prepareHeaders && prepareHeaders(headers, api);

      return headers;
    },
    ...args,
  });

  return async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);

    if (!!response.error) {
      const error = queryError(
        typeof response.error.status === "number" ? response.error.status : 400,
        (response.error.data as QueryError["data"]) ?? {
          operationStatus: 0,
          responseData: null,
        }
      );

      return {
        error,
      };
    }

    return response;
  };
};

export default commonBaseQuery;
