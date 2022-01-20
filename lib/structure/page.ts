import { PageConstructor } from "../types/types";
import { FileEnum } from "../types/enum";
import File from "../utils/file";

/**
 * Initiates a new Page.
 */
export default class Page {
  title: string;
  description?: string;
  readonly path: string;
  readonly cssFiles?: string[];
  readonly jsFiles?: string[];

  /**
   * Initiates a new Page.
   * @param {string} path - The path used to get to the page (starting with a / character).
   * @param {string} title - The title of the page (should be 60-65 characters max).
   * @param {string} [description] - (optional) Description of the page for SEO (should be 155 characters max).
   * @param {Array.string} [cssFiles] - (optional) An array of relative paths to CSS files to be loaded dynamically.
   * @param {Array.string} [jsFiles] - (optional) An array of relative paths to JS files to be loaded dynamically.
   */
  constructor({
    title,
    description,
    path,
    cssFiles,
    jsFiles,
  }: PageConstructor) {
    if (!/^\//.test(path))
      throw new Error(
        `The path -- ${path} -- should start with a / character.`
      );
    else this.path = path;
    if (title.length > 65)
      console.warn(
        `WARNING : The title of the page with path ${path} is ${title.length} characters long. Consider not writing titles longer than 65 characters.`
      );
    this.title = title;
    if (description) {
      if (description.length > 155)
        console.warn(
          `WARNING : The description of the page with path ${path} is ${description.length} characters long. Consider not writing descriptions longer than 155 characters.`
        );
      this.description = description;
    }
    if (cssFiles) this.cssFiles = cssFiles;
    if (jsFiles) this.jsFiles = jsFiles;
  }

  /**
   * Describes the content of the page.
   */
  populate(): void {}

  /**
   * Mounts the page if the path has been reached.
   */
  mount(): void {
    document.title = this.title;
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
    if (this.cssFiles) File.load(FileEnum.CSS, this.cssFiles);
    if (this.jsFiles) File.load(FileEnum.JS, this.jsFiles);
  }

  unmount(): void {
    if (this.cssFiles) File.unload(FileEnum.CSS, this.cssFiles);
    if (this.jsFiles) File.unload(FileEnum.JS, this.jsFiles);
  }
}
