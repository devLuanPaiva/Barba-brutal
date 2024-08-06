import { BasePageProps } from "@/data/interfaces/BasePageProps.interface";
import Footer from "./Footer";

export default function Page(props: Readonly<BasePageProps>) {
  return (
    <div className="flex flex-col min-h-screen ">
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
