"use client";
import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import useUser from "./useUser";
import { Appointment } from "@barba/core";
import { useProfessionals } from "@barba/ui";
export default function useLoadSchedule() {
  const { user } = useUser();
  const { professional } = useProfessionals();
  const { httpGET, httpDELETE } = useAPI();
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadSchedule = useCallback(async () => {
    if (!user) return;
    const dtString = date.toISOString().slice(0, 10);

    if (user.barber) {
      const idProfession = professional.filter(
        (prof) => prof.name === user.name
      );
      const appointmentsBarber = await httpGET(
        `appointment/professional/${idProfession.map((prof) => prof.id)}/${dtString}`
      );
      setAppointments(appointmentsBarber);
    } else {
      const appointmentsUser = await httpGET(
        `appointment/user/${user?.email}/${dtString}`
      );
      setAppointments(appointmentsUser);
    }
  }, [user, httpGET, date, professional]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const deleteAppointment = async (id: number) => {
    await httpDELETE(`appointment/delete/${id}`);
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  return { date, changedDate: setDate, appointments, deleteAppointment };
}
