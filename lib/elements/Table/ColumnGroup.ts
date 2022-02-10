import { TableColConfigConstructor, TableColGroupConstructor } from "../../types/constructors";
import { ColumnsConfig } from "../../types/configObjects";
import Common from "../Common";

/**
 * Initiates a new Column Group (colgroup).
 */
export default class Column_Group extends Common {
  #columnExtension?: number;
  #columns?: ColumnsConfig[];
  #render: HTMLTableColElement;

  /**
   * Initiates a new Column Group (colgroup).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the element is extending. Must be strictly superior to 0.
   * @param {Array.ColumnsConfig} [columns] - (optional) Details of the columns (columnExtension, classes). If columns are provided, columnExtension should not be set as parent element.
   */
  constructor({ id, classes, exclusionList, columnExtension, columns }: TableColGroupConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setColumnExtension, setColumns, build } = this;
    setRender(build("colgroup"));
    if (columnExtension) setColumnExtension(columnExtension);
    if (columns) setColumns(columns);
  }

  // ***************************
  // Getters
  // ***************************

  get columnExtension(): number {
    return this.#columnExtension;
  }

  get columns(): ColumnsConfig[] {
    return this.#columns;
  }

  get render(): HTMLTableColElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setColumnExtension(extension: number) {
    if (this.#columns) throw new Error("Since the element has columns already defined, columnExtension cannot be used.");
    if (extension > 0) this.#columnExtension = this.#render.span = extension;
    else throw new Error(`The value of columnExtension cannot be negative.`);
  }

  setColumns(columns: TableColConfigConstructor[]) {
    if (this.#columnExtension) throw new Error("Since the Element has columnExtension defined, it cannot own specific columns.");
    this.#columns = columns.map((column) => {
      return {
        ...column,
        classes: column.classes.split(" "),
      };
    });
    this.columns.forEach((column) => {
      const { columnExtension, classes } = column;
      const col = document.createElement("col");
      if (columnExtension) col.span = columnExtension;
      if (classes) classes.forEach((className) => col.classList.add(className));
      this.#render.appendChild(col);
    });
  }

  setRender(render: HTMLTableColElement) {
    this.#render = render;
  }
}
