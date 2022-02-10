import { FigureConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import { CaptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Figure.
 */
export default class Figure extends Common {
  #caption?: CaptionType;

  /**
   * Initiates a new Figure.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {CaptionType} [caption] - (optional) Caption for the content of the element.
   */
  constructor({ id, classes, exclusionList, children, caption }: FigureConstructor) {
    super({ id, classes, children, exclusionList });
    const { setRender, build } = this;
    setRender(build("figure"));
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
    const { caption, render } = this;
    if (caption) {
      switch (caption.position) {
        case ElementPositionEnum.TOP:
          render.prepend(caption.render);
          break;
        case ElementPositionEnum.BOTTOM:
          render.append(caption.render);
          break;
      }
    }
  }
}
