import { Button, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { DotsIcon } from "../icons/accounts/dots-icon";
import { ExportIcon } from "../icons/accounts/export-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { TrashIcon } from "../icons/accounts/trash-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import DataPemakaian from "./table";
import exportToExcel from "../../utils/exportToExcel";
import { IoReceipt } from "react-icons/io5";

const PemakaianContent = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState([
    {
      id: 1,
      nama: "John Doe",
      layanan: "Layanan A",
      alamat: "Jl. Ahmad Yani No. 123",
      no_telepon: "081234567890",
      meter_awal: 1000,
    },
    {
      id: 2,
      nama: "Jane Smith",
      layanan: "Layanan B",
      alamat: "Jl. Sudirman No. 456",
      no_telepon: "082345678901",
      meter_awal: 750,
    },
    {
      id: 3,
      nama: "David Johnson",
      layanan: "Layanan C",
      alamat: "Jl. Gatot Subroto No. 789",
      no_telepon: "083456789012",
      meter_awal: 1200,
    },
    {
      id: 4,
      nama: "Emily Williams",
      layanan: "Layanan D",
      alamat: "Jl. Merdeka No. 234",
      no_telepon: "084567890123",
      meter_awal: 900,
    },
    {
      id: 5,
      nama: "Michael Brown",
      layanan: "Layanan E",
      alamat: "Jl. Asia No. 567",
      no_telepon: "085678901234",
      meter_awal: 1500,
    },
    {
      id: 6,
      nama: "Olivia Jones",
      layanan: "Layanan F",
      alamat: "Jl. Europe No. 890",
      no_telepon: "086789012345",
      meter_awal: 600,
    },
    {
      id: 7,
      nama: "William Lee",
      layanan: "Layanan G",
      alamat: "Jl. Africa No. 123",
      no_telepon: "087890123456",
      meter_awal: 150,
    },
    {
      id: 8,
      nama: "Sophia Martinez",
      layanan: "Layanan H",
      alamat: "Jl. Australia No. 456",
      no_telepon: "088901234567",
      meter_awal: 850,
    },
    {
      id: 9,
      nama: "James Taylor",
      layanan: "Layanan I",
      alamat: "Jl. Antarctica No. 789",
      no_telepon: "089012345678",
      meter_awal: 1100,
    },
    {
      id: 10,
      nama: "Ava Anderson",
      layanan: "Layanan J",
      alamat: "Jl. South America No. 101",
      no_telepon: "089123456789",
      meter_awal: 1800,
    },
  ]);

  const handleExport = () => {
    exportToExcel(data, "data_export");
  };
  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <IoReceipt color="#666" />
          <CrumbLink href="/admin/pelanggan">Pemakaian</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Daftar Pemakaian</Text>
      <Flex
        css={{ gap: "$8" }}
        align={"center"}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            "@sm": { flexWrap: "nowrap" },
          }}
          align={"center"}
        >
          <Input
            clearable
            css={{ width: "100%", maxW: "410px" }}
            placeholder="Cari pelanggan"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <Button auto iconRight={<ExportIcon />} onClick={handleExport}>
            Export to Excel
          </Button>
        </Flex>
      </Flex>

      <DataPemakaian search={search} />
    </Flex>
  );
};

export default PemakaianContent;
