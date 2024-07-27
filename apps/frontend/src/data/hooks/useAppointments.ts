import { useContext } from "react";
import { AppointmentContext } from "../contexts/AppointmentContext";

const useAppointment = () => useContext(AppointmentContext)
export default useAppointment