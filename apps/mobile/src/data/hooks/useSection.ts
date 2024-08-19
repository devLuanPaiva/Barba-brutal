import { useContext } from "react";
import SectionContext from "../contexts/SectionContext";

const useSection = () => useContext(SectionContext)
export default useSection