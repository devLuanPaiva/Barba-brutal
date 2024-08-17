import { useSearchParams } from "next/navigation";
import useAPI from "./useAPI";
import { Appointment } from "@barba/core";
import { useCallback, useEffect, useState } from "react";

export default function useFetchAppointment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
    id,
    appointment,
  };
}
