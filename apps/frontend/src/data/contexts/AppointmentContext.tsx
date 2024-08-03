"use client";
import AppointmentContextProps from "../interfaces/AppointmentContextProps.interface";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Professional, Service, UtilsSchedule, UtilsDate } from "@barba/core";
import useUser from "../hooks/useUser";
import useAPI from "../hooks/useAPI";

export const AppointmentContext = createContext({} as AppointmentContextProps);
export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [date, setDate] = useState<Date>(UtilsDate.today());
  const { user } = useUser();
  const [occupiedSchedules, setOccupiedSchedules] = useState<string[]>([]);
  const { httpGET, httpPOST } = useAPI();

  function selectProfessional(professional: Professional) {
    setProfessional(professional);
  }

  function selectServices(services: Service[]) {
    setServices(services);
  }

  function totalDuration() {
    return UtilsSchedule.durationTotal(services)
  }

  function totalPrice() {
    return services.reduce((acc, current) => {
      return (acc + current.price)
    }, 0);
  }

  const selectDate = useCallback(function (date: Date) {
    setDate(date);
  }, []);

  function numberOfSlots() {
    return services.reduce((acc, service) => {
      return (acc + service.amountSlots)
    }, 0);
  }

  async function schedule() {
    if (!user?.email) return;
    await httpPOST('appointment', {
      user: user,
      date: date,
      professional: professional!,
      services: services,
    });

    clear();
  }
  function clear() {
    setDate(UtilsDate.today());
    setOccupiedSchedules([]);
    setProfessional(null);
    setServices([]);
  }
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


  return (
    <AppointmentContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
