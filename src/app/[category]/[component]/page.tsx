'use client'
import BackButton from "@/components/backButton";
import ComponentRenderer from "@/components/componentRenderer";
import { CategoryComponentsList } from "@/constants/sections";

function page(props: any) {

    const { category, component } = props.params;

    const activeComponent = CategoryComponentsList.find(section => section.name == category)?.components.find(c => c.name == component)
    const Component: any = activeComponent?.component;

    return (
        <>
            <BackButton link={`/${category}`} />
            <ComponentRenderer Component={Component} />
        </>
    )
}

export default page