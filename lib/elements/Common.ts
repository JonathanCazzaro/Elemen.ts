import { CommonElementType, GenericElement, HTMLElementModel } from "../types/types";
import { CommonConstructor } from "../types/constructors";
import ArrayExt from "../utils/arrayExt";
const { remove, toggle } = ArrayExt;
import Str from "../utils/str";
const { containsHTML, splitHTML, isHTMLTagAllowed, matchValue } = Str;
import Serial from "../utils/serial";
import { ProduceSettingsConfig, OnClickConfig, OnHoverConfig } from "../types/configObjects";
import { DisplayModeEnum } from "../types/enum";

const getAllChildrenSerials = (children?: GenericElement[]): string[] => {
  const serials: string[] = [];
  const processChild = (child: GenericElement) => {
    serials.push(child.serial);
    if (child.children) child.children.forEach((child) => processChild(child));
    else return;
  };
  if (children) children.forEach((child) => processChild(child));
  return serials;
};

export default class Common {
  readonly #serial: string;
  #parentSerial?: string;
  #children?: GenericElement[];
  #id?: string;
  #data_id?: string | number;
  #classes?: string[];
  #textContent?: string;
  #exclusionList?: string[];
  #isMounted: boolean = false;
  #displayMode: DisplayModeEnum = DisplayModeEnum.DYNAMIC;
  #onClick?: (event?: Event) => any;
  #onClickOutside?: (event?: Event) => any;
  protected _render: HTMLElementModel;
  static _class = Common;

  constructor({ id, data_id, classes, children, exclusionList, textContent, displayMode, onClick, onClickOutside }: CommonConstructor) {
    this.#serial = Serial.generate(6);
    if (id) this.#id = id;
    if (data_id) this.#data_id = data_id;
    if (displayMode) this.#displayMode = displayMode;
    if (classes) this.#classes = typeof classes === "string" ? classes.split(" ") : classes;
    if (children) this.setChildren(children);
    if (exclusionList) this.setExclusionList(exclusionList);
    if (textContent) this.#textContent = textContent;
    if (onClick) this.#onClick = onClick;
    if (onClickOutside) this.#onClickOutside = onClickOutside;
  }

  // ***************************
  // Getters
  // ***************************

  get data_id(): string | number {
    return this.#data_id;
  }

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

  get displayMode(): DisplayModeEnum {
    return this.#displayMode;
  }

  // ***************************
  // Setters
  // ***************************

  protected setRender(render: HTMLElementModel) {
    this._render = render;
  }

  setTextContent(textContent: string) {
    this.#textContent = textContent;
    if (containsHTML(this.#textContent)) {
      const parsedTextArray = splitHTML(this.#textContent);
      let sanitizedTextContent = "";
      parsedTextArray.forEach((slice) => {
        if (containsHTML(slice) && !isHTMLTagAllowed(slice, ["span", "strong", "em"])) {
          console.error(
            "HTML elements that can be inserted through textContent should only be of type span, strong, or em. Others tags are ignored."
          );
        } else sanitizedTextContent += slice;
      });
      this._render.innerHTML = sanitizedTextContent;
    } else this._render.textContent = this.#textContent;
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
      if (this.children) this.removeChildren();
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
      this.#classes = remove(this.classes, className);
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
      this.#classes = toggle(this.classes, name);
      this.render.classList.toggle(name);
    });
  }

  /**
   * Checks if the current instance has a given classname.
   * @param {string} className
   * @returns {boolean}
   */
  hasClass(className: string): boolean {
    if (this.classes) {
      const foundClass = this.classes.find((existingClass) => existingClass === className);
      if (foundClass) return true;
    }
    return false;
  }

  /**
   * Returns an Element from the DOM from its serial.
   * @returns {Element | undefined} The HTMLElement or undefined in not found.
   */
  getElementBySerial(serial: string): HTMLElement | undefined {
    const foundElement = document.querySelector(`[data-serial="${serial}"`) as HTMLElement;
    return foundElement ? foundElement : undefined;
  }

