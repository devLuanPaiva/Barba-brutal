import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState } from 'react'

export interface StepsProps {
    children: any
    labels: string[]
    allowNextStep: boolean
    allowNextStepChanged(value: boolean): void
    finalize(): void
}

export default function Steps(props: StepsProps) {
    const [currentStep, setCurrentStep] = useState(0)

    function previousStep() {
        setCurrentStep(currentStep - 1)
        props.allowNextStepChanged(true)
    }

    function nextStep() {
        setCurrentStep(currentStep + 1)
        props.allowNextStepChanged(false)
    }

    function renderSteps() {
        return (
            <View style={styles.stepContainer}>
                {props.labels.map((label, i) => (
                    <View key={label} style={styles.step}>
                        <View
                            style={{
                                ...styles.stepNumber,
                                backgroundColor: i <= currentStep ? '#e4e4e7' : '#71717a',
                            }}
                        >
                            <Text>{i + 1}</Text>
                        </View>
                        <Text
                            style={{
                                ...styles.stepText,
                                color: i <= currentStep ? 'white' : '#3f3f46',
                            }}
                        >
                            {label}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }

    function renderButton(text: string, enabled: boolean, onPress: () => void) {
        return (
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!enabled}
                    onPress={onPress}
                    style={{
                        borderRadius: 5,
                    }}
                >
                    <View
                        style={{
                            ...styles.button,
                            backgroundColor: enabled ? '#27272a' : '#18181b',
                        }}
                    >
                        <Text style={styles.buttonText}>{text}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <View>
            {renderSteps()}
            <View>{props.children?.[currentStep]}</View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {renderButton('Anterior', currentStep === 0, previousStep)}
                {renderButton(
                    'Próximo',
                    props.allowNextStep,
                    currentStep === props.labels.length - 1 ? props.finalize : nextStep
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    stepNumber: {
        borderRadius: 999,
        width: 20,
        height: 20,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        fontSize: 18,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    buttonContainer: {
        marginTop: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
    },
})
