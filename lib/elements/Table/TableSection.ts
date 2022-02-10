import { TableSectionConstructor } from "../../types/constructors";
import { TableRowType } from "../../types/types";
import Common from "../Common";

export default class Table_Section extends Common {
  #children?: TableRowType[];
  #render: HTMLTableSectionElement;

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
    return this.#render;
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

  setRender(render: HTMLTableSectionElement) {
    this.#render = render;
  }
}
