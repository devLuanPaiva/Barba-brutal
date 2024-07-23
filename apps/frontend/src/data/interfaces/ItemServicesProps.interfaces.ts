import { Service } from "@barba/core";

export default interface ItemServicesProps{
    service: Service
    onClick?: (service: Service) => void
}