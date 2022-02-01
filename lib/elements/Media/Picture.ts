import { CommonConstructor } from "../../types/constructors";
import { ImageType, SourceType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Picture.
 */
export default class Picture extends Common {
  children?: (SourceType | ImageType)[];
  readonly render: HTMLPictureElement;

  /**
   * Initiates a new Picture.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements and a required Image element in last index.
   */
  constructor({ id, classes, children }: CommonConstructor) {
    super({ id, classes, children });
    this.render = super.build("picture") as HTMLPictureElement;
  }
}
