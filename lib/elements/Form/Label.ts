import { LabelConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Label.
 */
export default class Label extends Common {
  textContent?: string;
  formElementId?: string;
  readonly render: HTMLLabelElement;

  /**
   * Initiates a new Label.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [formElementId] - (optional) The ID of the related element. Required if the element is not a direct child of the label.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({
    id,
    classes,
    formElementId,
    textContent,
    children,
  }: LabelConstructor) {
    super({ id, classes, children });
    if (formElementId) this.formElementId = formElementId;
    if (textContent) this.textContent = textContent;
    this.render = this.build();
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
