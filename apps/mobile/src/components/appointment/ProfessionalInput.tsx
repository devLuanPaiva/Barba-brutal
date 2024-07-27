import images from "@/src/data/constants/images"
import { Professional } from "@barba/core"
import { useProfessionals } from "@barba/ui"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

interface ProfessionalInputProps {
    professionals: Professional | null
    professionalChanged: (professional: Professional) => void
}

export default function ProfessionalInput(props: ProfessionalInputProps) {
    const { professionals, professionalChanged } = props
    const { professional } = useProfessionals()

    function renderProfessional(p: Professional) {
        return (
            <View
                key={p?.id}
                style={{
                    ...styles.professionalContainer,
                    backgroundColor: professionals?.id === p?.id ? '#22c55e' : '#18181b',
                }}
            >
                <Pressable onPress={() => professionalChanged(p)}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 6 }}
                            source={images.professionals.find((pr) => pr.id === p.id)?.image}
                        />
                        <Text style={{ color: 'white', paddingVertical: 5 }}>
                            {p.name.split(' ')[0]}
                        </Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>{professional.map((p) => renderProfessional(p))}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    professionalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 2,
    },
})