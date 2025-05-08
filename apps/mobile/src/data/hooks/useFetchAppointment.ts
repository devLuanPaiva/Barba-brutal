import { Appointment } from "@barba/core";
import useAPI from "./useAPI";
import { useCallback, useEffect, useState } from "react";

export default function useFetchAppointment(id: string | number) {
  const { httpGET } = useAPI();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const fetchAppointment = useCallback(
    async (id: string | number | null) => {
      try {
        const response = await httpGET(`appointment/${id}`);
        setAppointment(response);
      } catch (error) {
        console.error(error);
      }
    },
    [httpGET]
  );
  useEffect(() => {
    fetchAppointment(id);
  }, [id, fetchAppointment]);
  return {
    appointment,
  };
}
