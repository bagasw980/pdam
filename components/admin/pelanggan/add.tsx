import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Dropdown,
} from "@nextui-org/react";
import React, { useState, useMemo } from "react";
import { Flex } from "../styles/flex";
import { IoAddCircleOutline } from "react-icons/io5";

export const AddPelanggan = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const [layanan, setLayanan] = useState([
    {
      id: 1,
      name: "Layanan A",
      tarif: 50000,
    },
    {
      id: 2,
      name: "Layanan B",
      tarif: 75000,
    },
    {
      id: 3,
      name: "Layanan C",
      tarif: 120000,
    },
    {
      id: 4,
      name: "Layanan D",
      tarif: 90000,
    },
    {
      id: 5,
      name: "Layanan E",
      tarif: 200000,
    },
    {
      id: 6,
      name: "Layanan F",
      tarif: 60000,
    },
    {
      id: 7,
      name: "Layanan G",
      tarif: 150000,
    },
    {
      id: 8,
      name: "Layanan H",
      tarif: 85000,
    },
    {
      id: 9,
      name: "Layanan I",
      tarif: 110000,
    },
    {
      id: 10,
      name: "Layanan J",
      tarif: 180000,
    },
  ]);
  const [selected, setSelected] = useState(new Set(["Layanan"]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const closeHandler = () => setVisible(false);
  return (
    <div>
      <Button
        auto
        onClick={handler}
        iconRight={<IoAddCircleOutline size={"1.5em"} />}
      >
        Tambah
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Tambah Pelanggan Baru
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
                label="Nama Pelanggan"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Nama Pelanggan"
              />
              <Input
                label="Meteran Akhir"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Meteran Akhir"
              />
            </Flex>

            <Flex
              align="end"
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="No Telepon"
                clearable
                bordered
                size="lg"
                placeholder="No Telepon"
              />
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="primary"
                  css={{ tt: "capitalize" }}
                >
                  {selectedValue === "Layanan"
                    ? selectedValue
                    : layanan[selectedValue].name}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  {layanan.map((item, index) => {
                    return (
                      <Dropdown.Item key={index}>{item.name}</Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Alamat"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Alamat"
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
    </div>
  );
};
