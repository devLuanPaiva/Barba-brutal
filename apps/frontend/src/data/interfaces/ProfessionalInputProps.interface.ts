import { Professional } from "@barba/core"

export default interface ProfessionalInputProps {
    professional: Professional | null
    professionalChanged: (professional: Professional) => void
}