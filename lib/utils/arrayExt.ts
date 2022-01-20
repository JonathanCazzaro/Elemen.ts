/**
 * Extended array API designed to provide additionnal methods.
 */
export default class ArrayExt {
  /**
   * Checks if an object is unique in a given array.
   * @param {Array.any} arrayToBeTested - The array of objects that should be tested.
   * @param {string} elementKey - The reference key of the objects.
   * @returns {boolean}
   */
  static isElementUnique(arrayToBeTested: any[], elementKey: string): boolean {
    const refCount: any[] = arrayToBeTested.filter(
      (entry) => entry[elementKey] === elementKey
    );
    if (refCount.length > 1) return false;
    else return true;
  }
}
