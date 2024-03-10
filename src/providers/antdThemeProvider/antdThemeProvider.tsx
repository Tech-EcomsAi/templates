"use client";
import { APP_THEME_COLOR } from "@/constants/common";
import { ConfigProvider, theme } from "antd";
import en_US from "antd/locale/en_US";
import { Inter } from "next/font/google";

export const INTER_FONT = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const AntdThemeProvider = ({ isDarkMode, children }: any) => {
  const { token } = theme.useToken();
  console.log(`
  ᴾʳᵉˢᵉⁿᵗⁱⁿᵍ ʸᵒᵘ...
                 🇪‌🇨‌🇴‌🇲‌🇸‌🇦‌🇮‌          
    💜  🇹‌🇭‌🇪‌ 🇪‌🇻‌🇪‌🇷‌🇾‌🇹‌🇭‌🇮‌🇳‌🇬‌ 🇦‌🇵‌🇵‌  💜   
  `);

  return (
    <>
      <ConfigProvider
        // direction="rtl"
        locale={en_US}
        theme={{
          // algorithm: theme.defaultAlgorithm,
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: isDarkMode ? '#3bceac' : APP_THEME_COLOR,
            borderRadius: 5,
            wireframe: false,
            fontSize: 13,
            fontFamily: "__Inter_aaf875",
          },
          components: {
            Menu: {
              itemSelectedBg: token.colorPrimaryBg,
            },
            Tooltip: {
              paddingXS: 14,
            },
            Segmented: {
              fontSize: 12,
              fontSizeLG: 13,
              controlHeight: 28,
              borderRadiusXS: 4,
              controlPaddingHorizontalSM: 10,
            },
            Button: {
              contentFontSize: 13,
              // colorBorder: "transperant"
            },
            Drawer: {
              padding: 10,
              paddingLG: 15,
            },
            Collapse: {
              // headerBg: token.colorBgLayout
            },
            Typography: {
              fontFamilyCode: INTER_FONT.style.fontFamily,
            },
            Dropdown: {
              fontSize: 14,
            },
            Switch: {
              handleSize: 20,
              trackHeight: 30,
              trackMinWidth: 60,
              trackPadding: 5,
            },
          },
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 4,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </ConfigProvider>
    </>
  );
};

export default AntdThemeProvider;
