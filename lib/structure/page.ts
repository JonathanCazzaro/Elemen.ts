import { GenericElement } from "../types/types";
import { PageConstructor } from "../types/constructors";
import { DisplayModeEnum, FileEnum, RoleEnum } from "../types/enum";
import File from "../utils/file";
const { load, unload } = File;

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
  accessLevel: RoleEnum = RoleEnum.VISITOR;
  denyAccess: () => void = () => null;

  /**
   * Initiates a new Page.
   * @param {string} path - The path used to get to the page (example : /contact or just contact).
   * @param {string} [title] - (optional) The title of the page (should be 60-65 characters max). Leave it blank if you want to keep the title that has been defined in the HTML template.
   * @param {string} [description] - (optional) Description of the page for SEO (should be 155 characters max).
   * @param {Array.string} [cssFiles] - (optional) An array of relative paths to CSS files to be loaded dynamically.
   * @param {Array.string} [jsFiles] - (optional) An array of relative paths to JS files to be loaded dynamically.
   * @param {RoleEnum} [accessLevel] - (optional) Define the access level of the page using enum RoleEnum. If not set, default will be VISITOR.
   * @param {function} [denyAccess] - (optional) Behaviour of the application when the access to the page is not granted.
   */
  constructor({ title, description, path, cssFiles, jsFiles, accessLevel, denyAccess }: PageConstructor) {
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
    if (accessLevel) this.accessLevel = accessLevel;
    if (denyAccess) this.denyAccess = denyAccess;
  }

  private setDescriptionTag(): void {
    if (this.description) {
      const descriptionTag: HTMLMetaElement = document.querySelector('meta[name="description"]');
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

  /**
   * Sets the page as active in the browser.
   */
  reach(rootElementId?: string): void {
    this.isActive = true;
    let dynamicAssets: (HTMLLinkElement | HTMLScriptElement)[] = [];
    if (this.cssFiles) dynamicAssets = load(FileEnum.CSS, this.cssFiles);
    if (this.jsFiles) dynamicAssets = [...dynamicAssets, ...load(FileEnum.JS, this.jsFiles)];
    if (this.title) document.title = this.title;
    else if (!document.title)
      throw new Error(`A title for the page must be defined, either in the HTML template or with the Page API in the frontend library.`);
    this.setDescriptionTag();

    const staticElements = this.content.filter((element) => element.displayMode === DisplayModeEnum.STATIC);
    const dynamicElements = this.content.filter((element) => element.displayMode === DisplayModeEnum.DYNAMIC);

    if (staticElements.length) staticElements.forEach((element) => element.mount(rootElementId || ""));
    if (dynamicElements.length)
      dynamicAssets[dynamicAssets.length - 1].onload = () => {
        dynamicElements.forEach((element) => element.mount(rootElementId || ""));
        document.dispatchEvent(new Event("reached"));
      };
    else document.dispatchEvent(new Event("reached"));
  }

  /**
   * Clears the page from the document.
   */
  leave(): void {
    if (this.cssFiles) unload(FileEnum.CSS, this.cssFiles);
    if (this.jsFiles) unload(FileEnum.JS, this.jsFiles);

    this.isActive = false;
    if (this.content) this.content.forEach((element) => element.unmount());
  }

  /** Specifies a behaviour after the page has been loaded.
   * @param {object} callback - Callback to describe actions.
   */
  onReach(callback: () => void): void {
    document.addEventListener("reached", () => {
      if (this.isActive) callback();
    });
  }
}
