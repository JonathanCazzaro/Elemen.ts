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
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, children, displayMode, onClick, onClickOutside }: CommonConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode, onClick, onClickOutside });
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
