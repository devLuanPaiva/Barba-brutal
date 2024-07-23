export default class PhoneUtils {
  static format(phone: string): string {
    if (!phone) return "";
    const numbers = this.unformat(phone);
    return numbers.length <= 10
      ? this.replaceNumbers(numbers, "(xx) xxxx-xxxx")
      : this.replaceNumbers(numbers, "(xx) xxxxx-xxxx");
  }

  static unformat(phone: string): string {
    if (!phone) return "";
    return phone.replace(/\D/g, "").slice(0, 11);
  }

  private static replaceNumbers(phone: string, ref: string): string {
    let formatted = phone
      .split("")
      .reduce((phone, number) => {
        return phone.replace("x", number);
      }, ref)
      .replace(/x/g, "");
    if (phone.length <= 2)
      formatted = formatted.replace(")", "").replace(" ", "");
    if (phone.length <= 6) formatted = formatted.replace("-", "");
    return formatted;
  }
}
