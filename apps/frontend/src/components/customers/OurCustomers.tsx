import { customers } from "@barba/core"
import ItemCustomers from "./ItemCustomers"
import Title from "../shared/Title"
import { LayoutGrid } from "../ui/layout-grid"

export default function OurCustomers() {
    const classes = ['md:col-span-2', 'col-span-1', 'col-span-1', 'md:col-span-2']
    const cards = customers && Array.isArray(customers) ? customers.map((customer, i) => {
        return {
            id: customer.id,
            content: <ItemCustomers name={customer.name} testimony={customer.testimony} />,
            className: classes[i % classes.length],
            thumbnail: customer.imageURL,
        }
    }) : []

    return (
        <div className="container flex flex-col items-center gap-16">
            <Title
                tag="Clientes"
                primary="Quem Manda Aqui"
                secondary="Nossos clientes são os chefes! Aqui, eles mandam, desmandam e ainda saem com estilo de rockstar!"
            />
            <div className="h-[900px] w-full">
                <LayoutGrid cards={cards} />
            </div>
        </div>
    )
}