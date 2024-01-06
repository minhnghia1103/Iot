"use client";
import { UserAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
function AuthRouterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = UserAuth();
  console.log("user::", user);
  console.log("router::", pathname);
  // useEffect(() => {
  //   if (user) {
  //     if (pathname === "/login") {
  //       router.push("/dashboard");
  //     }
  //   } else {
  //     router.push("/login");
  //   }
  // }, [user]);

  return <div>{children}</div>;
}

export default AuthRouterLayout;
