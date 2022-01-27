import { PageType } from "../types/types";
import { RouterConstructor } from "../types/constructors";
import ArrayExt from "../utils/arrayExt";

/**
 * Initiates a new Router for your application.
 */
export default class Router {
  private currentPath: string;
  private currentPage: PageType;
  private pages: PageType[];
  private notFound: PageType;

  /**
   * Initiates a new Router.
   * @param {Array.PageType} pages - The pages of your application. Use the Page API to make them.
   * @param {PageType} notFound - A special 404 page that will be displayed if the path has no match. Use again Page API.
   */
  constructor({ pages, notFound }: RouterConstructor) {
    pages.forEach((page) => {
      const { path } = page;
      if (!ArrayExt.isObjectUnique(pages, 'path', path))
        throw new Error(
          `The pages of your application must have unique paths.`
        );
    });
    this.pages = pages;
    this.notFound = notFound;
    this.currentPath = window.location.pathname;
  }

  /**
   * Redirects to a new path.
   * @param {string} newPath - Enter the new path, starting with / character.
   */
  static goTo(newPath: string) {
    if (!newPath.startsWith('/')) throw new Error(`URL path must start with a / character.`);
    else {
      history.pushState({}, "set new path", newPath);
      window.dispatchEvent(new Event("pathchange"));
    }
  }

  /**
 * Makes the router listen to path requests and serve the corresponding pages.
 */
  start(): void {
    const events = ["DOMContentLoaded", "popstate", "pathchange"];
    events.forEach((event) =>
      window.addEventListener(event, (e) => {
        e.preventDefault();
        this.currentPath = window.location.pathname;
        if (this.currentPage) {
          if (this.currentPage.path === this.currentPath) return;
          else this.currentPage.leave();
        }
        const foundPage = this.pages.find(
          (page) => page.path === this.currentPath
        );
        this.currentPage = foundPage ? foundPage : this.notFound;
        this.currentPage.reach();
      })
    );
  }
}
