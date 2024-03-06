import React, { useEffect, useState } from "react";
import { Box } from "../styles/box";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { useRouter } from "next/router";
import {
  IoConstructOutline,
  IoGridOutline,
  IoPeopleOutline,
  IoReceipt,
  IoQrCodeOutline,
  IoPersonOutline,
} from "react-icons/io5";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <CompaniesDropdown />
        </Sidebar.Header>
        <Flex direction={"column"} justify={"between"} css={{ height: "100%" }}>
          <Sidebar.Body className="body sidebar">
            <SidebarItem
              title="Dashboard"
              icon={
                <IoGridOutline
                  size={"1.5em"}
                  color={path === "/admin" ? "#0072F5" : "#666"}
                />
              }
              isActive={path === "/admin"}
              href="/admin"
            />

            <SidebarMenu title="Menu">
              <SidebarItem
                isActive={path === "/admin/users"}
                title="Users"
                icon={
                  <IoPersonOutline
                    size={"1.5em"}
                    color={path === "/admin/users" ? "#0072F5" : "#666"}
                  />
                }
                href="/admin/users"
              />
              <SidebarItem
                isActive={path === "/admin/layanan"}
                title="Layanan"
                icon={
                  <IoConstructOutline
                    size={"1.5em"}
                    color={path === "/admin/layanan" ? "#0072F5" : "#666"}
                  />
                }
                href="/admin/layanan"
              />
              <SidebarItem
                isActive={path === "/admin/pelanggan"}
                title="Pelanggan"
                icon={
                  <IoPeopleOutline
                    size={"1.5em"}
                    color={path === "/admin/pelanggan" ? "#0072F5" : "#666"}
                  />
                }
                href="/admin/pelanggan"
              />

              <SidebarItem
                isActive={
                  path === "/admin/pemakaian" ||
                  path === "/admin/pemakaian/invoice"
                }
                title="Pemakaian"
                icon={
                  <IoReceipt
                    size={"1.5em"}
                    color={
                      path === "/admin/pemakaian" ||
                      path === "/admin/pemakaian/invoice"
                        ? "#0072F5"
                        : "#666"
                    }
                  />
                }
                href="/admin/pemakaian"
              />
              <SidebarItem
                isActive={path === "/admin/input"}
                title="Input Data"
                icon={
                  <IoQrCodeOutline
                    size={"1.5em"}
                    color={path === "/admin/input" ? "#0072F5" : "#666"}
                  />
                }
                href="/admin/input"
              />
            </SidebarMenu>
            {/* <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={router.pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={router.pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />

              <SidebarItem
                isActive={router.pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={router.pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={router.pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </Sidebar.Body>
        </Flex>
      </Sidebar>
    </Box>
  );
};
