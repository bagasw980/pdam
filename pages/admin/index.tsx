import type { NextPage } from "next";
import { Content } from "../../components/admin/home/content";
import { Layout } from "../../components/admin/layout/layout";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import LoadingScreen from "../../components/loading";

const Admin: NextPage = () => {
  const { user, hasAccess } = useAuth();
  if (!hasAccess(2)) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Admin;
