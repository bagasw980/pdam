import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin");
  });
  return <Spinner />;
};

export default Home;
