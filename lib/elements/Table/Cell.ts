import { TableCellConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Cell (td).
 */
export default class Cell extends Common {
  textContent?: string;
  rowExtension?: number;
  columnExtension?: number;
  readonly render: HTMLTableCellElement;

  /**
   * Initiates a new Cell (td).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   */
  constructor({
    id,
    classes,
    children,
    textContent,
    rowExtension,
    columnExtension,
  }: TableCellConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    if (rowExtension) {
      if (rowExtension > 0) this.rowExtension = rowExtension;
      else throw new Error(`The value of rowExtension cannot be negative.`);
    };
    if (columnExtension) {
      if (columnExtension > 0) this.columnExtension = columnExtension;
      else throw new Error(`The value of columnExtension cannot be negative.`);
    };
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLTableCellElement {
    const { textContent, rowExtension, columnExtension } = this;
    const element = super.build("td") as HTMLTableCellElement;
    if (textContent) element.textContent = textContent;
    if (rowExtension) element.rowSpan = rowExtension;
    if (columnExtension) element.colSpan = columnExtension;
    return element;
  }
}
