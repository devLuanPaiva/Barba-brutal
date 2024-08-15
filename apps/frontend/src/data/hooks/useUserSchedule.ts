'use client'
import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import useUser from "./useUser";
import { Appointment } from "@barba/core";

export default function useUserSchedule() {
  const { user } = useUser();
  const { httpGET } = useAPI();
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const loadAppointments = useCallback(async () => {
    if (!user || user.barber) return;
    const dtString = date.toISOString().slice(0, 10);
    const appointments = await httpGET(
      `appointment/${user?.email}/${dtString}`
    );
    setAppointments(appointments);
  }, [httpGET, user, date]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return { date, changedDate: setDate, appointments };
}
