import { FileEnum } from "../types/enum";

/**
 * File API designed to interact with local files.
 */
export default class File {
  /**
   * Dynamically links CSS or JS files to the HTML document.
   * @param {FileEnum} type - CSS or JS through FileEnum.
   * @param {Array.string} paths - An array containing the relative paths to the files inside the build folder.
   */
  static load(type: FileEnum, paths: string[]): (HTMLLinkElement|HTMLScriptElement)[] {
    let dynamicAssets: (HTMLLinkElement|HTMLScriptElement)[] = [];
    switch (type) {
      case FileEnum.CSS:
        paths.forEach((path) => {
          const newCSSPath = document.createElement("link");
          newCSSPath.rel = "stylesheet";
          newCSSPath.href = path;
          dynamicAssets.push(newCSSPath);
          document.head.appendChild(newCSSPath);
        });
        break;
      case FileEnum.JS:
        paths.forEach((path) => {
          const newJSPath = document.createElement("script");
          newJSPath.src = path;
          newJSPath.defer = true;
          dynamicAssets.push(newJSPath);
          const existingJsScripts =
            document.head.getElementsByTagName("script");
          existingJsScripts[existingJsScripts.length - 1].after(newJSPath);
        });
        break;
    }
    return dynamicAssets;
  }

  /**
   * Dynamically remove CSS or JS files from the HTML document.
   * @param {FileEnum} type - CSS or JS through FileEnum.
   * @param {Array.string} paths - An array containing the relative paths to the files inside the build folder.
   */
  static unload(type: FileEnum, paths: string[]): void {
    switch (type) {
      case FileEnum.CSS:
        const cssElements = Array.from(
          document.head.getElementsByTagName("link")
        );
        paths.forEach((path) => {
          const foundElement = cssElements.find(
            (element) => element.href.endsWith(path)
          );
          if (foundElement) foundElement.remove();
        });
        break;
      case FileEnum.JS:
        paths.forEach((path) => {
          const jsElements = Array.from(
            document.head.getElementsByTagName("script")
          );
          paths.forEach((path) => {
            const foundElement = jsElements.find(
              (element) => element.src === path
            );
            if (foundElement) foundElement.remove();
          });
        });
        break;
    }
  }
}
