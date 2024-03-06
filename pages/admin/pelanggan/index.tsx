import type { NextPage } from "next";
import PelangganContent from "../../../components/admin/pelanggan";
import { Layout } from "../../../components/admin/layout/layout";
import LoadingScreen from "../../../components/loading";
import { useAuth } from "../../../context/AuthContext";

const Pelanggan: NextPage = () => {
  const { user, hasAccess } = useAuth();
  if (!hasAccess(2)) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      <PelangganContent />
    </Layout>
  );
};

export default Pelanggan;
