import { PictureConstructor } from "../../types/constructors";
import { ImageType, SourceType } from "../../types/types";
import Common from "../Common";
import Str from "../../utils/str";
const { matchValue } = Str;

/**
 * Initiates a new Picture.
 */
export default class Picture extends Common {
  #children?: (SourceType | ImageType)[];

  /**
   * Initiates a new Picture.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements and a required Image element in last index.
   */
  constructor({ id, classes, exclusionList, children }: PictureConstructor) {
    super({ id, classes, children, exclusionList });
    const element = this.build("picture");
    this.setRender(element);  
    if (children) this.setChildren(children);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLPictureElement {
    return this._render as HTMLPictureElement;
  }

  get children(): (SourceType | ImageType)[] {
    return this.#children;
  }

  // ***************************
  // Setters
  // ***************************

  setChildren(children: (SourceType | ImageType)[]) {
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    const authorizedContent = ["SOURCE", "IMG"];
    children.forEach((child) => {
      if (matchValue(child.render.tagName, authorizedContent)) {
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Picture can only take Source or Image elements as children.");
    });
  }
}
