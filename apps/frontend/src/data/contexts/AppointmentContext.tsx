"use client";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Professional, Service, UtilsSchedule, UtilsDate } from "@barba/core";
import useUser from "../hooks/useUser";
import useAPI from "../hooks/useAPI";
import { AppointmentContextProps } from "../interfaces";

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
  const { httpGET, httpPOST } = useAPI();


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
    };
  }, [date, professional, services, occupiedSchedules, totalDuration, totalPrice, selectDate, selectProfessional, numberOfSlots, selectServices, schedule]);

  return (
    <AppointmentContext.Provider value={contextValue} >
      {children}
    </AppointmentContext.Provider>
  );
}
