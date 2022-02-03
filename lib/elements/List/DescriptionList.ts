import { CommonConstructor } from "../../types/constructors";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Description List (dl).
 */
export default class Description_List extends Common {
  readonly render: HTMLDListElement;

  /**
   * Initiates a new Description List (dl).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, children }: CommonConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      const authorizedContent = ["DT", "DD", "DIV"];
      children.forEach((child) => {
        if (matchValue(child.render.tagName, authorizedContent))
          this.children.push(child);
        else
          throw new Error(
            "Description List can only take Description_Term, Term_Definition or Container elements as children."
          );
      });
    }
    this.render = super.build("dl") as HTMLDListElement;
  }
}
