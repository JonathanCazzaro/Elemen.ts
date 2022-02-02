import { GenericElement, UserType } from "../types/types";
import { PageConstructor } from "../types/constructors";
import { FileEnum } from "../types/enum";
import File from "../utils/file";

/**
 * Initiates a new Page.
 */
export default class Page {
  title?: string;
  description?: string;
  readonly path: string;
  protected content?: GenericElement[];
  readonly cssFiles?: string[];
  readonly jsFiles?: string[];
  isActive: boolean = false;
  private isPrivate: boolean = false;
  handleAuthenficationFail: () => void;

  /**
   * Initiates a new Page.
   * @param {string} path - The path used to get to the page (example : /contact or just contact).
   * @param {string} [title] - (optional) The title of the page (should be 60-65 characters max). Leave it blank if you want to keep the title that has been defined in the HTML template.
   * @param {string} [description] - (optional) Description of the page for SEO (should be 155 characters max).
   * @param {Array.string} [cssFiles] - (optional) An array of relative paths to CSS files to be loaded dynamically.
   * @param {Array.string} [jsFiles] - (optional) An array of relative paths to JS files to be loaded dynamically.
   * @param {Array.string} [isPrivate] - (optional) If true, an authentification check will be performed before serving the page. Default is false.
   */
  constructor({
    title,
    description,
    path,
    cssFiles,
    jsFiles,
    isPrivate,
  }: PageConstructor) {
    this.path = path.startsWith("/") ? path : `/${path}`;

    if (title) {
      if (title.length > 65)
        console.warn(
          `WARNING : The title of the page with path ${path} is ${title.length} characters long. Consider not writing titles longer than 65 characters.`
        );
      this.title = title;
    }

    if (description) {
      if (description.length > 155)
        console.warn(
          `WARNING : The description of the page with path ${path} is ${description.length} characters long. Consider not writing descriptions longer than 155 characters.`
        );
      this.description = description;
    }

    if (cssFiles) this.cssFiles = cssFiles;
    if (jsFiles) this.jsFiles = jsFiles;
    if (isPrivate) this.isPrivate = true;
  }

  private setDescriptionTag(): void {
    if (this.description) {
      const descriptionTag: HTMLMetaElement = document.querySelector(
        'meta[name="description"]'
      );
      if (!descriptionTag) {
        const titleTag = document.querySelector("title");
        const newDescriptionTag = document.createElement("meta");
        newDescriptionTag.name = "description";
        newDescriptionTag.content = this.description;
        titleTag.after(newDescriptionTag);
      } else descriptionTag.content = this.description;
    }
  }

  /**
   * Describes the content of the page.
   */
  setContent(elements: GenericElement[]): void {
    this.content = elements;
  }

  setAuthenficationFailHandler(customMethod: () => void): void {
    this.handleAuthenficationFail = customMethod;
  }

  /**
   * Sets the page as active in the browser.
   */
  reach(user?: UserType): void {
    if (this.isPrivate) {
    }
    if (this.title) document.title = this.title;
    else if (!document.title)
      throw new Error(
        `A title for the page must be defined, either in the HTML template or with the Page API in the frontend library.`
      );
    this.setDescriptionTag();

    if (this.cssFiles) File.load(FileEnum.CSS, this.cssFiles);
    if (this.jsFiles) File.load(FileEnum.JS, this.jsFiles);

    this.isActive = true;
    if (this.content) this.content.forEach((element) => element.mount());
  }

  /**
   * Clears the page from the document.
   */
  leave(): void {
    if (this.cssFiles) File.unload(FileEnum.CSS, this.cssFiles);
    if (this.jsFiles) File.unload(FileEnum.JS, this.jsFiles);

    this.isActive = false;
    if (this.content) this.content.forEach((element) => element.unmount());
  }
}
