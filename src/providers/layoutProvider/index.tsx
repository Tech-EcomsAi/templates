"use client";

import TemplateJsonRenderer from "@/components/templateJsonRenderer";
import { Button, Layout, Space, Typography, theme } from "antd";
import Head from "next/head";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { LuFileJson, LuHome, LuSunMoon } from "react-icons/lu";
import AnimatedLogo from "../../components/animatedLogo";
import AntdThemeProvider from "../antdThemeProvider/antdThemeProvider";
import styles from "./layout.module.scss";

const { Text } = Typography
const { Header, Content, Sider } = Layout;

export const COMPONENT_ID = "ecoms.ai-component";
export const TemplatesContext = createContext(null);
export const ApplicationContext = createContext(null);

function LayoutProvider({ templatesList, children }: any) {
  const { token } = theme.useToken();
  const [templateDrawer, openTemplateDrawer] = useState(false);
  const router = useRouter()
  const pathname = usePathname()
  console.log("templatesList inside layout provider", templatesList);
  const [applicationState, setApplicationState] = useState<any>({
    isDarkMode: false
  })
  const paramss = useParams()

  const { component } = paramss;

  return (
    <>
      <ApplicationContext.Provider value={applicationState}>
        <AntdThemeProvider isDarkMode={applicationState.isDarkMode}>
          <div className={styles.bgWrapContainer}>
            <div className={styles.bgWrap} style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${token.colorBorder} 1px, transparent 0)`,
              backgroundSize: '40px 28px'
            }}>
            </div>
          </div>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          </Head>
          <Layout>
            <Header
              className={styles.headerWrap}
              style={{ backgroundColor: !applicationState.isDarkMode ? token.colorTextBase : token.colorBgBase }}
            >
              <Space
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                styles={{ item: { height: 64 } }}
              >
                <Space
                  onClick={() => router.push("/")}
                  style={{
                    width: "167px",
                    height: "68px",
                    paddingTop: "22px",
                    paddingLeft: "29px",
                  }}>
                  <AnimatedLogo color={applicationState.isDarkMode ? token.colorTextBase : token.colorBgBase} />
                </Space>
                <Space>
                  <Button onClick={() => router.push("/")} icon={<LuHome />} />
                  <Button style={{ textTransform: "capitalize" }}> Current Page: {"<"} {pathname} {">"}</Button>
                </Space>
                <Space className={styles.actions} align="center">
                  {component && <>
                    <Button
                      style={{ fontSize: 15 }}
                      icon={<LuFileJson />}
                      onClick={() => openTemplateDrawer(!templateDrawer)}
                    />
                  </>}
                  <Button
                    style={{ fontSize: 15 }}
                    icon={<LuSunMoon />}
                    onClick={() => setApplicationState({ ...applicationState, isDarkMode: !applicationState.isDarkMode })}
                  />
                </Space>
              </Space>
            </Header>

            <Layout className={styles.layoutWrapper} style={{ marginTop: 74 }}>
              <Content className={styles.uiWrapper}
                style={{
                  justifyContent: component ? "center" : "flex-start",
                  alignItems: component ? "center" : "flex-start"
                }}
              >
                <TemplatesContext.Provider value={templatesList}>
                  {children}
                </TemplatesContext.Provider>
              </Content>
            </Layout>

            {Boolean(component) && <TemplateJsonRenderer
              openTemplateDrawer={openTemplateDrawer}
              templateDrawer={templateDrawer}
            />}
          </Layout>
        </AntdThemeProvider>
      </ApplicationContext.Provider>
    </>
  );
}

export default LayoutProvider;
