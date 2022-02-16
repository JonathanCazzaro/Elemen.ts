import { ProduceSettingsConfig } from "../../types/configObjects";
import { CaptionConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import { CaptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Caption (figcaption).
 */
export default class Caption extends Common {
  #position: ElementPositionEnum;
  static _class = Caption;

  /**
   * Initiates a new Caption (figcaption).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {ElementPositionEnum} position - Defines whether the caption should be placed before or after the related element. Use enum ElementPositionEnum.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, position, children, displayMode }: CaptionConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode });
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

  static produce(settings: ProduceSettingsConfig): CaptionType[] {
    return super.produce(settings) as CaptionType[];
  }
}
