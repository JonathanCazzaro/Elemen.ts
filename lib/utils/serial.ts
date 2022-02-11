/**
 * Serial API providing methods to manage unique identifiers.
 */
export default class Serial {
  /**
   * Generate serial identifier made of random numbers and letters.
   * @param {number} digitsAmount - Specify the length of the required serial.
   * @returns {string}
   */
  static generate(digitsAmount: number): string {
    let serial = "";
    const letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
    for (let digit = 0; digit < digitsAmount; digit++) {
      const numberOrLetter = Math.round(Math.random());
      if (numberOrLetter) serial = serial + Math.round(Math.random() * 10);
      else {
        serial =
          serial + letters.charAt(Math.round(Math.random() * letters.length));
      }
    }
    return serial;
  }

  /**
   * Checks equality between two serials.
   * @param {string} firstSerial - The first serial.
   * @param {string} secondSerial - The second serial.
   * @returns {boolean}
   */
  static compare(firstSerial: string, secondSerial: string): boolean {
    return firstSerial === secondSerial ? true : false;
  }
}
