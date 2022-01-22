import { GenericElement } from "../types/types";
import { CommonConstructor } from "../types/constructors";
import ArrayExt from "../utils/arrayExt";
import Serial from "../utils/serial";

export default class Common {
  readonly serial: string;
  parentSerial?: string;
  children?: GenericElement[];
  id?: string;
  classes?: string[];
  readonly render: HTMLElement;

  constructor({ id, classes, children }: CommonConstructor) {
    this.serial = Serial.generate(6);
    if (id) this.id = id;
    if (classes) this.classes = classes.split(" ");
    if (children) this.children = children;
  }

  /**
   * Adds a class to the element.
   * @param {string} newClass - One or more classes each separated with a space.
   */
  addClass(newClass: string): void {
    const parsedClass = newClass.split(" ");
    parsedClass.forEach((className) => {
      this.classes.push(className);
      this.render.classList.add(className);
    });
  }

  /**
   * Removes a class from the element.
   * @param {string} oldClass - One or more classes each separated with a space.
   */
  removeClass(oldClass: string): void {
    const parsedClass = oldClass.split(" ");
    parsedClass.forEach((className) => {
      this.classes = ArrayExt.remove(this.classes, className);
      this.render.classList.remove(className);
    });
  }

  /**
   * Toggles a class from the element.
   * @param {string} className - One or more classes each separated with a space.
   */
  toggleClass(className: string): void {
    const parsedClass = className.split(" ");
    parsedClass.forEach((className) => {
      this.classes = ArrayExt.toggle(this.classes, className);
      this.render.classList.toggle(className);
    });
  }

  /**
   * Returns an HTMLElement from the DOM with its serial.
   * @returns {HTMLElement | undefined} The HTMLElement or undefined in not found.
   */
  getElementBySerial(serial: string): HTMLElement | undefined {
    const foundElement = document.querySelector(
      `[data-serial="${serial}"`
    ) as HTMLElement;
    return foundElement ? foundElement : undefined;
  }

  /**
   * Checks if the element is currently mounted in the DOM.
   * @returns {boolean}
   */
  isMounted(): boolean {
    const foundElement = this.getElementBySerial(this.serial);
    return foundElement ? true : false;
  }

  /**
   * Mounts the element into the DOM.
   */
  mount(): void {
    if (this.children)
      this.children.forEach((child) => (child.parentSerial = this.serial));
    if (!this.parentSerial)
      document.querySelector("body").appendChild(this.render);
    else this.getElementBySerial(this.parentSerial).appendChild(this.render);

    if (this.children) this.children.forEach((child) => child.mount());
  }

  /**
   * Unmounts the element from the DOM.
   */
  unmount(): void {
    this.render.remove();
  }
}
