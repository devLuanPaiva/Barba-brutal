import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import useUser from "./useUser";
import { Appointment } from "@barba/core";
import { useProfessionals } from "@barba/ui";

export default function useProfessionalSchedule() {
  const { user } = useUser();
  const { professional } = useProfessionals();
  const { httpGET, httpDELETE } = useAPI();
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = useCallback(async () => {
    if (!user) return;
    const idProfession = professional.filter((prof) => prof.name === user.name);
    const dtString = date.toISOString().slice(0, 10);
    const appointments = await httpGET(
      `appointment/${idProfession.map((prof) => prof.id)}/${dtString}`
    );
    setAppointments(appointments);
  }, [httpGET, user, date, professional]);
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  async function deleteAppointment(id: number) {
    await httpDELETE(`appointment/delete/${id}`);
    setAppointments(appointments.filter((a) => a.id !== id));
  }

  return {
    date,
    changeDate: setDate,
    appointments,
    deleteAppointment,
  };
}
