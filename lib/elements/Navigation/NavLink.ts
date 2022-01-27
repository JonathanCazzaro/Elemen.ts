import { Router } from "../..";
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
      Router.goTo(this.target);
    });
    return element;
  }
}
