import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { IoAddCircleOutline } from "react-icons/io5";
import { NumericFormat } from "react-number-format";

export const AddLayanan = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

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
              />
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix={"Rp "}
                customInput={Input}
                label="Tarif Layanan"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Tarif Layanan"
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
