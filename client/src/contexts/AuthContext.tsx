// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
//   onAuthStateChanged,
//   User,
// } from "firebase/auth";
// import { auth } from "@/firebase";
// import { useRouter } from "next/navigation";

// const AuthContext = createContext(
//   {} as {
//     user: UserType;
//     googleSignIn: () => void;
//     logout: () => void;
//   }
// );

// export type UserType = User | null;
// export const AuthContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<UserType>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const googleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       router.push("/dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       router.push("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);
//   return (
//     !loading && (
//       <AuthContext.Provider value={{ user, googleSignIn, logout }}>
//         {children}
//       </AuthContext.Provider>
//     )
//   );
// };

// export const UserAuth = () => useContext(AuthContext);
