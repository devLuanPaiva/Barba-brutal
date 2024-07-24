import { Service } from "@barba/core";

export default interface InputServicesProps {
  services: Service[];
  changedService: (services: Service[]) => void;
}
