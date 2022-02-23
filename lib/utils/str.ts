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
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9])$/;
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
   * Checks if a sourceSet argument for an image matches the following pattern : "pathtoimagefile resolution" (example : myfile.png 1280w).
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
   * Checks if a mediaQueries argument for an image matches the following pattern : "(mediaquery) resolution" (example : "(min-width: 768px) 480px/vw/em") or just "resolution" (example : "480px/vw/em")
   * @param {Array.string} mediaQueries - The array of strings that should be checked.
   * @returns {boolean}
   */
  static checkMediaQueries(mediaQueries: string[]): boolean {
    const regex = /^(\([a-z-]+:\s[^\s]+\)?\s)?([1-9][0-9]{0,3}px|vw|em)$/gm;
    for (const source of mediaQueries) {
      if (!regex.test(source)) return false;
    }
    return true;
  }

  /**
   * Checks if an input is a valid regex or not.
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

  /**
   * Checks if an input contains HTML.
   * @param {string} input - The input to test.
   * @returns {boolean}
   */
  static containsHTML(input: string): boolean {
    const regex = /<[a-z]+>.*<\/[a-z]+>/gm;
    return regex.test(input);
  }

  /**
   * Splits a string containing HTML into an array.
   * @param {string} input - The input to be split.
   * @returns {Array.string}
   */
  static splitHTML(input: string): string[] {
    const regex = /(<[^<>]*>[^<>]*<\/[^<>]*>)/gm;
    return input.split(regex).filter((value) => value);
  }

  /**
   * Checks if an HTML tag into a given input is allowed.
   * @param {string} input - The input to test.
   * @param {string|Array.string} allowedTags - One or more allowed tags (string or string array).
   * @returns {boolean}
   */
  static isHTMLTagAllowed(input: string, allowedTags: string | string[]): boolean {
    const tags = Array.isArray(allowedTags) ? allowedTags.join("|") : allowedTags;
    const regex = new RegExp(`(<\\b(${tags})\\b[^<>]*>[^<>]*<\/\\b(${tags})\\b>)`, "gm");
    return regex.test(input);
  }

  /**
   * Checks if a given input is a valid CSS rule.
   * @param {string} rule - The rule to test.
   * @returns {boolean}
   */
  static isCSSRuleValid(rule: string): boolean {
    const regex = /^([^]+ {\n?)(([ \t]*\b[a-z-]+\b:)( {0,1}.*;\n?))+[ \t]*}$/gm;
    return regex.test(rule);
  }
}
