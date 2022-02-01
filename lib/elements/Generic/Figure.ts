import { FigureConstructor } from "../../types/constructors";
import { ElementPositionEnum } from "../../types/enum";
import { CaptionType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Figure.
 */
export default class Figure extends Common {
  caption?: CaptionType;
  readonly render: HTMLElement;

  /**
   * Initiates a new Figure.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {CaptionType} [caption] - (optional) Caption for the content of the element.
   */
  constructor({ id, classes, children, caption }: FigureConstructor) {
    super({ id, classes, children });
    if (caption) this.caption = caption;
    this.render = super.build("figure") as HTMLElement;
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
