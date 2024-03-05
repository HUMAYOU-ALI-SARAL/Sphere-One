'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/app";
import { selectAuthToken } from "@/reducers/user.slice";
import AuthLayout from "./layouts/auth.layout";

export default function Home() {
  const router = useRouter();
  const authToken: any = useAppSelector(selectAuthToken);

  useEffect(() => {
    if (!authToken) {
      router.push('/auth/login');
    } else {
      router.push('/profile');
    }
  }, [authToken])

  return (
    <AuthLayout title="HomePage">
      <div className="w-full flex items-center justify-center" style={{ height: "100dvh" }}>
        <div className="text-orange text-7xl" >Welcome to Sphera World</div>
      </div>
    </AuthLayout>
  )
}