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
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { Flex } from "../styles/flex";
import { AddLayanan } from "./add";
import { TableWrapper } from "../table/table";
import DataLayanan from "./table";
import { IoConstructOutline } from "react-icons/io5";

export const LayananContent = () => {
  const [search, setSearch] = useState<string>("");
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
          <IoConstructOutline color={"#666"} />
          <CrumbLink href="/admin/Layanan">Layanan</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Daftar Layanan</Text>
      <Flex
        css={{ gap: "$8", marginBottom: "20px" }}
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
            css={{ width: "100%", maxW: "410px" }}
            placeholder="Cari layanan"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddLayanan />
          <Button auto iconRight={<ExportIcon />}>
            Export to CSV
          </Button>
        </Flex>
      </Flex>

      {/* <TableWrapper /> */}
      <DataLayanan search={search} />
    </Flex>
  );
};
