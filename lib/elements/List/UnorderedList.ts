import { UnorderedListConstructor } from "../../types/constructors";
import { ListItemType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Unordered List (ul).
 */
export default class Unordered_List extends Common {
  children?: ListItemType[];
  readonly render: HTMLUListElement;

  /**
   * Initiates a new Unordered List (ul).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, children }: UnorderedListConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      children.forEach((child) => {
        if (child.render.tagName === "LI") this.children.push(child);
        else
          throw new Error("List can only take List_Item elements as children.");
      });
    }
    this.render = super.build("ul") as HTMLUListElement;
  }
}
