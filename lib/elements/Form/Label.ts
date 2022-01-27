import { LabelConstructor } from "../../types/constructors";
import { LabelPositionEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Label.
 */
export default class Label extends Common {
  textContent?: string;
  inputId?: string;
  position: LabelPositionEnum;
  readonly render: HTMLLabelElement;

  /**
   * Initiates a new Label.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {LabelPositionEnum} position - Defines whether the label should be placed before or after the related input. Use enum LabelPositionEnum.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
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
      "The mount and unmount methods do not apply on Label elements. To use such an element, you need to pass it to the label argument of the input it has been designed for."
    );
  }

  unmount(): void {
    console.error(
      "The mount and unmount methods do not apply on Label elements. To use such an element, you need to pass it to the label argument of the input it has been designed for."
    );
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLLabelElement {
    const { textContent, inputId } = this;
    const element = super.build("label") as HTMLLabelElement;
    if (inputId) element.htmlFor = inputId;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
