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
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, textContent, children, exclusionList, displayMode, onClick }: CommonConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode, onClick });
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
