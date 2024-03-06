import type { NextPage } from "next";
import Login from "../../components/login";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (!!user?.nama) {
    router.push("/admin");
    return;
  }
  return <Login />;
};

export default LoginPage;
