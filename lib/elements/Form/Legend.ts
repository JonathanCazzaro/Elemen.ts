import { ProduceSettingsConfig } from "../../types/configObjects";
import { CommonConstructor } from "../../types/constructors";
import { LegendType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Legend.
 */
export default class Legend extends Common {
  static _class = Legend;

  /**
   * Initiates a new Legend.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, classes, textContent, exclusionList }: CommonConstructor) {
    super({ id, classes, exclusionList, textContent });
    const element = this.build("legend");
    this.setRender(element);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLLegendElement {
    return this._render as HTMLLegendElement;
  }

  // ***************************
  // Setters
  // ***************************

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

  static produce(settings: ProduceSettingsConfig): LegendType[] {
    return super.produce(settings) as LegendType[];
  }
}
