import AppointmentContextProps from "../interfaces/AppointmentContextProps.interface";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Professional, Service, UtilsDate, UtilsSchedule } from "@barba/core";
import useUser from "../hooks/useUser";
import useAPI from "../hooks/useAPI";

export const AppointmentContext = createContext({} as AppointmentContextProps);
export function AppointmentProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [date, setDate] = useState<Date>(UtilsDate.today());
  const { user } = useUser();
  const [occupiedSchedules, setOccupiedSchedules] = useState<string[]>([]);
  const { httpGET, httpPOST, httpPUT } = useAPI();

  const selectProfessional = useCallback((professional: Professional) => {
    setProfessional(professional);
  }, []);

  const selectServices = useCallback((services: Service[]) => {
    setServices(services);
  }, []);

  const totalDuration = useCallback(() => {
    return UtilsSchedule.durationTotal(services);
  }, [services]);

  const totalPrice = useCallback(() => {
    return services.reduce((acc, current) => acc + current.price, 0);
  }, [services]);

  const selectDate = useCallback((date: Date) => {
    setDate(date);
  }, []);

  const numberOfSlots = useCallback(() => {
    return services.reduce((acc, service) => acc + service.amountSlots, 0);
  }, [services]);


  const clear = useCallback(() => {
    setDate(UtilsDate.today());
    setOccupiedSchedules([]);
    setProfessional(null);
    setServices([]);
  }, []);

  const schedule = useCallback(async () => {
    if (!user?.email) return;
    await httpPOST('appointment', {
      user: user,
      date: date,
      professional: professional!,
      services: services,
    });
    clear();
  }, [date, professional, services, user, httpPOST, clear]);

  const getOccupiedSchedules = useCallback(
    async function (date: Date, professional: Professional): Promise<string[]> {
      try {
        if (!date || !professional) return [];
        const dateString = date.toISOString().slice(0, 10);
        const occupancy = await httpGET(
          `appointment/occupancy/${professional.id}/${dateString}`,
        );
        return Array.isArray(occupancy) ? occupancy : [];
      } catch (e) {
        return [];
      }
    },
    [httpGET],
  );

  useEffect(() => {
    if (!date || !professional) return;
    getOccupiedSchedules(date, professional).then((schedules) => {
      if (Array.isArray(schedules)) {
        setOccupiedSchedules(schedules);
      } else {
        setOccupiedSchedules([]);
      }
    });
  }, [date, professional, getOccupiedSchedules]);

  const updateSchedule = useCallback(async (id: number | string) => {
    if (!user?.email) return
    await httpPUT(`appointment/update/${id}`, {
      date: date,
      professional: professional!,
      services: services,
    })
    clear()
  }, [date, professional, services, httpPUT, clear, user])

  const contextValue = useMemo(() => {
    return {
      date,
      professional,
      services,
      occupiedSchedules,
      totalDuration,
      totalPrice,
      selectDate,
      selectProfessional,
      numberOfSlots,
      selectServices,
      schedule,
      updateSchedule,
    };
  }, [date, professional, services, occupiedSchedules, totalDuration, totalPrice, selectDate, selectProfessional, numberOfSlots, selectServices, schedule, updateSchedule]);
  return (
    <AppointmentContext.Provider
      value={contextValue}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
