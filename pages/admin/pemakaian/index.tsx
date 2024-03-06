import type { NextPage } from "next";
import { Layout } from "../../../components/admin/layout/layout";
import LoadingScreen from "../../../components/loading";
import { useAuth } from "../../../context/AuthContext";
import PemakaianContent from "../../../components/admin/pemakaian";

const Pelanggan: NextPage = () => {
  const { user, hasAccess } = useAuth();
  if (!hasAccess(2)) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      <PemakaianContent />
    </Layout>
  );
};

export default Pelanggan;
