import { CustomersItemProps } from "@barba/core";

export default function ItemCustomers(props: Readonly<CustomersItemProps>) {
  return (
    <>
      <h2 className="font-bold text-4xl text-white">{props.name}</h2>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {props.testimony}
      </p>
    </>
  );
}
