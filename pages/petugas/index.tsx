import { useState } from "react";
import { Layout } from "../../components/admin/layout/layout";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { Card, Text } from "@nextui-org/react";

interface DashboardProps {
  // Add any additional props that the Dashboard component expects to receive
  username: string;
}

const Petugas = (props: DashboardProps) => {
  const [result, setResult] = useState("");
  return (
    <Layout username={props.username}>
      <Card css={{ mw: "400px" }}>
        <Card.Header>
          <Text>{result}</Text>
        </Card.Header>
        <Card.Body>
          {result.length < 1 ? (
            <QrScanner
              onDecode={(result) => setResult(result)}
              onError={(error) => console.log(error?.message)}
            />
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Petugas;
