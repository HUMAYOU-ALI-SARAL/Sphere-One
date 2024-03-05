"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { login as loginUser } from "@/reducers/user.slice";
import { useLoginMutation } from "@/api/userApi";
import { useAppDispatch } from "@/hooks/app";

import Button from "@/components/Common/Button";
import styles from "./styles.module.scss";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [login, { isLoading, isSuccess, data }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(loginUser(data));
      if (data.verified) {
        router.push((router.query.return as string) ?? `/profile`);
      } else {
        router.push("/auth/verification");
      }
    }
  }, [isSuccess]);

  return (
    <div className={`${styles.authForm} shadow rounded-lg`}>
      <p className="text-3xl py-3 text-left">{t("auth:sign_in")}</p>
      <form onSubmit={formik.handleSubmit}>
        <div className={`${styles.paraLink}`}>
          <label htmlFor="Name">{t("auth:email")}</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            autoComplete="on"
            className="focus:ring-orange-hover focus:border-orange-hover"
          />
          <div
            className={`text-red-500 h-[24px] ${formik.errors.email && formik.touched.email ? "visible" : "invisible"}`}
          >
            {formik.errors.email}
          </div>
        </div>
        <div className={`${styles.paraLink}`}>
          <label htmlFor="Name">{t("auth:password")}</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="on"
            className="focus:ring-orange-hover focus:border-orange-hover"
          />
          <Link
            href=""
            className="text-orange underline w-full flex justify-end pt-1"
          >
            {t("auth:forget_password")}
          </Link>
        </div>
        <p className={`${styles.paraLink}`}>
          {t("auth:by_clicking_the_button_you_agree")}{" "}
          <Link className="text-orange underline" href="">
            {t("auth:terms_of_service")}
          </Link>{" "}
          .
        </p>
        <Button
          disabled={formik.isSubmitting || isLoading}
          isLoading={formik.isSubmitting || isLoading}
          className="w-full mt-2 rounded"
          type="submit"
          label={t("auth:login")}
        />
      </form>
      <p className={`${styles.paraLink}`}>
        {t("auth:create_new_account")}?{" "}
        <Link className="text-orange underline" href="/auth/onboard">
          {t("auth:sign_up")}
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
