import { TitleConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Title (h*).
 */
export default class Title extends Common {
  private level: number;
  textContent?: string;
  readonly render: HTMLHeadingElement;

  /**
   * Initiates a new Title (h*).
   * @param {number} level - Level of the title.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children, level }: TitleConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    if (level > 6 || level < 1) throw new Error("Title's level should be set between 1 and 6.");
    else this.level = level;
    
    this.level = level;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
   build(): HTMLHeadingElement {
    const { textContent, level } = this;
    const element = super.build(`h${level}`) as HTMLHeadingElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
