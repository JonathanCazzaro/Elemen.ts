import { TableSectionConstructor } from "../../types/constructors";
import Table_Section from "./TableSection";

/**
 * Initiates a new Table Body (tbody).
 */
export default class Table_Body extends Table_Section {
  static _class = Table_Body;

  /**
   * Initiates a new Table Body (tbody).
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any (Row elements only).
   */
  constructor({ id, data_id, classes, exclusionList, children }: TableSectionConstructor) {
    super({ id, data_id, classes, exclusionList, children });
    const element = this.build("tbody");
    this.setRender(element);
  }
}
