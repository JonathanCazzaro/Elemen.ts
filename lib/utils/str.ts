/**
 * Extended string API designed to provide additionnal methods.
 */
export default class Str {
  /**
   * Checks if a string matches at least one value in a given array.
   * @param {string} stringToBeTested - The string that should be tested.
   * @param {Array.string} values - An array of strings.
   * @returns {boolean}
   */
  static matchValue(stringToBeTested: string, values: string[]): boolean {
    return values.find((value) => value === stringToBeTested) ? true : false;
  }

  /**
   * Checks if a string matches the yyyy-MM-dd date format.
   * @param {string} dateToBeChecked - The string that should be checked.
   * @returns {boolean}
   */
  static checkDate(dateToBeChecked: string): boolean {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(dateToBeChecked);
  }

  /**
   * Checks if a string matches the dd/mm/yyyyThh:mm date & time format.
   * @param {string} dateToBeChecked - The string that should be checked.
   * @returns {boolean}
   */
  static checkDateTime(dateToBeChecked: string): boolean {
    const regex =
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9])$/;
    return regex.test(dateToBeChecked);
  }
}
