import { TableConstructor } from "../../types/constructors";
import { TableColumnGroupType, TableRowType, TableSectionType } from "../../types/types";
import Str from "../../utils/str";
import Common from "../Common";

/**
 * Initiates a new Table.
 */
export default class Table extends Common {
  children?: TableRowType[] | TableColumnGroupType[] | TableSectionType[];
  caption?: string;
  readonly render: HTMLTableElement;

  /**
   * Initiates a new Table.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [caption] - (optional) Caption placed at the top of the table.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, children, caption }: TableConstructor) {
    super({ id, classes });
    if (caption) this.caption = caption;
    if (children) {
      this.children = [];
      const authorizedContent = ["TR", "COLGROUP", "THEAD", "TBODY", "TFOOT"];
      children.forEach((child) => {
        if (Str.matchValue(child.render.tagName, authorizedContent))
          this.children.push(child);
        else
          throw new Error(
            "Table can only take Row, Column_Group, Table_Header, Table_Body or Table_Footer elements as children."
          );
      });
    }
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLTableElement {
    const { caption } = this;
    const element = super.build("table") as HTMLTableElement;
    if (caption) {
      const captionElement = document.createElement("caption");
      captionElement.textContent = caption;
      element.prepend(captionElement);
    }
    return element;
  }
}
