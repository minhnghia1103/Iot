"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { SignInDTO, SignUpDTO, UserType } from "@/utils/type";
import Cookies from "js-cookie";
const AuthContext = createContext<{
  user: UserType | null;
  signIn: (signInDto: SignInDTO) => void;
  signUp: (signUpDto: SignUpDTO) => void;
  logout: () => void;
}>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signIn = async (signInDto: SignInDTO) => {
    try {
      const res = await signInRequest(signInDto);
      setUser(res.user);
      Cookies.set("user", JSON.stringify(res.user), { expires: 1 }); // Add this line
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      Cookies.remove("user");
      router.push("/login");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async (signUpDto: SignUpDTO) => {
    try {
      const res = await signUpRequest(signUpDto);
      setUser(res.user);
      Cookies.set("user", JSON.stringify(res.user), { expires: 1 }); // Add this line
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      if (user && user.fullName && user.email) {
        setUser(user);
        setLoading(false);
      }
    }
  }, []);
  return (
    !loading && (
      <AuthContext.Provider value={{ user, signIn, signUp, logout }}>
        {children}
      </AuthContext.Provider>
    )
  );
};

const signInRequest = async (signInDto: SignInDTO) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ ...signInDto }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const signUpRequest = async (signUpDto: SignUpDTO) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...signUpDto }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
export const UserAuth = () => useContext(AuthContext);
