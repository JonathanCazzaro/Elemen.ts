import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { ContainerType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Container (div).
 */
export default class Container extends Common {
  static _class = Container;

  /**
   * Initiates a new Container (div).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, textContent, children }: CommonConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element = this.build("div");
    this.setRender(element);  
  }

    // ***************************
  // Getters
  // ***************************

  get render(): HTMLDivElement {
    return this._render as HTMLDivElement;
  }

  static produce(settings: ProduceSettingsConfig): ContainerType[] {
    return super.produce(settings) as ContainerType[];
  }
}
