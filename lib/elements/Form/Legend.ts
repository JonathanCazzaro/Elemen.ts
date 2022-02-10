import { TextConstructor } from "../../types/constructors";
import Common from "../Common";

/**
 * Initiates a new Legend.
 */
export default class Legend extends Common {
  #render: HTMLLegendElement;

  /**
   * Initiates a new Legend.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, classes, textContent, exclusionList }: TextConstructor) {
    super({ id, classes, exclusionList });
    const { setRender, setTextContent, build } = this;
    setRender(build("legend"));
    if (textContent) setTextContent(textContent);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLLegendElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setRender(render: HTMLLegendElement) {
    this.#render = render;
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
}
