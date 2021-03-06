import { PictureConstructor } from "../../types/constructors";
import { ImageType, PictureType, SourceType } from "../../types/types";
import Common from "../Common";
import Str from "../../utils/str";
import { ProduceSettingsConfig } from "../../types/configObjects";
const { matchValue } = Str;

/**
 * Initiates a new Picture.
 */
export default class Picture extends Common {
  #children?: (SourceType | ImageType)[];
  static _class = Picture;

  /**
   * Initiates a new Picture.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements and a required Image element in last index.
   */
  constructor({ id, data_id, classes, exclusionList, children, displayMode }: PictureConstructor) {
    super({ id, data_id, classes, children, exclusionList, displayMode });
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

  static produce(settings: ProduceSettingsConfig): PictureType[] {
    return super.produce(settings) as PictureType[];
  }
}
