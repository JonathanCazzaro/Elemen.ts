import { OrderedListConstructor } from "../../types/constructors";
import { ListItemType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Ordered List (ol).
 */
export default class Ordered_List extends Common {
  #children?: ListItemType[];
  #reversed: boolean = false;
  #startFrom?: number;
  #render: HTMLOListElement;

  /**
   * Initiates a new Ordered List (ol).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.ListItemType} [children] - (optional) An array containing the children elements if any.
   * @param {boolean} [reversed] - (optional) If true, items will be listed in descending order.
   * @param {number} [startFrom] - (optional) The number the list should start from.
   */
  constructor({ id, classes, exclusionList, children, reversed, startFrom }: OrderedListConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setChildren, setReversed, setStartFrom, build } = this;
    setRender(build("ol"));
    if (children) setChildren(children);
    if (reversed) setReversed(true);
    if (startFrom) setStartFrom(startFrom);
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
    return this.#render;
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
    this.#reversed = this.#render.reversed = value;
  }

  setStartFrom(value: number) {
    this.#startFrom = this.#render.start = value;
  }

  setRender(render: HTMLOListElement) {
    this.#render = render;
  }
}
