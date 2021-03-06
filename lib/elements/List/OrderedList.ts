import { ProduceSettingsConfig } from "../../types/configObjects";
import { OrderedListConstructor } from "../../types/constructors";
import { ListItemType, OrderedListType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Ordered List (ol).
 */
export default class Ordered_List extends Common {
  #children?: ListItemType[];
  #reversed: boolean = false;
  #startFrom?: number;
  static _class = Ordered_List;

  /**
   * Initiates a new Ordered List (ol).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.ListItemType} [children] - (optional) An array containing the children elements if any.
   * @param {boolean} [reversed] - (optional) If true, items will be listed in descending order.
   * @param {number} [startFrom] - (optional) The number the list should start from.
   */
  constructor({ id, data_id, classes, exclusionList, children, reversed, startFrom, displayMode }: OrderedListConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("ol");
    this.setRender(element);
    if (children) this.setChildren(children);
    if (reversed) this.setReversed(true);
    if (startFrom) this.setStartFrom(startFrom);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): ListItemType[] {
    return this.#children;
  }

  get reversed(): boolean {
    return this.#reversed;
  }

  get startFrom(): number {
    return this.#startFrom;
  }

  get render(): HTMLOListElement {
    return this._render as HTMLOListElement;
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

  setReversed(value: boolean) {
    this.#reversed = this.render.reversed = value;
  }

  setStartFrom(value: number) {
    this.#startFrom = this.render.start = value;
  }

  static produce(settings: ProduceSettingsConfig): OrderedListType[] {
    return super.produce(settings) as OrderedListType[];
  }
}
