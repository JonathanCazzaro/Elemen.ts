import { ProduceSettingsConfig } from "../../types/configObjects";
import { LinkConstructor } from "../../types/constructors";
import { LinkType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Link (a).
 */
export default class Link extends Common {
  #target?: string;
  static _class = Link;

  /**
   * Initiates a new Link (a).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   * @param {string} [target] - (optional) Target of the link (url, local path, etc...).
   */
  constructor({ id, data_id, classes, exclusionList, textContent, children, target, displayMode }: LinkConstructor) {
    super({ id, data_id, classes, children, exclusionList, textContent, displayMode });  
    const element = this.build("a");
    this.setRender(element);
    if (target) this.setTarget(target);
  }

  // ***************************
  // Getters
  // ***************************

  get target(): string {
    return this.#target;
  }

  get render(): HTMLAnchorElement {
    return this._render as HTMLAnchorElement;
  }

  // ***************************
  // Setters
  // ***************************

  setTarget(target: string) {
    this.#target = this.render.href = target;
  }

  static produce(settings: ProduceSettingsConfig): LinkType[] {
    return super.produce(settings) as LinkType[];
  }
}
