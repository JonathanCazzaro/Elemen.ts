import { PageType, UserType } from "../types/types";
import { ApplicationConstructor } from "../types/constructors";
import ArrayExt from "../utils/arrayExt";
const { isObjectUnique } = ArrayExt;
import { RoleEnum } from "../types/enum";
import Str from "../utils/str";
const { matchValue } = Str;

/**
 * Initiates a new Application.
 */
export default class Application {
  private currentPath: string;
  private currentPage: PageType;
  private pages: PageType[];
  private notFound: PageType;
  user?: UserType;

  /**
   * Initiates a new Application.
   * @param {Array.PageType} pages - The pages of your application. Use the Page API to make them.
   * @param {PageType} notFound - A special 404 page that will be displayed if the path has no match. Use again Page API.
   * @param {Array.UserType} [users] - (optional) An array of user instances for handling roles. Recommended if the application has private pages.
   */
  constructor({ pages, notFound, user }: ApplicationConstructor) {
    pages.forEach((page) => {
      const { path } = page;
      if (!isObjectUnique(pages, "path", path)) throw new Error(`The pages of your application must have unique paths.`);
    });
    this.pages = pages;
    this.notFound = notFound;
    if (user) this.user = user;
    this.currentPath = window.location.pathname;
  }

  /**
   * Redirects to a new path.
   * @param {string} newPath - Enter the new path (example : /contact or just contact).
   */
  static goTo(newPath: string) {
    history.pushState({}, "set new path", newPath.startsWith("/") ? newPath : `/${newPath}`);
    window.dispatchEvent(new Event("pathchange"));
  }

  /**
   * Makes the router listen to path requests and serve the corresponding pages.
   */
  start(): void {
    const events = ["DOMContentLoaded", "popstate", "pathchange"];
    events.forEach((event) =>
      window.addEventListener(event, async (e) => {
        e.preventDefault();
        const { pages, notFound, user } = this;
        this.currentPath = window.location.pathname;

        if (this.currentPage) {
          if (this.currentPage.path === this.currentPath) return;
          else this.currentPage.leave();
        }
        const foundPage = pages.find((page) => page.path === this.currentPath);
        this.currentPage = foundPage ? foundPage : notFound;

        const { ADMIN, USER } = RoleEnum;
        const { currentPage } = this;
        if (matchValue(currentPage.accessLevel, [ADMIN, USER])) {
          if ((user && !user.isLoggedIn) || !user) {
            await this.user.authenticate();            
            if (!user.isLoggedIn) {
              currentPage.denyAccess();
              if (!user)
                console.warn(
                  `The page with path ${currentPage.path} has access restrictions. Though there is no user set up to deal with permissions.`
                );
              return;
            }
          }
        }
        currentPage.reach();
      })
    );
  }
}
