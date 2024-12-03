import Cookies from "js-cookie";
import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom"
import { navList } from "./layout-data";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { MenuIcon } from "../assets/icons/menu-icon";


const item = navList.map((item) => {
    return {
      key: item.id,
      label: <Link to={item.path}>{item.label}</Link>,
      icon: React.createElement(item.icon),
    };
  });

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const user = Cookies.get("token");
    if(!user) {
        return <Navigate replace to={"/"} />
    }
    return (
        <div className="wrapper">
      <Layout style={{ height: "100%" }}>
        <header style={{backgroundColor: "#001529", padding: "20px 0"}}>
          <Button style={{ backgroundColor: "transparent", border: "none", marginLeft: "200px" }} onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </Button>
        </header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={300}
            style={{minHeight: "calc(100vh - 80px)"}}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="dark"
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={item}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >


            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
    )
}