import { ImageConstructor } from "../../types/constructors";
import Str from "../../utils/str";
const { checkSourceSet, checkMediaQueries } = Str;
import Common from "../Common";

/**
 * Initiates a new Image (img).
 */
export default class Image extends Common {
  source: string;
  description: string;
  sourceSet?: string;
  mediaQueries?: string;
  readonly render: HTMLImageElement;

  /**
   * Initiates a new Image (img).
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} source - URL/path of the image file.
   * @param {string} description - Short description of the image (-> alt). Enter an empty string if the image is purely decorative.
   * @param {string} [sourceSet] - (optional) An array of alternative sources matching the following pattern : "filepath width" (example: "mysource.png 480w")
   * @param {string} [mediaQueries] - (optional) An array containing either a mediaquery associated to a width (example: "(min-width: 720px) 540px"), or only a width that will be used if no mediaquery has matched.
   */
  constructor({
    id,
    classes,
    source,
    description,
    sourceSet,
    mediaQueries,
  }: ImageConstructor) {
    super({ id, classes });
    this.source = source;
    this.description = description;
    if (sourceSet) {
      if (!checkSourceSet(sourceSet))
        throw new Error(
          `The sourceSet argument is invalid. Format must be : "filepath resolution". Example : "myimage.jpg 480w"`
        );
      this.sourceSet = sourceSet.join(",");
    }
    if (mediaQueries) {
      if (!sourceSet)
        throw new Error(
          `mediaQueries argument require to have previously filled the sourceSet argument.`
        );
      if (!checkMediaQueries(mediaQueries))
        throw new Error(
          `The mediaQueries argument is invalid. Format must be : "(mediaquery) resolution" or just "resolution. Example : "(max-width: 1024px) 768px/vw/em" or just "768px/vw/em`
        );
      this.mediaQueries = mediaQueries.join(",");
    }
    this.render = this.build();
  }

  /**
   * Sets a new source for the image.
   * @param {string} newSource - URL/path of the image file.
   */
  setSource(newSource: string): void {
    this.source = newSource;
    this.render.src = this.source;
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLImageElement {
    const { source, description, sourceSet, mediaQueries } = this;
    const element = super.build("img") as HTMLImageElement;
    element.src = source;
    if (sourceSet) element.srcset = sourceSet;
    if (mediaQueries) element.sizes = mediaQueries;
    element.alt = description;
    return element;
  }
}
