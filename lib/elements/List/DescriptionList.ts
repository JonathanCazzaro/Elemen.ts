import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { DescriptionListType, GenericElement } from "../../types/types";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Description List (dl).
 */
export default class Description_List extends Common {
  #children?: GenericElement[];
  static _class = Description_List;

  /**
   * Initiates a new Description List (dl).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, children, exclusionList, displayMode }: CommonConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("dl");
    this.setRender(element);  
    if (children) this.setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLDListElement {
    return this._render as HTMLDListElement;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: GenericElement[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    const authorizedContent = ["DT", "DD", "DIV"];
    children.forEach((child) => {
      if (matchValue(child.render.tagName, authorizedContent)) {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Description List can only take Description_Term, Term_Definition or Container elements as children.");
    });
  }

  static produce(settings: ProduceSettingsConfig): DescriptionListType[] {
    return super.produce(settings) as DescriptionListType[];
  }
}
