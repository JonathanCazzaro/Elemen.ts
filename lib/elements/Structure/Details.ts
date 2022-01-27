import { DetailsConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Details.
 */
export default class Details extends Common {
  textContent?: string;
  summary?: string;
  readonly render: HTMLDetailsElement;

  /**
   * Initiates a new Details.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {string} [summary] - (optional) Caption intented to give information about the hidden content.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  constructor({
    id,
    classes,
    textContent,
    summary,
    children,
  }: DetailsConstructor) {
    super({ id, classes, children });
    if (textContent) this.textContent = textContent;
    if (summary) this.summary = summary;
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLDetailsElement {
    const { textContent, summary } = this;
    const element = super.build("details") as HTMLDetailsElement;
    if (textContent) element.textContent = textContent;
    if (summary) {
      const summaryElement = document.createElement("summary");
      summaryElement.textContent = summary;
      element.prepend(summaryElement);
    }
    return element;
  }
}
