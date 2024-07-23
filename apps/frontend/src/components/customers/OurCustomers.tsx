import customers from "@barba/core/src/constants/customers.constants"
import ItemCustomers from "./ItemCustomers"
import Title from "../shared/Title"
import { LayoutGrid } from "../ui/layout-grid"

export default function OurCustomers() {
    const classes = ['md:col-span-2', 'col-span-1', 'col-span-1', 'md:col-span-2']
    const cards = customers.map((customers, i) => {
        return {
            id: customers.id,
            content: <ItemCustomers name={customers.name} testimony={customers.testimony} />,
            className: classes[i],
            thumbnail: customers.imageURL,
        }
    })

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