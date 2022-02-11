import { LabelConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Label.
 */
export default class Label extends Common {
  #formElementId?: string;

  /**
   * Initiates a new Label.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [formElementId] - (optional) The ID of the related element. Required if the element is not a direct child of the label.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, classes, formElementId, textContent, children, exclusionList }: LabelConstructor) {
    super({ id, classes, children, exclusionList, textContent });
    const element = this.build("label");
    this.setRender(element);
    if (formElementId) this.setFormElementId(formElementId);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLLabelElement {
    return this._render as HTMLLabelElement;
  }

  get formElementId(): string {
    return this.#formElementId;
  }

  // ***************************
  // Setters
  // ***************************

  setFormElementId(id: string) {
    this.#formElementId = this.render.htmlFor = id;
  }
}
