import { ProduceSettingsConfig } from "../../types/configObjects";
import { TableConstructor } from "../../types/constructors";
import { TableColumnGroupType, TableRowType, TableSectionType, TableType } from "../../types/types";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Table.
 */
export default class Table extends Common {
  #children?: (TableRowType | TableColumnGroupType | TableSectionType)[];
  #caption?: string;
  static _class = Table;

  /**
   * Initiates a new Table.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [caption] - (optional) Caption placed at the top of the table.
   * @param {Array.(TableRowType|TableColumnGroupType|TableSectionType)} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, children, caption, displayMode }: TableConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("table");
    this.setRender(element);
    if (caption) this.setCaption(caption);
    if (children) this.setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): (TableRowType | TableColumnGroupType | TableSectionType)[] {
    return this.#children;
  }

  get caption(): string {
    return this.#caption;
  }

  get render(): HTMLTableElement {
    return this._render as HTMLTableElement;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: (TableRowType | TableColumnGroupType | TableSectionType)[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    const authorizedContent = ["TR", "COLGROUP", "THEAD", "TBODY", "TFOOT"];
    children.forEach((child) => {
      if (matchValue(child.render.tagName, authorizedContent)) {
        if (this.isMounted) {          
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Table can only take Row, Column_Group, Table_Header, Table_Body or Table_Footer elements as children.");
    });
  }

  setChildrenOnEvent(event: string, callback: () => (TableRowType | TableColumnGroupType | TableSectionType)[]) {   
    document.addEventListener(event, () => this.setChildren(callback()));
  }

  setCaption(caption: string) {
    this.#caption = caption;
    const existingCaption = this.render.getElementsByTagName("caption")[0];
    if (existingCaption) existingCaption.textContent = caption;
    else {
      const captionElement = document.createElement("caption");
      captionElement.textContent = caption;
      this.render.prepend(captionElement);
    }
  }

  static produce(settings: ProduceSettingsConfig): TableType[] {
    return super.produce(settings) as TableType[];
  }
}
