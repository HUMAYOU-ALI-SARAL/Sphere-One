'use client'
import {
    useGetProfileMutation, useSaveAccountIdMutation
} from "@/api/userApi";
import { useGetAccountBalanceMutation } from "@/api/blockchainApi"
import { useAppSelector, useAppDispatch } from "@/hooks/app";
import {
    selectUserProfile,
    selectAuthToken,
    setUserProfile,
    setAccountBalance,
    selectIsAuthorized,
    selectAccountBalance,
    logout
} from "@/reducers/user.slice";
import { UserProfileType } from "@/types/user.type";
import { AccountBalanceType } from "@/types/blockchain.type"
import { useRouter } from "next/router";
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import MoonPay from "@/components/MoonPay";

interface UserContextType {
    authToken: string | null;
    userProfile: UserProfileType | undefined;
    accountBalance: AccountBalanceType | null;
    isAuthorized: boolean;
    globalSearch: string;
    isBalanceLoading: boolean;
    logOut: () => void;
    setGlobalSearch: (query: string) => void;
    refreshAccountBalance: () => void;
    setOpenMoonPay: (state: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

const UserProvider = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();

    const userProfile = useAppSelector(selectUserProfile);
    const accountBalance = useAppSelector(selectAccountBalance);
    const authToken = useAppSelector(selectAuthToken);
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const router = useRouter();
    const [openMoonPay, setOpenMoonPay] = useState<boolean>(false);
    const [globalSearch, setGlobalSearch] = useState<string>("");

    const [getUserProfile] = useGetProfileMutation();
    const [fetchAccountBalance, { isSuccess: balanceSuccess, data: balanceData, isLoading: isBalanceLoading }] = useGetAccountBalanceMutation();
    const [saveAccountId] = useSaveAccountIdMutation();

    const logOut = useCallback(() => {
        dispatch(logout());
        router.push('/auth/login');
    }, [router, dispatch]);

    const refreshAccountBalance = async () => {
        if (userProfile?.accountId && !isBalanceLoading) {
            console.log("userProfile.accountId",userProfile.accountId);
            await fetchAccountBalance(userProfile.accountId);
        }
    };

    const fetchUserProfile = useCallback(() => {
        getUserProfile({})
            .unwrap()
            .then((response) => {
                dispatch(setUserProfile(response));
                if (response.accountId) {
                    console.log("response.accountId",response.accountId);
                    fetchAccountBalance(response.accountId);
                    if (!response.evmAddress) {
                        saveAccountId({ accountId: response.accountId });
                    }
                } else {
                    router.push('/auth/wallet/blade');
                }
            })
            .catch((error: any) => {
                if (error.status === 403 && error.data.message == "User is not verified") {
                    router.push("/auth/verification");
                } else {
                    logOut()
                }
            });
    }, [router, dispatch, fetchAccountBalance, getUserProfile, logOut, saveAccountId]);

    useEffect(() => {
        if (authToken) {
            if (!userProfile && router.pathname != "/auth/signup") {
                fetchUserProfile();
            }
        } else {
            router.push('/auth/login');
        }
    }, [authToken, userProfile]);

    useEffect(() => {
        if (balanceSuccess && balanceData) {
            console.log("balanceData",balanceData);
            dispatch(setAccountBalance(balanceData));
        }
    }, [balanceSuccess, balanceData, dispatch]);

    return (
        <UserContext.Provider
            value={{
                refreshAccountBalance,
                accountBalance,
                authToken,
                userProfile,
                isAuthorized,
                globalSearch,
                isBalanceLoading,
                logOut,
                setOpenMoonPay,
                setGlobalSearch,
            }}
        >
            <MoonPay visible={openMoonPay} onClose={() => { if (openMoonPay) { setOpenMoonPay(false) } }} />
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;