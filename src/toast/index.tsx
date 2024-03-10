/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd';
import { useEffect } from 'react';
export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

function Toast({ value = "", type = "success" }: { value: any, type: NoticeType }) {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (value) {
            messageApi.open({
                type,
                content: value,
                duration: 3,
            });
        }
    }, [value])

    return (
        <>
            {contextHolder}
        </>
    )
}

export default Toast