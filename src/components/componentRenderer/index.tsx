'use client'
import { COMPONENT_ID } from '@/providers/layoutProvider';
import { Button, Space } from 'antd';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { LuLaptop, LuSmartphone } from 'react-icons/lu';
import styles from './styles.module.scss';

function ComponentRenderer({ Component }: any) {
    const [isMobile, setIsMobile] = useState(false);
    const paramss = useParams()
    const { category, component } = paramss;

    const changeDevice = () => {
        var viewport: any = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', "width = 1440");
        setIsMobile(!isMobile)
    }

    return (
        <>
            {Boolean(category) && Boolean(component) && <Space className={styles.componentRendererActions} align="center">
                <Button
                    size='large'
                    style={{ fontSize: 18 }}
                    icon={<LuSmartphone />}
                    onClick={changeDevice}
                    type={isMobile ? "primary" : "default"}
                />
                <Button
                    size='large'
                    style={{ fontSize: 18 }}
                    icon={<LuLaptop />}
                    onClick={changeDevice}
                    type={!isMobile ? "primary" : "default"}
                />
            </Space>}
            <div
                id={COMPONENT_ID}
                style={{ width: isMobile ? "420px" : "100%", boxShadow: "0 2px 10px rgba(222, 225, 236, 0.7764705882)" }}
                className="componentRenderer"
            >
                <Component />
            </div>
        </>
    )
}

export default ComponentRenderer