import { TextConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Text (p).
 */
export default class Text extends Common {
  textContent?: string;
  readonly render: HTMLParagraphElement;

  /**
   * Initiates a new Text (p).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: TextConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
   build(): HTMLParagraphElement {
    const { textContent } = this;
    const element = super.build("p") as HTMLParagraphElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
