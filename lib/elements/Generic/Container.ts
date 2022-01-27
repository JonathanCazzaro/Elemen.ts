import { ContainerConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Container (div).
 */
export default class Container extends Common {
  textContent?: string;
  readonly render: HTMLDivElement;

  /**
   * Initiates a new Container (div).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: ContainerConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLDivElement {
    const { textContent } = this;
    const element = super.build("div") as HTMLDivElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
