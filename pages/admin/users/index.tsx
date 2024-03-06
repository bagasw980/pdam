import type { NextPage } from "next";
import { Layout } from "../../../components/admin/layout/layout";
import UsersContent from "../../../components/admin/users";

const Users: NextPage = () => {
  return (
    <Layout>
      <UsersContent />
    </Layout>
  );
};
export default Users;
