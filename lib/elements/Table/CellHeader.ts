import { TableCellHeaderConstructor } from "../../types/constructors";
import { ScopeEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Cell Header (th).
 */
export default class Cell_Header extends Common {
  textContent?: string;
  rowExtension?: number;
  columnExtension?: number;
  scope?: ScopeEnum;
  readonly render: HTMLTableCellElement;

  /**
   * Initiates a new Cell Header (th).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   * @param {ScopeEnum} [scope] - (optional) Specifies to which cells is the header related to.
   */
  constructor({
    id,
    classes,
    children,
    textContent,
    rowExtension,
    columnExtension,
    scope,
  }: TableCellHeaderConstructor) {
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
    if (scope) this.scope = scope;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLTableCellElement {
    const { textContent, rowExtension, columnExtension, scope } = this;
    const element = super.build("th") as HTMLTableCellElement;
    if (textContent) element.textContent = textContent;
    if (rowExtension) element.rowSpan = rowExtension;
    if (columnExtension) element.colSpan = columnExtension;
    if (scope) element.scope = scope;
    return element;
  }
}
