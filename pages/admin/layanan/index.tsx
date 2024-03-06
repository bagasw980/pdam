import { NextPage } from "next";
import { Layout } from "../../../components/admin/layout/layout";
import { LayananContent } from "../../../components/admin/layanan";
import LoadingScreen from "../../../components/loading";
import { useAuth } from "../../../context/AuthContext";

const Layanan: NextPage = () => {
  const { user, hasAccess } = useAuth();
  if (!hasAccess(2)) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      <LayananContent />
    </Layout>
  );
};
export default Layanan;
