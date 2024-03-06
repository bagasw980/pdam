import { Button, Col, Input, Table } from "@nextui-org/react";

const UserDetail = () => {
  return (
    <Col>
      <Table css={{ maxWidth: "600px" }} shadow={false}>
        <Table.Header>
          <Table.Column css={{ display: "none" }}>Key</Table.Column>
          <Table.Column css={{ display: "none" }}>Separator</Table.Column>
          <Table.Column css={{ display: "none" }}>Value</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Kode Pelanggan</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell css={{ fontWeight: "bold" }}>PL-200102</Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Nama Pelanggan</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell>Budi Suranto</Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Layanan</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell>Layanan A</Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>Alamat</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell>
              Sawahan, Gedong, Kec. Pracimantoro, Kabupaten Wonogiri, Jawa
              Tengah 57664
            </Table.Cell>
          </Table.Row>
          <Table.Row key={5}>
            <Table.Cell>No Telepon</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell>082220542202</Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>Meter Awal</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell>7856</Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>Meter Akhir</Table.Cell>
            <Table.Cell>:</Table.Cell>
            <Table.Cell>
              <Input
                clearable
                underlined
                labelPlaceholder="Meter Akhir"
                type="number"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button css={{ ml: "$10" }}>Input Data</Button>
    </Col>
  );
};

export default UserDetail;
