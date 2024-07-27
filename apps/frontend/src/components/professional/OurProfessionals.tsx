import { useProfessionals } from "@barba/ui"
import Title from "../shared/Title"
import { Professional } from "@barba/core"
import ItemProfessionals from "./ItemProfessionals"

export default function OurProfessionals() {
    const { professional } = useProfessionals()

    return (
        <div className="container flex flex-col items-center gap-y-16">
            <Title
                tag="Time"
                primary="Nossos Brutos"
                secondary="Só os mais brabos estão aqui! Temos o orgulho de ter o time mais qualificado do Brasil!"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 ">
                {professional && Array.isArray(professional) ? (
                    professional.map((professional: Professional) => (
                        <ItemProfessionals key={professional.id} professional={professional} />
                    ))
                ) : (
                    <p>Não tem profissionais disponíveis.</p>
                )}

            </div>
        </div>
    )
}