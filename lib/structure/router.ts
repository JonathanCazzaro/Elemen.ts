import { PageType, RouterConstructor } from "../types/types";
import ArrayExt from "../utils/arrayExt";

export default class Router {
  private currentPath: string;
  private currentPage: PageType;
  private pages: PageType[];
  private notFound: PageType;

  constructor({ pages, notFound }: RouterConstructor) {
    pages.forEach((page) => {
      const { path } = page;
      if (!ArrayExt.isElementUnique(pages, path))
        throw new Error(
          `The pages of your application must have unique paths.`
        );
    });
    this.pages = pages;
    this.notFound = notFound;
    this.currentPath = window.location.pathname;
  }

  goTo(newPath: string) {
    if (/^\//g.test(newPath)) this.currentPath = newPath;
    else console.error(`URL path must start with a / character.`);
    history.pushState({}, "set new path", newPath);
    window.dispatchEvent(new Event("pathchange"));
  }

  start(): void {
    const events = ["DOMContentLoaded", "popstate", "pathchange"];
    events.forEach((event) =>
      window.addEventListener(event, () => {
        if (
          this.currentPage &&
          this.currentPage.path !== window.location.pathname
        )
          this.currentPage.unmount();
        this.currentPath = window.location.pathname;
        const foundPage = this.pages.find(
          (page) => page.path === this.currentPath
        );
        if (foundPage) {
          this.currentPage = foundPage;
          foundPage.mount();
        } else {
          this.currentPage = this.notFound;
          this.notFound.mount();
        }
      })
    );
  }
}
