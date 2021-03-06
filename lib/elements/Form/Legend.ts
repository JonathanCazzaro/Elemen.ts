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
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  constructor({ id, data_id, classes, textContent, exclusionList, displayMode }: CommonConstructor) {
    super({ id, data_id, classes, exclusionList, textContent, displayMode });
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
