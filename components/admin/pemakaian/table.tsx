// @/src/App.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Container,
  Input,
  Spacer,
  Table,
  Pagination,
  Button,
  Row,
  Col,
  Text,
  Modal,
  Divider,
  Tooltip,
} from "@nextui-org/react";
// import { columns, rows } from "./data";
import { IconButton } from "../table/table.styled";
import { EyeIcon } from "../icons/table/eye-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { DeleteIcon } from "../icons/table/delete-icon";
import { Flex } from "../styles/flex";
import { formatRupiah } from "../../utils/config";
import { useRouter } from "next/router";

interface Row {
  id: number;
  id_pelanggan: number;
  nama_pelanggan: string;
  layanan: string;
  month: string;
  year: number;
  meter_awal: number;
  meter_akhir: number;
  pemakaian: number;
  tarif: number;
}

const columns = [
  {
    key: "no",
    label: "No",
  },
  {
    key: "id",
    label: "ID Transaksi",
  },
  {
    key: "client",
    label: "Pelanggan",
  },
  { key: "layanan", label: "Layanan" },
  { key: "date", label: "Bulan - Tahun" },
  { key: "start", label: "Meter Awal" },
  { key: "end", label: "Meter Akhir" },
  { key: "use", label: "Pemakaian" },
  { key: "taruf", label: "Tarif" },
  {
    key: "actions",
    label: "",
  },
];

export default function DataPemakaian({ search }: string) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [visibleDel, setVisibleDel] = useState(false);
  const [editData, setEditData] = useState<Row>({});
  const rowsPerPage: number = 2;
  const [rows, setRows] = useState([]);

  const pages: number = Math.ceil(rows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;

    if (rows.length > 0) {
      const attributes = Object.keys(rows[0]);

      const list: Row[] = [];

      for (const current of rows) {
        // Instead of looping through attributes, you can directly access the properties
        const value: string = current.nama_pelanggan;
        if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
          list.push(current);
        }
      }
      return list;
    }

    return [];
  }, [rows, searchTerm]);

  const closeHandler = () => setVisible(false);
  const closeHandlerDel = () => setVisibleDel(false);

  useEffect(() => {
    if (rows.length < 1) {
      const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const transactions = [];

      for (let i = 1; i <= 10; i++) {
        const id = i;
        const id_pelanggan = getRandomInt(1000, 9999);
        const nama_pelanggan = `Pelanggan ${i}`;
        const layanan = `Layanan ${getRandomInt(1, 5)}`;
        const monthIndex = getRandomInt(0, 11);
        const month = months[monthIndex];
        const year = 2023; // Change to the desired year
        const meter_awal = getRandomInt(100, 1000);
        const meter_akhir = getRandomInt(meter_awal, meter_awal + 1000);
        const pemakaian = meter_akhir - meter_awal;
        const randomThousand = getRandomInt(1, 10);
        const tarif = pemakaian * randomThousand * 1000;

        transactions.push({
          id,
          id_pelanggan,
          nama_pelanggan,
          layanan,
          month,
          year,
          meter_awal,
          meter_akhir,
          pemakaian,
          tarif,
        });
      }

      setRows(transactions);
    }
    setSearchTerm(search);
  }, [rows.length, search]);

  return (
    <Flex direction={"column"}>
      <Table
        lined
        headerLined
        shadow={false}
        aria-label="Tabel Pemakaian"
        css={{
          height: "auto",
          minWidth: "100%",
          mb: "$20",
        }}
      >
        <Table.Header>
          {columns.map((column) => (
            <Table.Column
              css={{ fontSize: "1em", color: "$blue600" }}
              key={column.key}
            >
              {column.label}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {filteredRows.map((row, index) => (
            <Table.Row key={row.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{"PM-" + row.id}</Table.Cell>
              <Table.Cell>
                <Col>
                  <Row>
                    <Text
                      b
                      size={14}
                      css={{ tt: "capitalize", color: "$accents7" }}
                    >
                      {"PL-" + row.id_pelanggan}
                    </Text>
                  </Row>
                  <Row>
                    <Text b size={13} css={{ tt: "capitalize" }}>
                      {row.nama_pelanggan}
                    </Text>
                  </Row>
                </Col>
              </Table.Cell>
              <Table.Cell>{row.layanan}</Table.Cell>
              <Table.Cell>
                {row.month} - {row.year}
              </Table.Cell>
              <Table.Cell>{row.meter_awal}</Table.Cell>
              <Table.Cell>{row.meter_akhir}</Table.Cell>
              <Table.Cell>{row.pemakaian}</Table.Cell>
              <Table.Cell>{formatRupiah(row.tarif.toString())}</Table.Cell>
              <Table.Cell>
                <Row
                  justify="center"
                  align="center"
                  css={{ gap: "$8", "@md": { gap: 0 } }}
                >
                  {" "}
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Details">
                      <IconButton
                        onClick={() => router.push("/admin/pemakaian/invoice")}
                      >
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Edit Layanan">
                      <IconButton
                        onClick={() => {
                          setEditData({
                            id: row.id,
                            nama_pelanggan: row.nama_pelanggan,
                            tarif: row.tarif,
                          });
                          setVisible(true);
                        }}
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip
                      content="Delete Layanan"
                      color="error"
                      onClick={() => {
                        setEditData({
                          id: row.id,
                          nama_pelanggan: row.nama_pelanggan,
                          tarif: row.tarif,
                        });
                        setVisibleDel(true);
                      }}
                    >
                      <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Pagination
          shadow
          css={{ marginTop: "20px" }}
          align="end"
          rowsPerPage={10}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Tambah Layanan Baru
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Nama Layanan"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Nama Layanan"
                value={editData?.nama_pelanggan}
              />
              <Input
                label="Tarif Layanan"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Tarif Layanan"
                value={editData?.tarif}
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title-1"
        width="600px"
        open={visibleDel}
        onClose={closeHandlerDel}
      >
        <Modal.Header css={{ justifyContent: "start", marginBottom: "$5" }}>
          <Text id="modal-title-1" h4>
            Yakin ingin menghapus {editData.nama_pelanggan}?
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button color={undefined} auto onClick={closeHandlerDel}>
            Cancel
          </Button>
          <Button color={"error"} auto onClick={closeHandlerDel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Flex>
  );
}
