import { InsertConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Insert (span).
 */
export default class Insert extends Common {
  textContent?: string;
  readonly render: HTMLSpanElement;

  /**
   * Initiates a new Insert (span).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: InsertConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLSpanElement {
    const { textContent } = this;
    const element = super.build("span") as HTMLSpanElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}