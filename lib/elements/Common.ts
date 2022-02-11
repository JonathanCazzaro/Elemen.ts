import { GenericElement, HTMLElementModel } from "../types/types";
import { CommonConstructor } from "../types/constructors";
import ArrayExt from "../utils/arrayExt";
const { remove, toggle } = ArrayExt;
import Serial from "../utils/serial";
import { CloneModifsConfig, OnClickConfig, OnHoverConfig } from "../types/configObjects";

export default class Common {
  readonly #serial: string;
  #parentSerial?: string;
  #children?: GenericElement[];
  #id?: string;
  #classes?: string[];
  #textContent?: string;
  #exclusionList?: string[];
  #isMounted: boolean = false;
  protected _render: HTMLElementModel;

  constructor({ id, classes, children, exclusionList, textContent }: CommonConstructor) {
    this.#serial = Serial.generate(6);
    if (id) this.#id = id;
    if (classes) this.#classes = typeof classes === "string" ? classes.split(" ") : classes;
    if (children) this.setChildren(children);
    if (exclusionList) this.setExclusionList(exclusionList);
    if (textContent) this.#textContent = textContent;
  }

  // ***************************
  // Getters
  // ***************************

  get serial(): string {
    return this.#serial;
  }

  get parentSerial(): string {
    return this.#parentSerial;
  }

  get classes(): string[] {
    return this.#classes;
  }

  get id(): string {
    return this.#id;
  }

  get textContent(): string {
    return this.#textContent;
  }

  get children(): GenericElement[] {
    return this.#children;
  }

  get exclusionList(): string[] {
    return this.#exclusionList;
  }

  get isMounted(): boolean {
    return this.#isMounted;
  }

  get render(): HTMLElement {
    return this._render;
  }

  // ***************************
  // Setters
  // ***************************

  protected setRender(render: HTMLElementModel) {
    this._render = render;
  }

  setTextContent(textContent: string) {
    this.#textContent = this._render.textContent = textContent;
  }

  setParentSerial(serial: string) {
    this.#parentSerial = serial;
  }

  setId(id: string) {
    this.#id = this._render.id = id;
  }

  setClasses(classes: string | string[]) {
    this.#classes = typeof classes === "string" ? classes.split(" ") : classes;
    if (this._render) this.#classes.forEach((className) => this._render.classList.add(className));
  }

  setChildren(children: GenericElement[]) {
    if (this.isMounted) {
      this.removeChildren();
      children.forEach((child) => {
        child.setParentSerial(this.serial);
        child.mount();
      });
    }
    this.#children = children;
  }

  setExclusionList(list: string[]) {
    this.#exclusionList = [];
    list.forEach((item) => {
      this.#exclusionList.push(item.startsWith("/") ? item : `/${item}`);
    });
  }

  protected removeChildren() {
    this.children.forEach((child) => child.unmount());
  }

  /**
   * Adds a class to the element.
   * @param {string} newClass - One or more classes each separated with a space.
   */
  addClass(newClass: string): void {
    if (!this.classes) this.setClasses("");
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
    if (!this.classes) this.setClasses([]);
    const parsedClass = oldClass.split(" ");
    parsedClass.forEach((className) => {
      this.setClasses(remove(this.classes, className));
      this.render.classList.remove(className);
    });
  }

  /**
   * Toggles a class from the element.
   * @param {string} className - One or more classes each separated with a space.
   */
  toggleClass(className: string): void {
    if (!this.classes) this.setClasses([]);
    const parsedClass = className.split(" ");
    parsedClass.forEach((name) => {
      this.setClasses(toggle(this.classes, name));
      this.render.classList.toggle(name);
    });
  }

  /**
   * Returns an HTMLElement from the DOM with its serial.
   * @returns {HTMLElement | undefined} The HTMLElement or undefined in not found.
   */
  getElementBySerial(serial: string): HTMLElement | undefined {
    const foundElement = document.querySelector(`[data-serial="${serial}"`) as HTMLElement;
    return foundElement ? foundElement : undefined;
  }

  protected build(tag: string): any {
    const element = document.createElement(tag);
    if (this.#id) element.id = this.#id;
    if (this.#classes) this.#classes.forEach((className) => element.classList.add(className));
    if (this.#textContent) element.textContent = this.#textContent;
    element.dataset.serial = this.#serial;
    return element;
  }

  /**
   * Mounts the element into the DOM.
   */
  mount(): void {    
    if (this.#exclusionList) {
      for (const item of this.#exclusionList) {
        if (window.location.pathname === item) {
          this.unmount();
          return;
        }
      }
    }
    if (this.children) this.children.forEach((child) => child.setParentSerial(this.serial));    
    if (!this.parentSerial) document.querySelector("body").appendChild(this.render);
    else this.getElementBySerial(this.parentSerial).appendChild(this.render);
    if (this.children) {
      this.children.forEach((child) => {
        child.setParentSerial(this.serial);
        child.mount();
      });
    }
    this.#isMounted = true;
  }

  /**
   * Unmounts the element from the DOM.
   */
  unmount(): void {
    this.getElementBySerial(this.serial).remove();
    this.setParentSerial("");
    this.#isMounted = false;
  }

  /** Specifies a behaviour when the element is clicked.
   * @param {function} configuration - Config object to handle click on element and/or outside element.
   */
  click(configuration: OnClickConfig): void {
    const { onElement, outsideElement } = configuration;
    if (onElement) this.render.addEventListener("click", onElement);
    if (outsideElement) {
      const onClickOutside = (event: Event) => {
        const target = <HTMLElement>event.target;
        if (target.dataset.serial !== this.serial) outsideElement(event);
      };
      document.addEventListener("click", onClickOutside);
    }
  }

  /**
   * Produces a given number of instances based upon the current instance.
   * @param {number} amount - The quantity of new instances.
   * @param {FactoryModifsConfig} modifications - Configuration object : "properties" takes a string with the properties to alter separated with a space, and "values" takes an array of arrays, each one containing the values for each new instance, in the same order you declared the properties right above.
   */
  clone(amount: number, modifications: CloneModifsConfig): GenericElement[] {
    let production = [];
    const { properties, values } = modifications;
    const parsedProps = properties.split(" ");
    for (let index = 0; index < amount; index++) {
      let newInstance = Object.assign({}, this);
      Object.defineProperty(newInstance, "serial", {
        value: Serial.generate(6),
        writable: false,
      });
      newInstance.render.dataset.serial = newInstance.serial;

      production.push(newInstance);
    }
    return production;
  }

  /** Specifies a behaviour when the element is hovered.
   * @param {function} configuration - Config object to handle hovering in and out.
   */
  hover(configuration: OnHoverConfig): void {
    const { onElement, onMouseLeave } = configuration;
    if (onElement) this.render.addEventListener("mouseover", onElement);
    if (onMouseLeave) this.render.addEventListener("mouseout", onMouseLeave);
  }
}
