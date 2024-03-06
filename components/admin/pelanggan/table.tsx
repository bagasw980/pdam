// @/src/App.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
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
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { IoQrCodeOutline } from "react-icons/io5";

interface Row {
  id: number;
  nama: string;
  layanan: string;
  alamat: string;
  no_telepon: string;
  meter_awal: number;
}

interface Props {
  search: string;
  data: Row[];
}

const columns = [
  {
    key: "no",
    label: "No",
  },
  {
    key: "name",
    label: "Nama Pelanggan",
  },
  {
    key: "service",
    label: "Layanan",
  },
  {
    key: "address",
    label: "Alamat",
  },
  {
    key: "telephone",
    label: "No Telepon",
  },
  {
    key: "meter",
    label: "Meter Akhir",
  },
  {
    key: "actions",
    label: "",
  },
];

export default function DataPelanggan({ search, data }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [visibleDel, setVisibleDel] = useState(false);
  const [editData, setEditData] = useState<Row>({
    id: 0,
    nama: "",
    layanan: "",
    alamat: "",
    no_telepon: "",
    meter_awal: 0,
  });
  const rowsPerPage: number = 2;
  const [rows, setRows] = useState(data);
  const printRef = useRef();
  const [QRID, setQRID] = useState("");

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
        const value: string = current.nama;
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
  const handleQRGenerator = (id: string) => {
    setQRID(id);
    handleDownloadImage();
  };
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "QR - " + QRID + ".jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  return (
    <Flex direction={"column"}>
      <Table
        lined
        headerLined
        shadow={false}
        aria-label="Tabel Pelanggan"
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
              <Table.Cell>{row.nama}</Table.Cell>
              <Table.Cell>{row.layanan}</Table.Cell>
              <Table.Cell>{row.alamat}</Table.Cell>
              <Table.Cell>{row.no_telepon}</Table.Cell>
              <Table.Cell>{row.meter_awal}</Table.Cell>
              <Table.Cell>
                <Row
                  justify="center"
                  align="center"
                  css={{ gap: "$8", "@md": { gap: 0 } }}
                >
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Download QR Code">
                      <IconButton
                        onClick={() => {
                          handleQRGenerator();
                        }}
                      >
                        <IoQrCodeOutline color="#979797" />
                      </IconButton>
                    </Tooltip>
                  </Col>
                  <Col css={{ d: "flex" }}>
                    <Tooltip content="Edit Layanan">
                      <IconButton
                        onClick={() => {
                          setEditData({
                            id: row.id,
                            nama: row.nama,
                            layanan: row.layanan,
                            alamat: row.alamat,
                            no_telepon: row.no_telepon,
                            meter_awal: row.meter_awal,
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
                          nama: row.nama,
                          layanan: row.layanan,
                          alamat: row.alamat,
                          no_telepon: row.no_telepon,
                          meter_awal: row.meter_awal,
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
                value={editData?.nama}
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
            Yakin ingin menghapus {editData.nama}?
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
      <div
        ref={printRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // position: "absolute",
          // left: 20000,
          height: "auto",
          margin: "0 auto",
          maxWidth: 300,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={QRID}
          viewBox={`0 0 256 256`}
        />
        <Text>PL-{QRID}</Text>
      </div>
    </Flex>
  );
}
