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

  /**
   * Checks if a string matches hh:mm time format.
   * @param {string} timeToBeChecked - The string that should be checked.
   * @returns {boolean}
   */
  static checkTime(timeToBeChecked: string): boolean {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9])$/;
    return regex.test(timeToBeChecked);
  }

  /**
   * Checks if a sourceSet argument for an image matches the following pattern : pathtoimagefile resolution (example : myfile.png 1280w).
   * @param {Array.string} sourceSet - The array of strings that should be checked.
   * @returns {boolean}
   */
  static checkSourceSet(sourceSet: string[]): boolean {
    const regex = /^[^\.]+\.[a-zA-Z]{2,5}\s[1-9][0-9]{0,3}w$/gm;
    for (const source of sourceSet) {
      if (!regex.test(source)) return false;
    }
    return true;
  }

  /**
   * Checks if a mediaQueries argument for an image matches the following pattern : (mediaquery) resolution (example : (min-width: 768px) 480px).
   * @param {Array.string} mediaQueries - The array of strings that should be checked.
   * @returns {boolean}
   */
  static checkMediaQueries(mediaQueries: string[]): boolean {
    const regex = /^\([a-z-]+:\s.+\)\s[1-9][0-9]{0,3}px|vw|em$/gm;
    for (const source of mediaQueries) {
      if (!regex.test(source)) return false;
    }
    return true;
  }

  /**
   * Check if an input is a valid regex or not.
   * @param {string} input - The input to test.
   * @returns {boolean}
   */
  static isValidRegex(input: string): boolean {
    let isValid: boolean = true;
    try {
      new RegExp(input);
    } catch (error) {
      isValid = false;
      console.trace(error);
    }
    return isValid;
  }
}
