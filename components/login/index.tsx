import React, { useState } from "react";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import axios from "axios";
import { BASE_API_URL } from "../utils/config";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");
  const router = useRouter();
  const handleLogin = () => {
    axios
      .post(BASE_API_URL + "login", {
        email: email,
        password: password,
      })
      .then((res) => {
        login(res.data.data.id_user, res.data.data.token);
      });
  };
  return (
    <div>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh" }}
      >
        <Card css={{ mw: "420px", p: "20px" }} variant="bordered">
          <Text
            size={24}
            weight="bold"
            css={{
              as: "center",
              mb: "20px",
            }}
          >
            NextUI Login
          </Text>
          <Input
            aria-label="email"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={
              <Mail fill="currentColor" size={""} width={""} height={""} />
            }
          />
          <Spacer y={1} />
          <Input
            aria-label="password"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={
              <Password fill="currentColor" size={""} width={""} height={""} />
            }
            css={{ mb: "6px" }}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          <Button onPress={handleLogin}>Sign in</Button>
        </Card>
      </Container>
    </div>
  );
}