  protected build(tag: string): any {
    const element = document.createElement(tag);
    if (this.#id) element.id = this.#id;
    if (this.#classes) this.#classes.forEach((className) => element.classList.add(className));
    if (this.#textContent) {
      if (containsHTML(this.#textContent)) {
        const parsedTextArray = splitHTML(this.#textContent);
        let sanitizedTextContent = "";
        parsedTextArray.forEach((slice) => {
          if (containsHTML(slice) && !isHTMLTagAllowed(slice, ["span", "strong", "em"])) {
            console.error(
              "HTML elements that can be inserted through textContent should only be of type span, strong, or em. Others tags are ignored."
            );
          } else sanitizedTextContent += slice;
        });
        element.innerHTML = sanitizedTextContent;
      } else element.textContent = this.#textContent;
    }
    element.dataset.serial = this.#serial;
    if (this.#onClick) element.addEventListener("click", this.#onClick);
    if (this.#onClickOutside) {
      document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        const childrenSerials = getAllChildrenSerials(this.children);
        if (!matchValue(target.dataset.serial || "", childrenSerials)) this.#onClickOutside(event);
      });
    }
    return element;
  }

  /**
   * Mounts the element into the DOM.
   */
  mount(rootElementId?: string): void {
    if (this.#exclusionList) {
      for (const item of this.#exclusionList) {
        if (window.location.pathname === item) {
          this.unmount();
          return;
        }
      }
    }
    if (this.children) this.children.forEach((child) => child.setParentSerial(this.serial));
    if (!this.parentSerial) {
      if (rootElementId) document.querySelector(`#${rootElementId}`).appendChild(this.render);
      else document.body.appendChild(this.render);
    }
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
    if (this.children) this.children.forEach((child) => child.unmount());
    this.render.remove();
    this.setParentSerial("");
    this.#isMounted = false;
  }

  /** Specifies a behaviour when the element is clicked.
   * @param {object} configuration - Config object to handle click on element and/or outside element.
   */
  onClick(configuration: OnClickConfig): void {
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

  /** Specifies a behaviour when the element is hovered.
   * @param {object} configuration - Config object to handle hovering in and out.
   */
  onHover(configuration: OnHoverConfig): void {
    const { onElement, onMouseLeave } = configuration;
    if (onElement) this.render.addEventListener("mouseover", onElement);
    if (onMouseLeave) this.render.addEventListener("mouseout", onMouseLeave);
  }

  /** Specifies a behaviour when a given event is triggered on document.
   * @param {string} event - Name of the event.
   * @param {function} callback - Callback function to define the actions.
   */
  onEvent(event: string, callback: (event?: Event) => void): void {
    document.addEventListener(event, (event) => callback(event));
  }

  /**
   * Produces a given number of instances based upon the current instance.
   * @param {ProduceSettingsConfig} settings - Configuration object with dynamicProps and staticProps as subobjects, each one with "props" and "values". Static will define a recurrent pattern whereas dynamic will allow to set specific values for each instance.
   */
  static produce({ dynamicProps, staticProps }: ProduceSettingsConfig): CommonElementType[] {
    let production = [];
    let constructor = {};
    if (staticProps) {
      const parsedStaticProps = staticProps.props.split(" ");
      parsedStaticProps.forEach((prop, index) => {
        constructor[prop] = staticProps.values[index];
      });
    }
    const parsedDynamicProps = dynamicProps.props.split(" ");
    for (let instanceIndex = 0; instanceIndex < dynamicProps.values.length; instanceIndex++) {
      let dynamicConstructor = { ...constructor };
      parsedDynamicProps.forEach((prop, index) => {
        const value = parsedDynamicProps.length > 1 ? dynamicProps.values[instanceIndex][index] : dynamicProps.values[instanceIndex];
        if (prop === "classes" && prop in dynamicConstructor) dynamicConstructor[prop] += ` ${value}`;
        else dynamicConstructor[prop] = value;
      });
      let newInstance = new this._class(dynamicConstructor);
      production.push(newInstance);
    }
    return production as CommonElementType[];
  }
}
