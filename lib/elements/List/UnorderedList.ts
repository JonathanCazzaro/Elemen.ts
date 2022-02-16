import { ProduceSettingsConfig } from "../../types/configObjects";
import { UnorderedListConstructor } from "../../types/constructors";
import { ListItemType, UnorderedListType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Unordered List (ul).
 */
export default class Unordered_List extends Common {
  #children?: ListItemType[];
  static _class = Unordered_List;

  /**
   * Initiates a new Unordered List (ul).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, children, displayMode }: UnorderedListConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("ul");
    this.setRender(element);  
    if (children) this.setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): ListItemType[] {
    return this.#children;
  }

  get render(): HTMLUListElement {
    return this._render as HTMLUListElement;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: ListItemType[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    children.forEach((child) => {
      if (child.render.tagName === "LI") {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("List can only take List_Item elements as children.");
    });
  }

  static produce(settings: ProduceSettingsConfig): UnorderedListType[] {
    return super.produce(settings) as UnorderedListType[];
  }
}
