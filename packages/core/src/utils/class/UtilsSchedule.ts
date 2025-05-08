export default class UtilsSchedule {
  private static minutes = [0, 15, 30, 45];

  static timesOfTheDay() {
    return {
      morning: this.scheduleGenerator([8, 9, 10, 11]),
      afternoon: this.scheduleGenerator([14, 15, 16, 17]),
      evening: this.scheduleGenerator([18, 19, 20, 21]),
    };
  }
  static durationTotal(services: { amountSlots: number }[]) {
    const duration = services.reduce((acc, current) => {
      return (acc += current.amountSlots * 15);
    }, 0);

    return `${Math.trunc(duration / 60)}h ${duration % 60}m`
  }
  private static scheduleGenerator(hour: number[]) {
    return hour.reduce((times, hour) => {
      const allTimes = this.minutes.map((minute) => {
        return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      });
      return times.concat(allTimes);
    }, [] as string[]);
  }
}
