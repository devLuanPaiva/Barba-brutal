'use client'
import Page from "@/components/shared/Page"

export default function Layout(props: any) {
    return <Page>{props.children} </Page>
    // Qualquer coisa que esteja dentro de landing page, estará envolvido como o componente Page.
}