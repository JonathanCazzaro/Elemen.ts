import Application from "../../structure/application";
import { ProduceSettingsConfig } from "../../types/configObjects";
import { LinkConstructor } from "../../types/constructors";
import { LinkType } from "../../types/types";
const { goTo } = Application;
import Link from "./Link";

/**
 * Initiates a new NavLink (a).
 */
export default class NavLink extends Link {
  /**
   * Initiates a new NavLink (a).
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
    super({ id, data_id, classes, children, exclusionList, textContent, target, displayMode });
    this.render.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(this.target);
    });
  }

  static produce(settings: ProduceSettingsConfig): LinkType[] {
    const production = super.produce(settings);
    production.forEach((instance) => {
      instance.render.addEventListener("click", (e) => {
        e.preventDefault();
        goTo(instance.target);
      });
    });
    return production;
  }
}
