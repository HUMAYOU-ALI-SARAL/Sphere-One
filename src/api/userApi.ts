import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from '@/store/store'

import {
    SignupRequest,
    SignupResponse,
    LoginResponse,
    LoginRequest,
    OtpResponse,
    OtpRequest,
    SaveAccountRequest,
} from "@/types/auth.type";

import {
    SaveUserProfileRequest,
    UserProfileResponse,
    UserAccountIdResponse,
    ChangeUserPasswordRequest,
} from "@/types/user.type";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/user/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.authToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (credentials) => ({
                url: "register",
                method: "POST",
                body: credentials,
            }),
        }),

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
        }),

        otpVerify: builder.mutation<OtpResponse, OtpRequest>({
            query: (credentials) => ({
                url: "otp",
                method: "POST",
                body: credentials,
            }),
        }),
        otpResendEmail: builder.mutation<OtpResponse, any>({
            query: () => ({
                url: "otp/resend",
                method: "GET",
            }),
        }),

        saveAccountId: builder.mutation<any, SaveAccountRequest>({
            query: (data) => ({
                url: "account-id",
                method: "POST",
                body: data,
            }),
        }),

        getProfile: builder.mutation<UserProfileResponse, any>({
            query: () => ({
                url: "info",
                method: "GET",
            }),
        }),

        getUserById: builder.mutation<UserProfileResponse, any>({
            query: (userId: string) => ({
                url: `/info/${userId}`,
                method: "GET",
            }),
        }),

        getAccountIdByUserName: builder.mutation<UserAccountIdResponse, any>({
            query: (userName: string) => ({
                url: `/info/accountId/${userName}`,
                method: "GET",
            }),
        }),

        saveProfile: builder.mutation<UserProfileResponse, SaveUserProfileRequest>({
            query: (data) => ({
                url: "info",
                method: "PUT",
                body: data,
            }),
        }),

        uploadUserImage: builder.mutation<UserProfileResponse, any>({
            query: (data) => ({
                url: "info",
                method: "PUT",
                body: data,
            }),
        }),

        changePassword: builder.mutation<UserProfileResponse, ChangeUserPasswordRequest>({
            query: (data) => ({
                url: "password",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useOtpVerifyMutation,
    useGetProfileMutation,
    useOtpResendEmailMutation,
    useSaveAccountIdMutation,
    useSaveProfileMutation,
    useUploadUserImageMutation,
    useChangePasswordMutation,
    useGetUserByIdMutation,
    useGetAccountIdByUserNameMutation,
} = userApi;