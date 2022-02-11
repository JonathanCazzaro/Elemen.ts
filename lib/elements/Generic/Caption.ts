import { CaptionConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Caption (figcaption).
 */
export default class Caption extends Common {
  #position: ElementPositionEnum;

  /**
   * Initiates a new Caption (figcaption).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {ElementPositionEnum} position - Defines whether the caption should be placed before or after the related element. Use enum ElementPositionEnum.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, classes, exclusionList, textContent, position, children }: CaptionConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element= this.build("figcaption");
    this.setRender(element);
    this.#position = position;
  }

  // ***************************
  // Getters
  // ***************************

  get position(): ElementPositionEnum {
    return this.#position;
  }
  
  mount(): void {
    console.error(
      "The mount and unmount methods do not apply on Caption elements. To use such an element, you need to pass it to the caption argument of the element it has been designed for."
    );
  }

  unmount(): void {
    console.error(
      "The mount and unmount methods do not apply on Caption elements. To use such an element, you need to pass it to the caption argument of the element it has been designed for."
    );
  }
}
