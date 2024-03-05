'use client'
import { useTranslate } from "@/providers/translate.provider";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useEffect } from "react";
import Button from "@/components/Common/Button";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "@/api/userApi";

const PasswordTab = () => {
    const { _t } = useTranslate();

    const [changePassword, { isSuccess, data, isLoading }] = useChangePasswordMutation()

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required(_t("Required field")),
        newPassword: Yup.string().required(_t("Required field")),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await changePassword(values);
        },
    });

    useEffect(() => {
        if (isSuccess && data) {
            toast.success(_t("Success"));
        }
    }, [isSuccess, data]);

    return (
        <div className="">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className="flex">
                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="block mb-2 text-14 font-dm font-medium text-orange"
                            >
                                {_t("Current Password")}
                            </label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.oldPassword}
                                autoComplete="on"
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="**************"
                                className="border h-11 w-80 bg-transparent placeholder-sp-gray-400 border-sp-gray-300 text-sm rounded-lg focus:ring-orange-hover focus:border-orange block"
                            />
                            <div
                                className={`text-red-500 h-[24px] ${formik.errors.oldPassword && formik.touched.oldPassword ? "visible" : "invisible"}`}
                            >
                                {formik.errors.oldPassword}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="newPassword"
                            className="block mb-2 text-14 font-dm font-medium text-orange"
                        >
                            {_t("New Password")}
                        </label>

                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            autoComplete="on"
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="**************"
                            className="h-11 w-80 bg-transparent placeholder-sp-gray-400 border-sp-gray-300 text-sm rounded-lg focus:ring-orange-hover focus:border-orange block"
                        />
                        <div
                            className={`text-red-500 h-[24px] ${formik.errors.newPassword && formik.touched.newPassword ? "visible" : "invisible"}`}
                        >
                            {formik.errors.newPassword}
                        </div>
                    </div>

                    <div className="mt-8">
                        <label
                            htmlFor="2fa"
                            className="block mb-2 text-14 font-dm font-medium text-orange"
                        >
                            {_t("2FA Verification")}
                        </label>

                        <input
                            disabled
                            type="text"
                            id="2fa"
                            name="2fa"
                            placeholder="0123456"
                            className="h-11 w-80 cursor-not-allowed bg-transparent placeholder-sp-gray-400 border-sp-gray-300 text-sm rounded-lg focus:ring-orange-hover focus:border-orange block"
                        />
                    </div>

                    <div className="mt-10 space-x-2 flex">
                        <Button
                            type="submit"
                            disabled={formik.isSubmitting || isLoading}
                            isLoading={formik.isSubmitting || isLoading}
                            className="text-white rounded-lg h-10 font-dm text-14 w-20"
                            label={_t("Save")}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default PasswordTab;