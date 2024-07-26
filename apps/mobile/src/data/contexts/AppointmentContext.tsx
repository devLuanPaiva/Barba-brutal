'use client'
import AppointmentContextProps from "../interfaces/AppointmentContextProps.interface";
import React, {createContext, useCallback, useEffect, useState } from "react";
import { Professional, Service, UtilsDate } from "@barba/core";
import useUser from "../hooks/useUser";
import useAPI from "../hooks/useAPI";

export const AppointmentContext = createContext({} as AppointmentContextProps)
export function AppointmentProvider({ children }: { children: React.ReactNode }) {
    const [professional, setProfessional] = useState<Professional | null>(null)
    const [services, setServices] = useState<Service[]>([])
    const [date, setDate] = useState<Date>(UtilsDate.today())
    const { user } = useUser()
    const [occupiedSchedules, setOccupiedSchedules] = useState<string[]>([])
    const { httpGET, httpPOST } = useAPI()
    
    function selectProfessional(professional: Professional) {
        setProfessional(professional)
    }

    function selectServices(services: Service[]) {
        setServices(services)
    }

    function totalDuration() {
        const duration = services.reduce((acc, current) => acc + (current.amountSlots * 15), 0)
        return `${Math.trunc(duration / 60)}h ${duration % 60}m`
    }

    function totalPrice() {
        return services.reduce((acc, current) => acc + current.price, 0)
    }

    const selectDate = useCallback(function (date: Date) {
        setDate(date)
    }, [])
    function numberOfSlots() {
        return services.reduce((acc, service) => acc + service.amountSlots, 0)
    }

    async function schedule() {
        if (!user?.email) return

        await httpPOST('appointment', {
            emailCustomer: user.email,
            date: date,
            professional: professional!,
            services: services,
        })

        clear()
    }
    function clear() {
        setDate(UtilsDate.today())
        setOccupiedSchedules([])
        setProfessional(null)
        setServices([])
    }
    const getOccupiedSchedules = useCallback(
        async function (date: Date, professional: Professional): Promise<string[]> {
            try {
                if (!date || !professional) return []
                const dateString = date.toISOString().slice(0, 10)
                const occupancy = await httpGET(
                    `appointment/occupancy/${professional.id}/${dateString}`
                )
                return occupancy ?? []
            } catch (e) {
                return []
            }
        },
        [httpGET]
    )

    useEffect(() => {
        if (!date || !professional) return
        getOccupiedSchedules(date, professional).then(setOccupiedSchedules)
    }, [date, professional, getOccupiedSchedules])

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
    )
}