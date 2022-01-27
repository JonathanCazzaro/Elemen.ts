import { ListItemConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new List Item (li).
 */
export default class List_Item extends Common {
  textContent?: string;
  readonly render: HTMLLIElement;

  /**
   * Initiates a new List Item (li).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children }: ListItemConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
   build(): HTMLLIElement {
    const { textContent } = this;
    const element = super.build("li") as HTMLLIElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
