// context/AuthContext.tsx

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import axios from "axios"; // Import Axios library
import { setCookie, deleteCookie, getCookie } from "cookies-next"; // Import cookie-next functions
import { BASE_API_URL } from "../components/utils/config";
import LoadingScreen from "../components/loading";

interface User {
  id_user: number;
  nama: string;
  no_telepon: string;
  email: string;
  level: number;
  alamat: string;
}

interface AuthContextType {
  user: User | null;
  login: (id_user: number, token: string) => void;
  logout: () => void;
  hasAccess: (level: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  // Fetch user data and verify level using Axios
  const fetchUserAndVerifyLevel = async (token: string) => {
    try {
      const response = await axios.get(
        BASE_API_URL + "current?id_user=" + user?.id_user,
        {
          headers: {
            Authorization: token,
          },
        }
      ); // Adjust API endpoint
      const userData: User = response.data.data;
      setUser(userData);
      router.push(router.pathname); // Redirect to protected page
    } catch (error) {
      setUser(null);
      deleteCookie("id_user");
      deleteCookie("token");
      router.push("/login"); // Redirect to login page if token verification fails
    } finally {
      setLoading(false); // Set loading to false after verification completes
    }
  };

  // useEffect(() => {
  //   // Check if user is logged in based on token in cookies
  //   // const token: any = getCookie("token");
  //   const token: any = getCookie("token");

  //   if (!token) {
  //     router.push("/login"); // Redirect to login page if no token is present
  //     setLoading(false); // Set loading to false
  //     return;
  //   }

  //   if (!user?.nama) {
  //     fetchUserAndVerifyLevel(token);
  //   } else {
  //     setLoading(false); // Set loading to false if user data is already available
  //   }
  // }, [router, user?.id_user, user?.nama]);

  if (loading) {
    // Render a loading indicator while verifying the user's level
    return <LoadingScreen />;
  }

  const login = (id_user: number, token: string) => {
    const oneDay = 24 * 60 * 60;
    // Set user data and token in context and cookies
    setCookie("id_user", id_user, { maxAge: oneDay });
    setCookie("token", token, { maxAge: oneDay });
    router.push("/admin"); // Redirect to protected component
  };

  const logout = () => {
    setUser(null);
    deleteCookie("id_user"); // Remove token from cookies if verification fails
    deleteCookie("token"); // Remove token from cookies if verification fails
    router.push("/login"); // Redirect to login page or home page
  };

  const hasAccess = (level: number) => {
    // return !!user && user.level >= level;
    return 2;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

// ...

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
