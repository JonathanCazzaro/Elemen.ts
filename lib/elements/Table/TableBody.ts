import { TableSectionConstructor } from "../../types/constructors";
import { TableRowType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Table Body (tbody).
 */
export default class Table_Body extends Common {
  children?: TableRowType[];
  readonly render: HTMLTableSectionElement;

  /**
   * Initiates a new Table Body (tbody).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any (Row elements only).
   */
  constructor({ id, classes, children }: TableSectionConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      children.forEach((child) => {
        if (child.render.tagName === "TR") this.children.push(child);
        else
          throw new Error("Table Body can only take Row elements as children.");
      });
    }
    this.render = super.build("tbody") as HTMLTableSectionElement;
  }
}
