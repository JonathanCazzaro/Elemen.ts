import { ProduceSettingsConfig } from "../../types/configObjects";
import { DetailsConstructor } from "../../types/constructors";
import { DetailsType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Details.
 */
export default class Details extends Common {
  #summary?: string;
  static _class = Details;

  /**
   * Initiates a new Details.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [summary] - (optional) Caption intented to give information about the hidden content.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({ id, data_id, classes, exclusionList, textContent, summary, children, displayMode }: DetailsConstructor) {
    super({ id, data_id, classes, children, exclusionList, displayMode });
    const element = this.build("details");
    this.setRender(element);
    if (summary) this.setSummary(summary);
    if (textContent) this.setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLDetailsElement {
    return this._render as HTMLDetailsElement;
  }

  get summary(): string {
    return this.#summary;
  }

  // ***************************
  // Setters
  // ***************************

  setSummary(summary: string) {
    this.#summary = summary;
    const existingSummary = this.render.getElementsByTagName("summary")[0];
    if (existingSummary) existingSummary.textContent = summary;
    else {
      const summaryElement = document.createElement("summary");
      summaryElement.textContent = summary;
      this.render.prepend(summaryElement);
    }
  }

  static produce(settings: ProduceSettingsConfig): DetailsType[] {
    return super.produce(settings) as DetailsType[];
  }
}
