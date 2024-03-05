import { Dispatch } from "@reduxjs/toolkit";
import { setError } from "@/reducers/error.slice";

export const handleErrors = (errors: any, dispatch: Dispatch) => {
    if (Array.isArray((errors as any)?.data?.error)) {
        (errors as any).data.error.forEach((el: any) =>
            dispatch(setError(el.message))
        );
    } else if (Array.isArray((errors as any)?.data?.message)) {
        (errors as any).data.message.forEach((el: any) =>
            dispatch(setError(el))
        );
    } else if ((errors as any)?.data?.message) {
        dispatch(setError((errors as any)?.data?.message))
    } else if ((errors as any)?.error) {
        console.error(errors);
        dispatch(setError('Server is not available'))
    }
}