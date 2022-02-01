import { CaptionConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Caption (figcaption).
 */
export default class Caption extends Common {
  textContent?: string;
  position: ElementPositionEnum;
  readonly render: HTMLElement;

  /**
   * Initiates a new Caption (figcaption).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {ElementPositionEnum} position - Defines whether the caption should be placed before or after the related element. Use enum ElementPositionEnum.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({
    id,
    classes,
    textContent,
    position,
    children,
  }: CaptionConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.position = position;
    this.render = this.build();
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

  /**
   * Renders the HTML Element.
   */
  build(): HTMLElement {
    const { textContent } = this;
    const element = super.build("figcaption") as HTMLElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
