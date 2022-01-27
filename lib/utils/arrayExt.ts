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
  static isObjectUnique(arrayToBeTested: any[], referenceKey: string, value: string): boolean {
    const refCount: any[] = arrayToBeTested.filter(
      (entry) => entry[referenceKey] === value
    );
    if (refCount.length > 1) return false;
    else return true;
  }

  /**
   * Removes an element from a given array.
   * @param {Array.any} array - The given array.
   * @param {string} element - The element that should be removed.
   * @returns {Array.any} The outputted array.
   */
  static remove(array: any[], element: any): any[] {
    const index = array.indexOf(element);
    if (index < 0) return array;
    else return array.splice(index, index + 1);
  }

  /**
   * Toggles an element from a given array.
   * @param {Array.any} array - The given array.
   * @param {string} element - The element that should be toggled.
   * @returns {Array.any} The outputted array.
   */
  static toggle(array: any[], element: any): any[] {
    const removeElement = this.remove(array, element);
    if (removeElement.length === array.length) return [...array, element];
    else return removeElement;
  }
}
