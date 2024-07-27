export default class UtilsSchedule {
  private static minutes = [0, 15, 30, 45];

  static timesOfTheDay() {
    return {
      morning: this.scheduleGenerator([8, 9, 10, 11]),
      afternoon: this.scheduleGenerator([14, 15, 16, 17]),
      evening: this.scheduleGenerator([18, 19, 20, 21]),
    };
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
