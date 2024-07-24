export default interface InputDateProps{
    date: Date,
    amountSlots: number
    dateChanged: (date: Date) => void
}