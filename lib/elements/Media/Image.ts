import { ProduceSettingsConfig } from "../../types/configObjects";
import { ImageConstructor } from "../../types/constructors";
import { ImageType } from "../../types/types";
import Str from "../../utils/str";
const { checkSourceSet, checkMediaQueries } = Str;
import Common from "../Common";

/**
 * Initiates a new Image (img).
 */
export default class Image extends Common {
  #source: string;
  #description: string;
  #sourceSet?: string;
  #mediaQueries?: string;
  static _class = Image;

  /**
   * Initiates a new Image (img).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} source - URL/path of the image file.
   * @param {string} description - Short description of the image (-> alt). Enter an empty string if the image is purely decorative.
   * @param {string} [sourceSet] - (optional) An array of alternative sources matching the following pattern : "filepath width" (example: "mysource.png 480w")
   * @param {string} [mediaQueries] - (optional) An array containing either a mediaquery associated to a width (example: "(min-width: 720px) 540px"), or only a width that will be used if no mediaquery has matched.
   */
  constructor({ id, classes, exclusionList, source, description, sourceSet, mediaQueries }: ImageConstructor) {
    super({ id, classes, exclusionList });
    const element = this.build("img");
    this.setRender(element);  
    this.setSource(source);
    this.setDescription(description);
    if (sourceSet) this.setSourceSet(sourceSet);
    if (mediaQueries) this.setMediaQueries(mediaQueries);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLImageElement {
    return this._render as HTMLImageElement;
  }

  get source(): string {
    return this.#source;
  }

  get description(): string {
    return this.#description;
  }

  get sourceSet(): string {
    return this.#sourceSet;
  }

  get mediaQueries(): string {
    return this.#mediaQueries;
  }

  // ***************************
  // Setters
  // ***************************

  setSource(source: string) {
    this.#source = this.render.src = source;
  }

  setDescription(description: string) {
    this.#description = this.render.alt = description;
  }

  setSourceSet(set: string[]) {
    if (!checkSourceSet(set))
      throw new Error(`The sourceSet argument is invalid. Format must be : "filepath resolution". Example : "myimage.jpg 480w"`);
    this.#sourceSet = this.render.srcset = set.join(",");
  }

  setMediaQueries(queries: string[]) {
    if (!this.sourceSet) throw new Error("mediaQueries argument require to have previously filled the sourceSet argument.");
    if (!checkMediaQueries(queries))
      throw new Error(
        `The mediaQueries argument is invalid. Format must be : "(mediaquery) resolution" or just "resolution. Example : "(max-width: 1024px) 768px/vw/em" or just "768px/vw/em`
      );
    this.#mediaQueries = this.render.sizes = queries.join(",");
  }

  static produce(settings: ProduceSettingsConfig): ImageType[] {
    return super.produce(settings) as ImageType[];
  }
}
