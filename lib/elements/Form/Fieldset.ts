import { FieldsetConstructor } from "../../types/constructors";
import { FormType, LegendType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Fieldset.
 */
export default class Fieldset extends Common {
  name?: string;
  form?: FormType;
  legend?: LegendType;
  disabled: boolean = false;
  readonly render: HTMLFieldSetElement;

  /**
   * Initiates a new Fieldset.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [name] - (optional) Name of the Fieldset (identification for data submitting).
   * @param {FormType} [form] - (optional) The form element instance related to the fieldset. Required if the fieldset is outside the form element.
   * @param {string} [legend] - (optional) A Legend element instance to act as a caption for the fieldset.
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  constructor({
    id,
    classes,
    children,
    form,
    legend,
    disabled,
  }: FieldsetConstructor) {
    super({ id, classes, children });
    if (disabled) this.disabled = true;
    if (form) this.form = form;
    if (legend) this.legend = legend;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLFieldSetElement {
    const { form, disabled, legend } = this;
    const element = super.build("fieldset") as HTMLFieldSetElement;
    if (form) {
      if (form.id) element.setAttribute("form", form.id);
      else
        console.error("The form you connected to the input must have an id.");
    }
    if (legend) element.appendChild(legend.render);
    if (disabled) element.disabled = true;
    return element;
  }
}
