'use client'
import Loading from "@/app/loading";
import { converter } from "@/app/utils";
import { CategoryComponentsList } from "@/constants/sections";
import { addComponent, getComponentById } from "@/database/templates/components";
import uploadImageToStorage from "@/lib/firebase/uploadToStorage";
import { COMPONENT_ID } from "@/providers/layoutProvider";
import { Button, Drawer, Empty, Popover, Space, message } from "antd";
import * as htmlToImage from 'html-to-image';
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCopyCheck, LuDownloadCloud, LuUploadCloud } from "react-icons/lu";
import { v4 as uuid } from "uuid";
import styles from './styles.module.scss';

function TemplateJsonRenderer({ openTemplateDrawer, templateDrawer }: any) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setisLoading] = useState(false);
    const paramss = useParams()
    const currentRole = useSearchParams().get("role")
    const { category, component } = paramss;
    const [templateData, setTemplateData] = useState<any>(null);

    useEffect(() => {
        if (category && component && currentRole == "admin") {
            getTemplateData();
        }
    }, []);

    const getTemplateData = async () => {

        const componentData = CategoryComponentsList.find(section => section.name == category)?.components.find(c => c.name == component)
        setisLoading(true)
        getComponentById(componentData?.id).then((templateData: any) => {
            setisLoading(false)
            if (templateData) {
                setTemplateData(templateData)
            }
        })
            .catch((error: any) => {
                console.log(error)
                setTemplateData(null)
                messageApi.open({
                    type: "error",
                    content: "Template Not Found",
                    duration: 3,
                });
                setisLoading(false);
            })
    };


    const onCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(templateData));
        messageApi.open({
            type: "success",
            content: "Template Data Copied to clipboard",
            duration: 3,
        });
    };

    const getElement = () => {
        const element: any = document.getElementById(COMPONENT_ID);
        return element.children[0]
    }

    const updateTemplateData = async () => {

        const dataBlob = await htmlToImage.toBlob(getElement(), {
            filter: (node: any) => (node.tagName !== 'i'),
            quality: 1
        })

        const componentData = CategoryComponentsList.find(section => section.name == category)?.components.find(c => c.name == component)

        setisLoading(true)
        uploadImageToStorage({
            componentId: componentData?.id,
            url: dataBlob,
            name: component,
        }).then((downloadableUrl: any) => {
            const json = {
                id: uuid(),
                componentName: component,
                category,
                componentId: componentData?.id,
                thumbnail: downloadableUrl,
                // ...converter(getElement()),//not nneeded to store in firebase
            };
            addComponent(json).then((data: any) => {
                setTemplateData({ ...json, thumbnail: downloadableUrl });
                messageApi.open({
                    type: "success",
                    content: "Template synced succesfully",
                    duration: 3,
                });
                console.log("Compponent synced:", { ...json, thumbnail: downloadableUrl })
                setisLoading(false);
            })

        })
    };

    const getLocalJson = async () => {
        const base64url = await htmlToImage.toPng(getElement(), {
            filter: (node: any) => (node.tagName !== 'i'),
            quality: 1
        })

        const componentData = CategoryComponentsList.find(section => section.name == category)?.components.find(c => c.name == component)
        const json = {
            id: uuid(),
            componentName: component,
            category,
            componentId: componentData?.id,
            thumbnail: base64url,
            ...converter(getElement()),
        };
        messageApi.open({
            type: "success",
            content: "Json generated succesfully, check console",
            duration: 3,
        });
        console.log("getLocalJson", json)
        if (currentRole !== "admin") {
            setTemplateData(json)
        }
    }

    const JSONPrettyPrint = (JSONData: any) => {
        const jsonData = JSON.stringify(JSONData, null, 2);
        return <pre>{jsonData}</pre>;
    };

    return (
        <Drawer
            title="Generated Template Version"
            onClose={() => openTemplateDrawer(false)}
            open={templateDrawer}
            styles={{
                content: { width: 400 },
                body: Boolean(templateData) ? { padding: 0 } : {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                footer: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }}
            footer={Boolean(templateData) && <Space>

                {currentRole == "admin" ? <>
                    <Button
                        icon={<LuUploadCloud />}
                        style={{ fontSize: 15 }}
                        onClick={updateTemplateData}
                        type="primary"
                        size="large"
                    >
                        Sync
                    </Button>
                    <Button
                        icon={<LuDownloadCloud />}
                        style={{ fontSize: 15 }}
                        onClick={getLocalJson}
                        type="primary"
                        size="large"
                    >
                        Gel JSON
                    </Button>
                    <Button
                        icon={<LuCopyCheck />}
                        style={{ fontSize: 15 }}
                        onClick={onCopy}
                        type="primary"
                        size="large"
                    >
                        Copy
                    </Button>
                </> :
                    <Button
                        icon={<LuCopyCheck />}
                        style={{ fontSize: 15 }}
                        onClick={getLocalJson}
                        type="primary"
                        size="large"
                        block
                    >
                        Sync Template
                    </Button>}
            </Space>}
        >
            {isLoading && <Loading />}
            {contextHolder}
            {Boolean(templateData) ? <>
                <Space direction="vertical" classNames={{ item: styles.templateDrawer }}>
                    <Popover
                        placement="left"
                        content={<>
                            <Image
                                style={{
                                    height: "auto",
                                }}
                                width={500} height={500}
                                src={templateData?.thumbnail} alt={""}
                            />
                        </>}>
                        <Image
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            width={370} height={350}
                            src={templateData?.thumbnail} alt={""}
                        />
                    </Popover>
                    {JSONPrettyPrint(templateData)}
                </Space>
            </> : <>
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    // imageStyle={{ height: 60 }}
                    description={
                        <span>
                            Template not synced
                        </span>
                    }
                >
                    <Button onClick={currentRole == "admin" ? updateTemplateData : getLocalJson} type="primary">Sync Now</Button>
                </Empty>
            </>}
        </Drawer>
    )
}

export default TemplateJsonRenderer