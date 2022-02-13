import { ProduceSettingsConfig } from "../../types/configObjects";
import { FigureConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import { CaptionType, FigureType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Figure.
 */
export default class Figure extends Common {
  #caption?: CaptionType;
  static _class = Figure;

  /**
   * Initiates a new Figure.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {CaptionType} [caption] - (optional) Caption for the content of the element.
   */
  constructor({ id, data_id, classes, exclusionList, children, caption }: FigureConstructor) {
    super({ id, data_id, classes, children, exclusionList });
    const element = this.build("figure");
    this.setRender(element);
    if (caption) this.#caption = caption;
  }

  // ***************************
  // Getters
  // ***************************

  get caption(): CaptionType {
    return this.#caption;
  }

  /**
   * Mounts the element into the DOM.
   */
  mount(): void {
    super.mount();
    if (this.#caption) {
      switch (this.#caption.position) {
        case ElementPositionEnum.TOP:
          this.render.prepend(this.#caption.render);
          break;
        case ElementPositionEnum.BOTTOM:
          this.render.append(this.#caption.render);
          break;
      }
    }
  }

  static produce(settings: ProduceSettingsConfig): FigureType[] {
    return super.produce(settings) as FigureType[];
  }
}
