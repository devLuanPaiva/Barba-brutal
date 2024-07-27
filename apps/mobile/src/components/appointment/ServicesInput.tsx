import { useServices } from '@barba/ui'
import { Service } from "@barba/core";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import images from '@/src/data/constants/images';

interface ServicesInputProps {
    services: Service[]
    servicesChanged: (services: Service[]) => void
}

function Option(props: { service: Service; onClick: (s: Service) => void; selected?: boolean }) {
    return (
        <View
            key={props.service.id}
            style={{
                ...styles.serviceCard,
                backgroundColor: props.selected ? '#22c55e' : '#18181b',
            }}
        >
            <Pressable
                onPress={() => {
                    props.onClick(props.service)
                }}
            >
                <View>
                    <Image
                        style={styles.serviceImage}
                        source={images.services.find((s) => s.id === props.service.id)?.image}
                    />
                    <Text style={styles.serviceText}>{props.service.name}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default function ServicesInput(props: ServicesInputProps) {
    const { services, servicesChanged } = props
    const { services: allServices } = useServices()

    function toggleServiceSelection(service: Service) {
        const found = services.find((s) => s.id === service.id)
        servicesChanged(
            found ? services.filter((s) => s.id !== service.id) : [...services, service]
        )
    }

    return (
        <View style={styles.container}>
            {allServices.map((s) => (
                <Option
                    key={s.id}
                    onClick={toggleServiceSelection}
                    service={s}
                    selected={services.some((serv) => serv.id === s.id)}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        gap: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    serviceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18181b',
        borderRadius: 8,
        padding: 2,
    },
    serviceCard: {
        borderRadius: 8,
        padding: 2,
    },
    serviceText: {
        color: 'white',
        paddingVertical: 5,
        textAlign: 'center',
    },
    serviceImage: {
        width: 122,
        height: 122,
        borderRadius: 6,
    },
})
