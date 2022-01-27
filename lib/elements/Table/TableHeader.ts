import { CommonConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Table Header (thead).
 */
export default class Table_Header extends Common {
  readonly render: HTMLTableSectionElement;

  /**
   * Initiates a new Table Header (thead).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any (Row elements only).
   */
  constructor({ id, classes, children }: CommonConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      children.forEach((child) => {
        if (child.render.tagName === "TR") this.children.push(child);
        else
          throw new Error(
            "Table Header can only take Row elements as children."
          );
      });
    }
    this.render = super.build("thead") as HTMLTableSectionElement;
  }
}
