import { TextConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Legend.
 */
export default class Legend extends Common {
  textContent?: string;
  readonly render: HTMLLegendElement;

  /**
   * Initiates a new Legend.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({
    id,
    classes,
    textContent,
  }: TextConstructor) {
    super({ id, classes });
    if (textContent) this.textContent = textContent;
    this.render = this.build();
  }

  mount(): void {
    console.error(
      "The mount and unmount methods do not apply on Legend elements. To use such an element, you need to pass it to the legend property of the element it has been designed for."
    );
  }

  unmount(): void {
    console.error(
      "The mount and unmount methods do not apply on Label elements. To use such an element, you need to pass it to the legend property of the element it has been designed for."
    );
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLLegendElement {
    const { textContent } = this;
    const element = super.build("legend") as HTMLLegendElement;
    if (textContent) element.textContent = textContent;
    return element;
  }
}
