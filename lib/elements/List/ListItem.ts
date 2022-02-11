import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { ListItemType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new List Item (li).
 */
export default class List_Item extends Common {
  static _class = List_Item;

  /**
   * Initiates a new List Item (li).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, textContent, children, exclusionList }: CommonConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element = this.build("li");
    this.setRender(element);  
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLLIElement {
    return this._render as HTMLLIElement;
  }

  static produce(settings: ProduceSettingsConfig): ListItemType[] {
    return super.produce(settings) as ListItemType[];
  }
}
