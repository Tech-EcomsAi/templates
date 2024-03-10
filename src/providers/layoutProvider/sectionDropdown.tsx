import Loading from "@/app/loading";
import { addSection, getSections } from "@/database/templates/sections";
import { Button, Divider, Input, Modal, Select, Space, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
const { Text } = Typography
let index = 0;

const SectionDropdown: React.FC = () => {

    const [sections, setSections] = useState<{ name: string, id: any }[]>([]);
    const [sectionName, setSectionName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        getSections().then((sections: any) => {
            if (Boolean(sections.length)) setSections(sections)
        })
    }, [])

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSectionName(event.target.value);
    };

    const handleOk = (e: any) => {
        if (!sectionName) {
            messageApi.open({
                type: "error",
                content: "Enter section Name",
                duration: 3,
            });
            return;
        }
        e.preventDefault();
        setisLoading(true);
        const sectionDetails = {
            name: sectionName,
            cretaedBy: "Admin"
        }
        addSection(sectionDetails).then((secId: any) => {
            setisLoading(false);
            if (secId) {
                messageApi.open({
                    type: "success",
                    content: "Section created successfully",
                    duration: 3,
                });
                setSections([...sections, { ...sectionDetails, id: secId }]);
                setSectionName("");
                setIsModalOpen(false);
            }
        })
    };

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <Select
                style={{ width: 150 }}
                placeholder="Sections"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                            <Button
                                type="link"
                                icon={<LuPlus />}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Add Section
                            </Button>
                        </Space>
                    </>
                )}
                options={sections.map((item) => ({ label: item.name, value: item.name }))}
            />
            <Modal
                styles={{
                    content: { width: 400 }
                }}
                title="Add new section"
                open={isModalOpen}
                okText="Add Section"
                onOk={handleOk}
                okButtonProps={{ icon: <LuPlus /> }}
                onCancel={() => setIsModalOpen(false)}
            >
                <Space direction="vertical">
                    <Divider style={{ margin: "8px 0" }} />
                    <Input
                        style={{ width: 300 }}
                        placeholder="Please enter section Name"
                        value={sectionName}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Text>To cretae new section you need to create folder with name that you entered in this input and add its components folder inside it</Text>
                    <Divider style={{ margin: "8px 0" }} />
                </Space>
            </Modal>
        </>
    );
};

export default SectionDropdown;
