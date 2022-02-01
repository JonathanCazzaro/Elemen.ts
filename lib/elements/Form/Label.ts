import { LabelConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Label.
 */
export default class Label extends Common {
  textContent?: string;
  formElementId?: string;
  position: ElementPositionEnum;
  readonly render: HTMLLabelElement;

  /**
   * Initiates a new Label.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {ElementPositionEnum} position - Defines whether the label should be placed before or after the related element. Use enum ElementPositionEnum.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({
    id,
    classes,
    textContent,
    position,
    children,
  }: LabelConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    this.position = position;
    this.render = this.build();
  }

  mount(): void {
    console.error(
      "The mount and unmount methods do not apply on Label elements. To use such an element, you need to pass it to the label property of the element it has been designed for."
    );
  }

  unmount(): void {
    console.error(
      "The mount and unmount methods do not apply on Label elements. To use such an element, you need to pass it to the label property of the element it has been designed for."
    );
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLLabelElement {
    const { textContent, formElementId } = this;
    const element = super.build("label") as HTMLLabelElement;
    if (formElementId) element.htmlFor = formElementId;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
