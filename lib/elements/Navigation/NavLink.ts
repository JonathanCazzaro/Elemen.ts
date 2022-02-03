import Application from "../../structure/application";
const { goTo } = Application;
import Link from "./Link";

/**
 * Initiates a new NavLink (a).
 */
export default class NavLink extends Link {
  /**
   * Renders the HTML Element.
   */
  build(): HTMLAnchorElement {
    const element = super.build();
    element.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(this.target);
    });
    return element;
  }
}
