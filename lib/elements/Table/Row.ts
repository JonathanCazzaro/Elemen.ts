import { ProduceSettingsConfig } from "../../types/configObjects";
import { TableRowConstructor } from "../../types/constructors";
import { TableCellHeaderType, TableCellType, TableRowType } from "../../types/types";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Row (tr).
 */
export default class Row extends Common {
  #children?: (TableCellType | TableCellHeaderType)[];
  static _class = Row;

  /**
   * Initiates a new Row (tr).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, children, exclusionList, displayMode }: TableRowConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("tr");
    this.setRender(element);
    if (children) this.setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): (TableCellType | TableCellHeaderType)[] {
    return this.#children;
  }

  get render(): HTMLTableRowElement {
    return this._render as HTMLTableRowElement;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: (TableCellType | TableCellHeaderType)[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    const authorizedContent = ["TH", "TD"];
    children.forEach((child) => {
      if (matchValue(child.render.tagName, authorizedContent)) {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Row can only take Cell or Cell_Header elements as children.");
    });
  }

  static produce(settings: ProduceSettingsConfig): TableRowType[] {
    return super.produce(settings) as TableRowType[];
  }
}
