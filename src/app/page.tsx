"use client";

import CategoryView from "@/components/categoryRenderer";
import { APP_LOGO } from "@/constants/common";
import { CategoryComponentsList } from "@/constants/sections";
import { ApplicationContext, TemplatesContext } from "@/providers/layoutProvider";
import type { CollapseProps } from 'antd';
import { Button, Collapse, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { LuFileEdit } from "react-icons/lu";
const { Text } = Typography

export default function Home() {
  const router = useRouter()

  const templatesList: any = useContext(TemplatesContext);
  const appcontext: any = useContext(ApplicationContext);
  console.log("appcontext", appcontext)
  const sctionsList: any = useCallback(
    () => {
      if (templatesList) {
        CategoryComponentsList.map((section) => {
          section.components.map((component) => {
            let savedState = templatesList.find((t: any) => t.componentId == component.id)
            if (savedState) {
              component.thumbnail = savedState.thumbnail;
            } else {
              component.thumbnail = APP_LOGO;
            }
          })
        })
      }
      return CategoryComponentsList
    },
    [templatesList],
  )
  console.log("templatesList inside app page", sctionsList())

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const getItems = () => {
    const items: CollapseProps['items'] = [];
    sctionsList().map((section: any, i: number) => {
      items.push({
        key: section.name,
        label: <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Text strong style={{ textTransform: "capitalize" }}>{section.name}</Text>
          <Button onClick={() => router.push(section.name)} icon={<LuFileEdit />}> View</Button>
        </Space>,
        children: <CategoryView category={section.name} />,
      },)
    })
    return items;
  }

  return <Collapse defaultActiveKey={sctionsList()[0].name} style={{ width: "100%" }} onChange={onChange} items={getItems()} />
}
