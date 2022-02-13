import { ProduceSettingsConfig } from "../../types/configObjects";
import { TableCellConstructor } from "../../types/constructors";
import { TableCellType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Cell (td).
 */
export default class Cell extends Common {
  #rowExtension?: number;
  #columnExtension?: number;
  static _class = Cell;

  /**
   * Initiates a new Cell (td).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   */
  constructor({ id, data_id, classes, exclusionList, children, textContent, rowExtension, columnExtension }: TableCellConstructor) {
    super({ id, data_id, classes, children, exclusionList });
    const element = this.build("td");
    this.setRender(element);
    if (rowExtension) this.setRowExtension(rowExtension);
    if (columnExtension) this.setColumnExtension(columnExtension);
    if (textContent) this.setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get columnExtension(): number {
    return this.#columnExtension;
  }

  get rowExtension(): number {
    return this.#rowExtension;
  }

  get render(): HTMLTableCellElement {
    return this._render as HTMLTableCellElement;
  }

  // ***************************
  // Setters
  // ***************************

  setColumnExtension(extension: number) {
    if (extension > 0) this.#columnExtension = this.render.colSpan = extension;
    else throw new Error(`The value of columnExtension cannot be negative.`);
  }

  setRowExtension(extension: number) {
    if (extension > 0) this.#rowExtension = this.render.rowSpan = extension;
    else throw new Error(`The value of rowExtension cannot be negative.`);
  }

  static produce(settings: ProduceSettingsConfig): TableCellType[] {
    return super.produce(settings) as TableCellType[];
  }
}
