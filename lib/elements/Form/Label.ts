import { ProduceSettingsConfig } from "../../types/configObjects";
import { LabelConstructor } from "../../types/constructors";
import { LabelType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Label.
 */
export default class Label extends Common {
  #formElementId?: string;
  static _class = Label;


  /**
   * Initiates a new Label.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [formElementId] - (optional) The ID of the related element. Required if the element is not a direct child of the label.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, data_id, classes, formElementId, textContent, children, exclusionList, displayMode }: LabelConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode });
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

  static produce(settings: ProduceSettingsConfig): LabelType[] {
    return super.produce(settings) as LabelType[];
  }
}
