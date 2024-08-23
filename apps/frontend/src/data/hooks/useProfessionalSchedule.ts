import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import useUser from "./useUser";
import { Appointment } from "@barba/core";

export default function useProfessionalSchedule() {
  const { user } = useUser();
  const { httpGET, httpDELETE } = useAPI();
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = useCallback(async () => {
    if (!user) return;
    const dtString = date.toISOString().slice(0, 10);
    const appointments = await httpGET(`appointment/${user.id}/${dtString}`);
    setAppointments(appointments);
  }, [httpGET, user, date]);
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  async function deleteAppointment(id: number) {
    await httpDELETE(`appointment/${id}`);
    setAppointments(appointments.filter((a) => a.id !== id));
  }

  return {
    date,
    changeDate: setDate,
    appointments,
    deleteAppointment,
  };
}
