/* eslint-disable @next/next/no-img-element */
'use client'
import { CategoryComponentsList } from '@/constants/sections'
import { TemplatesContext } from '@/providers/layoutProvider'
import { Button, Card, Space } from 'antd'
import { Fragment, useCallback, useContext } from 'react'
import { LuFileEdit } from 'react-icons/lu'

function CategoryView({ category }: any) {
    console.log("category inside categoryView", category)
    const templatesList: any = useContext(TemplatesContext);
    const sctionsList: any = useCallback(
        () => {
            if (templatesList) {
                CategoryComponentsList.map((section) => {
                    section.components.map((component) => {
                        let savedState = templatesList.find((t: any) => t.componentId == component.id)
                        if (savedState) {
                            component.thumbnail = savedState.thumbnail;
                        } else {
                            component.thumbnail = 'https://firebasestorage.googleapis.com/v0/b/ecomsai-templates.appspot.com/o/templates%2F111%2Flogo.png?alt=media&token=78c45874-5ec8-43f1-b6a1-554f411dddd0';
                        }
                    })
                })
            }
            return CategoryComponentsList
        },
        [templatesList],
    )
    const activeCategory = sctionsList().find((section: any) => section.name == category)

    return (
        <Space style={{ width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }} wrap>
            {activeCategory?.components.map((component: any, i: number) => {
                return <Fragment key={i}>
                    <Card
                        cover={<img width={300} height={150} alt="example" src={component.thumbnail} />}
                        style={{ width: "100%", minWidth: 420, maxWidth: `calc(100vw / 3 - 40px)` }}
                        key={i}
                        title={component.name}
                        extra={<Button type="link" href={`${category}/${component.name}`} icon={<LuFileEdit />}> View</Button>}
                    >
                        {/* <ComponentRenderer Component={component.component} /> */}
                    </Card>
                </Fragment>
            })}
        </Space>
    )
}

export default CategoryView