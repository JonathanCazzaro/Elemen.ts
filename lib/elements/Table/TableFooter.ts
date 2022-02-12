import { TableSectionConstructor } from "../../types/constructors";
import Table_Section from "./TableSection";

/**
 * Initiates a new Table Footer (tfoot).
 */
export default class Table_Footer extends Table_Section {
  static _class = Table_Footer;

  /**
   * Initiates a new Table Footer (tfoot).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any (Row elements only).
   */
  constructor({ id, classes, exclusionList, children }: TableSectionConstructor) {
    super({ id, classes, exclusionList, children });
    const element = this.build("tfoot");
    this.setRender(element);
  }
}
