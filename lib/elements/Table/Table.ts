import { TableConstructor } from "../../types/constructors";
import { TableColumnGroupType, TableRowType, TableSectionType } from "../../types/types";
import Str from "../../utils/str";
const { matchValue } = Str;
import Common from "../Common";

/**
 * Initiates a new Table.
 */
export default class Table extends Common {
  #children?: (TableRowType | TableColumnGroupType | TableSectionType)[];
  #caption?: string;
  #render: HTMLTableElement;

  /**
   * Initiates a new Table.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [caption] - (optional) Caption placed at the top of the table.
   * @param {Array.(TableRowType|TableColumnGroupType|TableSectionType)} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, children, caption }: TableConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setCaption, setChildren, build } = this;
    setRender(build("table"));
    if (caption) setCaption(caption);
    if (children) setChildren(children);
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
    return this.#render;
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

  setCaption(caption: string) {
    this.#caption = caption;
    const existingCaption = this.#render.getElementsByTagName("caption")[0];
    if (existingCaption) existingCaption.textContent = caption;
    else {
      const captionElement = document.createElement("caption");
      captionElement.textContent = caption;
      this.#render.prepend(captionElement);
    }
  }

  setRender(render: HTMLTableElement) {
    this.#render = render;
  }
}
