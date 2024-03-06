import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Table,
  Text,
} from "@nextui-org/react";
import { NextPage } from "next";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Layout } from "../../../../components/admin/layout/layout";
import LoadingScreen from "../../../../components/loading";
import { useAuth } from "../../../../context/AuthContext";

const Invoice = () => {
  return (
    <Col span={12} css={{ minWidth: "600px" }}>
      <Row
        align="center"
        css={{
          backgroundColor: "$blue100",
          padding: "1em 2em",
          borderTopLeftRadius: "$md",
          borderTopRightRadius: "$md",
        }}
      >
        <Image
          width={"100px"}
          src="https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_1000,h_721/https://masago.id/wp-content/uploads/2019/12/logo-pdam-1000x721.png"
          alt="logo"
        />
        <Col css={{ marginLeft: "2em" }}>
          <Text weight={"bold"}>WANGSUHPADA</Text>
          <Text weight={"bold"}>
            Dusun Ngulu Kulon RT 04 RW 04, Desa Pracimantoro
          </Text>
          <Text weight={"bold"}>082220543303</Text>
        </Col>
      </Row>
      <Col css={{ padding: "2em" }}>
        <Row justify="space-between">
          <table style={{ fontSize: "0.8em" }}>
            <tbody>
              <tr>
                <td>Kode Pembayaran</td>
                <td>:</td>
                <td style={{ fontWeight: "bold" }}>PL-109099</td>
              </tr>
              <tr>
                <td>Nama Pelanggan</td>
                <td>:</td>
                <td>Budi Suharto</td>
              </tr>
              <tr>
                <td>Layanan</td>
                <td>:</td>
                <td>Air Bersih 1</td>
              </tr>
            </tbody>
          </table>
          <table style={{ fontSize: "0.8em" }}>
            <tbody>
              <tr>
                <td>Bulan</td>
                <td>:</td>
                <td>Januari</td>
              </tr>
              <tr>
                <td>Tahun</td>
                <td>:</td>
                <td>2002</td>
              </tr>
              <tr>
                <td>Tanggal Pembayaran</td>
                <td>:</td>
                <td>24 November 2022</td>
              </tr>
            </tbody>
          </table>
        </Row>
        <Col css={{ paddingTop: "2em" }}>
          <Table
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            shadow={false}
          >
            <Table.Header>
              <Table.Column css={{ display: "none" }}> </Table.Column>
              <Table.Column css={{ display: "none" }}> </Table.Column>
              <Table.Column css={{ display: "none" }}> </Table.Column>
              <Table.Column css={{ display: "none" }}> </Table.Column>
              <Table.Column css={{ display: "none" }}> </Table.Column>
            </Table.Header>
            <Table.Body css={{ fontSize: "0.8em" }}>
              <Table.Row>
                <Table.Cell
                  css={{
                    backgroundColor: "$blue100",
                    fontWeight: "$bold",
                  }}
                >
                  Metran Awal
                </Table.Cell>
                <Table.Cell
                  css={{
                    backgroundColor: "$blue100",
                    fontWeight: "$bold",
                  }}
                >
                  Meteran Akhir
                </Table.Cell>
                <Table.Cell
                  css={{
                    backgroundColor: "$blue100",
                    fontWeight: "$bold",
                  }}
                >
                  Total Pemakaian
                </Table.Cell>
                <Table.Cell
                  css={{
                    backgroundColor: "$blue100",
                    fontWeight: "$bold",
                  }}
                >
                  Harga Permeter
                </Table.Cell>
                <Table.Cell
                  css={{
                    backgroundColor: "$blue100",
                    fontWeight: "$bold",
                  }}
                >
                  Total Bayar
                </Table.Cell>
              </Table.Row>
              <Table.Row key={1}>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1</Table.Cell>
              </Table.Row>
              <Table.Row css={{ backgroundColor: "$blue100" }}>
                <Table.Cell> </Table.Cell>
                <Table.Cell> </Table.Cell>
                <Table.Cell> </Table.Cell>
                <Table.Cell> </Table.Cell>
                <Table.Cell>1</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Col>
      </Col>
      <Col css={{ padding: "2em 2em 6em 2em" }}>
        <Text css={{ fontSize: "0.8em" }}>Pracimantoro, 02 September 2022</Text>
        <Text css={{ fontSize: "0.8em" }}>Bagian Administrasi</Text>
      </Col>
      <style global jsx>{`
        @media print {
          @page {
            size: landscape 297mm 210mm;
          }
        }
      `}</style>
    </Col>
  );
};
const InvoicePage: NextPage = () => {
  const componentRef = useRef(null); // Initialize with null
  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null, // Return null if current is undefined
  });
  const { user, hasAccess } = useAuth();
  if (!hasAccess(2)) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      <Container css={{ padding: "2em" }}>
        <Col span={12}>
          <Button
            css={{ marginBottom: "2em", backgroundColor: "$blue700" }}
            onClick={handlePrint}
          >
            Print Invoice
          </Button>
          <Col
            css={{
              shadow: "$md",
              borderRadius: "$md",
              overflow: "scroll",
              "@md": { overflow: "hidden" },
            }}
          >
            <div ref={componentRef}>
              <Invoice />
            </div>
          </Col>
        </Col>
      </Container>
    </Layout>
  );
};

export default InvoicePage;
