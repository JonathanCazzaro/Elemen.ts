import { TableSectionConstructor } from "../../types/constructors";
import Table_Section from "./TableSection";

/**
 * Initiates a new Table Body (tfoot).
 */
export default class Table_Body extends Table_Section {
  /**
   * Initiates a new Table Body (tfoot).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any (Row elements only).
   */
  constructor({ id, classes, exclusionList, children }: TableSectionConstructor) {
    super({ id, classes, exclusionList, children });
    const { setRender, build } = this;
    setRender(build("tbody"));
  }
}
