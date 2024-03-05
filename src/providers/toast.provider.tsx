"use client";

import { ToastContainer, toast } from "react-toastify";
import { setError, selectError } from "@/reducers/error.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { useCallback, useEffect } from "react";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    const showError = useCallback(() => {
        if (error) {
            toast.error(error);
            dispatch(setError(null));
        }
    }, [error, dispatch]);

    useEffect(() => {
        showError()
    }, [error, showError]);
    return (
        <>
            {children}
            <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: 999999999999 }}
            />
        </>
    );
}