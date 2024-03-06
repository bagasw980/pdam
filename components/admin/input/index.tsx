import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Link from "next/link";
import { Text, Col, Button, Input } from "@nextui-org/react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { DotsIcon } from "../icons/accounts/dots-icon";
import { ExportIcon } from "../icons/accounts/export-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { TrashIcon } from "../icons/accounts/trash-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { Flex } from "../styles/flex";
import UserDetail from "./table";
import { IoSendOutline } from "react-icons/io5";

const InputContent = () => {
  const [scanStatus, setScanStatus] = useState(true);
  const [scanCam, setScanCam] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      alert(id);
    }
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
            <CrumbLink>Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <CrumbLink>Input Data</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Input Pemakaian</Text>

      {scanStatus === true ? (
        <Col css={{ maxWidth: "600px" }}>
          <Button
            css={{ marginBottom: "$10" }}
            onClick={() => setScanCam(!scanCam)}
            color="success"
          >
            Ubah Metode Input
          </Button>
          {scanCam === true ? (
            <QrScanner
              onDecode={(result) => {
                alert("Scan Berhasl");
                setScanStatus(false);
              }}
              onError={(error) => console.log(error?.message)}
            />
          ) : (
            <Col>
              <Input
                labelLeft="PL"
                label="Kode Pelanggan"
                type="number"
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleKeyDown}
                contentRight={
                  <Button
                    auto
                    rounded
                    light
                    color="success"
                    icon={<IoSendOutline />}
                    onClick={() => setScanStatus(false)}
                  />
                }
              />
            </Col>
          )}
        </Col>
      ) : (
        <UserDetail />
      )}
    </Flex>
  );
};
export default InputContent;
