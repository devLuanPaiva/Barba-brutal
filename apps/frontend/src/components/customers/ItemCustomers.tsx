import ItemCustomersProps from "@/data/interfaces/ItemCustomersProps.interface";

export default function ItemCustomers(props: ItemCustomersProps){
    return (
        <article>
            <p className="font-bold text-4xl text-white">{props.name}</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                {props.testimony}
            </p>
        </article>
    )
}