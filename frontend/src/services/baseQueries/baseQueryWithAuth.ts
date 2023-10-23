import { BaseQueryFn } from "@reduxjs/toolkit/query";
import commonBaseQuery, { CommonBaseQueryArgs, CommonFetchArgs } from "services/baseQueries/commonBaseQuery";
import { RootState } from "store";
import { logout } from "store/slices/userSlice";
import queryError, { QueryError } from "utils/queryError";

interface BaseQueryWithAuthArgs extends CommonBaseQueryArgs {
  setToken?: boolean;
}

export interface FetchWithAuthArgs extends CommonFetchArgs {}

type BaseQueryWithAuth = (args: BaseQueryWithAuthArgs) => BaseQueryFn<FetchWithAuthArgs, unknown, QueryError>;

// todo: refactor it
const authErrorCodes = [401, 403];
const authErrorMessage = "Указаны неверные данные для входа";

const isAuthError = (error: QueryError) => {
  return authErrorCodes.includes(error.status) || (error.status === 400 && error.data.error === authErrorMessage);
};

const baseQueryWithAuth: BaseQueryWithAuth = ({ setToken = true, prepareHeaders, ...baseQueryArgs }) => {
  const baseQuery = commonBaseQuery({
    prepareHeaders: (headers, api) => {
      prepareHeaders && prepareHeaders(headers, api);

      if (setToken) {
        const { accessToken, isAuth } = (api.getState() as RootState).user;
        isAuth && accessToken && headers.set("Authorization", accessToken);
      }

      return headers;
    },
    ...baseQueryArgs,
  });

  // todo: auto reAuth
  return async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);

    if (!!response.error && isAuthError(response.error)) {
      // todo: убрать, когда бэк поменяет ответ на невалидный токен. должен быть 401 статус, а не 403
      if (response.error.status === 403) {
        api.dispatch(logout());
      }

      const error = queryError(response.error.status, {
        ...response.error.data,
        message: "Ошибка авторизации",
      });

      return {
        error,
      };
    }

    return response;
  };
};

export default baseQueryWithAuth;
