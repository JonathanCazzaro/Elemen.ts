import { ContainerType, GenericElement, ModalType } from "../../types/types";
import Container from "./Container";
import Serial from "../../utils/serial";
import { ModalConstructor } from "../../types/constructors";
import Str from "../../utils/str";
const { isCSSRuleValid } = Str;

const cssBaseRules = [
  `
  body {
    position: relative;
    overflow: hidden;
  }
  `,
  `
  #modal {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  `,
  `
  .modal__content {
    position: fixed;
    z-index: 30;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  `,
];

export default class Modal {
  #serial: string;
  #contentWrapper: ContainerType;
  #isMounted: boolean = false;
  #additionnalCSSRules: string[] = [];
  protected _render: HTMLDivElement;

  get serial(): string {
    return this.#serial;
  }

  get contentWrapper(): ContainerType {
    return this.#contentWrapper;
  }

  get additionnalCSSRules(): string[] {
    return this.#additionnalCSSRules;
  }

  get content(): GenericElement[] {
    return this.#contentWrapper.children;
  }

  get isMounted(): boolean {
    return this.#isMounted;
  }

  get render(): HTMLDivElement {
    return this._render;
  }

  setContent(content: GenericElement[]) {
    this.#contentWrapper.setChildren(content);
  }

  static create({ content, onClickOustide, additionnalCSSRules }: ModalConstructor): ModalType {
    const instance = new Modal();
    if (additionnalCSSRules) {
      const rulesBuffer = Array.isArray(additionnalCSSRules) ? additionnalCSSRules : [additionnalCSSRules];
      rulesBuffer.forEach((rule) => {
        if (isCSSRuleValid(rule)) instance.#additionnalCSSRules.push(rule);
        else console.error("A modal element has been provided an invalid CSS rule.");
      });
    }
    const modalBackground = document.createElement("div");
    instance.#serial = modalBackground.dataset.serial = Serial.generate(6);
    modalBackground.id = "modal";
    instance._render = modalBackground;
    const modalContent = new Container({ classes: "modal__content", children: content });
    instance.#contentWrapper = modalContent;
    instance.#contentWrapper.setChildren(content);
    if (onClickOustide)
      modalBackground.addEventListener("click", (event) => {
        if (event.currentTarget === event.target) onClickOustide(event);
        else return;
      });
    return instance;
  }

  /**
   * Inserts the modal into the DOM next to the root element.
   */
  insert(): void {
    const cssRules = [...cssBaseRules, ...this.additionnalCSSRules];
    cssRules.forEach((rule) => {
      const styleSheet = document.styleSheets.item(document.styleSheets.length - 1);
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    });
    document.body.appendChild(this._render);
    this.#contentWrapper.setParentSerial(this.serial);
    this.#contentWrapper.mount();
    this.#isMounted = true;
  }

  /**
   * Removes the modal from the DOM.
   */
  remove(): void {
    const cssRules = [...cssBaseRules, ...this.additionnalCSSRules];
    for (let index = 0; index < cssRules.length; index++) {
      const styleSheet = document.styleSheets.item(document.styleSheets.length - 1);
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    }
    this.contentWrapper.unmount();
    this._render.remove();
    this.#isMounted = false;
  }
}
