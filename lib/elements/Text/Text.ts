import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { TextType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Text (p).
 */
export default class Text extends Common {
  static _class = Text;

  /**
   * Initiates a new Text (p).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children }: CommonConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element = this.build("p");
    this.setRender(element);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLParagraphElement {
    return this._render as HTMLParagraphElement;
  }

  static produce(settings: ProduceSettingsConfig): TextType[] {
    return super.produce(settings) as TextType[];
  }
}
