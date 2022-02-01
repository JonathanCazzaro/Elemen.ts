import { OrderedListConstructor } from "../../types/constructors";
import { ListItemType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Ordered List (ol).
 */
export default class Ordered_List extends Common {
  children?: ListItemType[];
  reversed: boolean = false;
  startFrom?: number;
  readonly render: HTMLOListElement;

  /**
   * Initiates a new Ordered List (ol).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {boolean} [reversed] - (optional) If true, items will be listed in descending order.
   * @param {number} [startFrom] - (optional) The number the list should start from.
   */
  constructor({
    id,
    classes,
    children,
    reversed,
    startFrom,
  }: OrderedListConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      children.forEach((child) => {
        if (child.render.tagName === "LI") this.children.push(child);
        else
          throw new Error("List can only take List_Item elements as children.");
      });
    }
    if (reversed) this.reversed = true;
    if (startFrom) this.startFrom = startFrom;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLOListElement {
    const { reversed, startFrom } = this;
    const element = super.build("ol") as HTMLOListElement;
    if (reversed) element.reversed = true;
    if (startFrom) element.start = startFrom;
    return element;
  }
}
