import { TableRowConstructor } from "../../types/constructors";
import { TableCellHeaderType, TableCellType } from "../../types/types";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Row (tr).
 */
export default class Row extends Common {
  children?: TableCellType[] | TableCellHeaderType[];
  readonly render: HTMLTableRowElement;

  /**
   * Initiates a new Row (tr).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, children }: TableRowConstructor) {
    super({ id, classes });
    if (children) {
      this.children = [];
      const authorizedContent = ["TH", "TD"];
      children.forEach((child) => {
        if (matchValue(child.render.tagName, authorizedContent))
          this.children.push(child);
        else
          throw new Error(
            "Row can only take Cell or Cell_Header elements as children."
          );
      });
    }
    this.render = super.build("tr") as HTMLTableRowElement;
  }
}
