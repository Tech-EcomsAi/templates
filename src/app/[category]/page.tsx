'use client'
import BackButton from "@/components/backButton";
import CategoryView from "@/components/categoryRenderer";
import { Card, Space, Typography } from "antd";
;
const { Text } = Typography

function page(props: any) {

    const category = props.params.category;

    return (
        <Space align="center" style={{ width: "100%" }}>
            <Card title={<Space style={{ width: "100%" }}>
                <BackButton link={"/"} />
                <Text strong style={{ width: "100%", textTransform: "capitalize", paddingLeft: 40 }}>{category} Category</Text>
            </Space>
            }>
                <CategoryView category={props.params.category} />
            </Card>
        </Space>
    )
}

export default page