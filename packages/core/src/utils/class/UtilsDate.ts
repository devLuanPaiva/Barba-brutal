export default class UtilsDate {
  static today() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  static applySchedule(date: Date, schedule: string): Date {
    const newDate = new Date(date);
    const parts = schedule.split(":");
    newDate.setHours(parseInt(parts[0]!), parseInt(parts[1!]));
    return newDate;
  }
  static formatDate(date: Date): string {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
