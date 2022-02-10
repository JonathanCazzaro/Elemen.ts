import { UnorderedListConstructor } from "../../types/constructors";
import { ListItemType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Unordered List (ul).
 */
export default class Unordered_List extends Common {
  #children?: ListItemType[];
  #render: HTMLUListElement;

  /**
   * Initiates a new Unordered List (ul).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, classes, exclusionList, children }: UnorderedListConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setChildren, build } = this;
    setRender(build("ul"));
    if (children) setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get children(): ListItemType[] {
    return this.#children;
  }

  get render(): HTMLUListElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: ListItemType[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    children.forEach((child) => {
      if (child.render.tagName === "LI") {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("List can only take List_Item elements as children.");
    });
  }

  setRender(render: HTMLUListElement) {
    this.#render = render;
  }
}
