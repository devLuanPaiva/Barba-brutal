export default class UtilsDate {
  static today() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
    // Retorna a data de hoje com a hora zerada
  }

  static applySchedule(date: Date, schedule: string): Date {
    const newDate = new Date(date);
    const parts = schedule.split(":");
    newDate.setHours(parseInt(parts[0]!), parseInt(parts[1!]));
    return newDate;
    // Vai aplicar o horário em uma data 
  }
  static formatDate(data: Date): string {
    return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
}
