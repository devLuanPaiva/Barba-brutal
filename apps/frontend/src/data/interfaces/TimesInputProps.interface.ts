export default interface TimesInputProps {
    date: Date
    slotsQuantity: number
    dateChanged(date: Date): void
}