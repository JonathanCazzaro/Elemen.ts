import { Router } from "../..";
import Link from "./Link";

/**
 * Initiates a new Link/NavLink (a).
 */
export default class NavLink extends Link {
  /**
   * Renders the HTML Element.
   */
  build(): HTMLAnchorElement {
    if (!this.target.startsWith("/"))
    throw new Error(
      `The target -- ${this.target} -- should start with a / character.`
    );
    const element = super.build();
    element.addEventListener("click", (e) => {
      e.preventDefault();
      Router.goTo(this.target);
    });
    return element;
  }
}
