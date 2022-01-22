import { TitleConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiate a new Title element (h*).
 */
export default class Title extends Common {
  private level: number;
  textContent?: string;
  readonly render: HTMLHeadingElement;

  /**
   * Initiates a new Title element (h*).
   * @param {number} level - Level of the title.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children, level }: TitleConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    if (level > 6 || level < 1) throw new Error("Wrong title's level. It should only be set between 1 and 6.");
    else this.level = level;
    
    this.level = level;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLHeadingElement {
    let { id, classes, serial, textContent } = this;
    const element = document.createElement(`h${this.level}`) as HTMLHeadingElement;
    if (id) element.id = id;
    if (classes)
      classes.forEach((className) => element.classList.add(className));
    if (textContent) element.textContent = textContent;
    element.dataset.serial = serial;
    return element;    
  }
}
