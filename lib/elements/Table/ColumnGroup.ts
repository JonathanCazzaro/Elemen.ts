import { TableColGroupConstructor } from "../../types/constructors";
import { ColumnsConfig } from "../../types/configObjects";
import Common from "../Common";

/**
 * Initiates a new Column Group (colgroup).
 */
export default class Column_Group extends Common {
  columnExtension?: number;
  columns?: ColumnsConfig[];
  readonly render: HTMLTableColElement;

  /**
   * Initiates a new Column Group (colgroup).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the element is extending. Must be strictly superior to 0.
   * @param {Array.ColumnsConfig} [columns] - (optional) Details of the columns (columnExtension, classes). If columns are provided, columnExtension should not be set for parent element.
   */
  constructor({
    id,
    classes,
    columnExtension,
    columns,
  }: TableColGroupConstructor) {
    super({ id, classes });
    if (columnExtension) {
      if (columnExtension > 0) this.columnExtension = columnExtension;
      else throw new Error(`The value of columnExtension cannot be negative.`);
    }
    if (columns) {
      if (!this.columnExtension) {
        this.columns = columns.map((column) => {
          return {
            ...column,
            classes: column.classes.split(" "),
          };
        });
      } else
        throw new Error(
          "Since the Element has columnExtension defined, it cannot own specific columns."
        );
    }
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLTableColElement {
    const { columnExtension, columns } = this;
    const element = super.build("td") as HTMLTableColElement;
    if (columnExtension) element.span = columnExtension;
    if (columns) {
      columns.forEach((column) => {
        const { columnExtension, classes } = column;
        const col = document.createElement("col");
        if (columnExtension) col.span = columnExtension;
        if (classes)
          classes.forEach((className) => col.classList.add(className));
        element.appendChild(col);
      });
    }
    return element;
  }
}
