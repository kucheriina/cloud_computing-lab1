import { apiPath } from "config/api";
import baseAuthApi from "services/authService/";
import { login } from "store/slices/userSlice";
import { AuthUserRequest, AuthUserResponse, RegistrationUserRequest } from "types/user";

export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthUserResponse, AuthUserRequest>({
      query: (userData) => ({
        url: `${apiPath.auth}/login`,
        method: "POST",
        body: userData,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { accessToken, user },
        } = await queryFulfilled;

        if (accessToken && user) {
          dispatch(login({ user, accessToken }));
        }
      },
    }),
    registration: builder.mutation<AuthUserResponse, RegistrationUserRequest>({
      query: (userData) => ({
        url: `${apiPath.auth}/registration`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
