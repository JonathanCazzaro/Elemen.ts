import { ProduceSettingsConfig } from "../../types/configObjects";
import { TableCellHeaderConstructor } from "../../types/constructors";
import { ScopeEnum } from "../../types/enum";
import { TableCellHeaderType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Cell Header (th).
 */
export default class Cell_Header extends Common {
  #rowExtension?: number;
  #columnExtension?: number;
  #scope?: ScopeEnum;
  static _class = Cell_Header;

  /**
   * Initiates a new Cell Header (th).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   * @param {ScopeEnum} [scope] - (optional) Specifies to which cells is the header related to.
   */
  constructor({ id, data_id, classes, exclusionList, children, textContent, rowExtension, columnExtension, scope }: TableCellHeaderConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent });
    const element = this.build("th");
    this.setRender(element);
    if (rowExtension) this.setRowExtension(rowExtension);
    if (columnExtension) this.setColumnExtension(columnExtension);
    if (scope) this.setScope(scope);
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

  get scope(): ScopeEnum {
    return this.#scope;
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

  setScope(scope: ScopeEnum) {
    this.#scope = this.render.scope = scope;
  }

  static produce(settings: ProduceSettingsConfig): TableCellHeaderType[] {
    return super.produce(settings) as TableCellHeaderType[];
  }
}
