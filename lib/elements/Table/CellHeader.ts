import { TableCellHeaderConstructor } from "../../types/constructors";
import { ScopeEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Cell Header (th).
 */
export default class Cell_Header extends Common {
  #rowExtension?: number;
  #columnExtension?: number;
  #scope?: ScopeEnum;
  #render: HTMLTableCellElement;

  /**
   * Initiates a new Cell Header (th).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   * @param {ScopeEnum} [scope] - (optional) Specifies to which cells is the header related to.
   */
  constructor({ id, classes, exclusionList, children, textContent, rowExtension, columnExtension, scope }: TableCellHeaderConstructor) {
    super({ id, classes, children, exclusionList });
    const { setRender, setColumnExtension, setRowExtension, setScope, setTextContent, build } = this;
    setRender(build("th"));
    if (rowExtension) setRowExtension(rowExtension);
    if (columnExtension) setColumnExtension(columnExtension);
    if (scope) setScope(scope);
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
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setColumnExtension(extension: number) {
    if (extension > 0) this.#columnExtension = this.#render.colSpan = extension;
    else throw new Error(`The value of columnExtension cannot be negative.`);
  }

  setRowExtension(extension: number) {
    if (extension > 0) this.#rowExtension = this.#render.rowSpan = extension;
    else throw new Error(`The value of rowExtension cannot be negative.`);
  }

  setScope(scope: ScopeEnum) {
    this.#scope = this.#render.scope = scope;
  }

  setRender(render: HTMLTableCellElement) {
    this.#render = render;
  }
}
