import { ProduceSettingsConfig } from "../../types/configObjects";
import { TableSectionConstructor } from "../../types/constructors";
import { TableRowType, TableSectionType } from "../../types/types";
import Common from "../Common";

export default class Table_Section extends Common {
  #children?: TableRowType[];

  constructor({ id, classes, exclusionList, children }: TableSectionConstructor) {
    super({ id, classes, exclusionList });
    if (children) this.setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): TableRowType[] {
    return this.#children;
  }

  get render(): HTMLTableSectionElement {
    return this._render as HTMLTableSectionElement;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: TableRowType[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    children.forEach((child) => {
      if (child.render.tagName === "TR") {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Table section can only take Row elements as children.");
    });
  }

  static produce(settings: ProduceSettingsConfig): TableSectionType[] {
    return super.produce(settings) as TableSectionType[];
  }
}
