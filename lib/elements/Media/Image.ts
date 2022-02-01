import { ImageConstructor } from "../../types/constructors";
import Str from "../../utils/str";
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
      if (!Str.checkSourceSet(sourceSet))
        throw new Error(
          `The sourceSet argument is invalid. Format must be : "filepath resolution". Example : "myimage.jpg 480w"`
        );
      this.sourceSet = sourceSet.join(",");
    }
    if (mediaQueries) {
      if (!sourceSet) throw new Error(`mediaQueries argument require to have previously filled the sourceSet argument.`);
      if (!Str.checkMediaQueries(mediaQueries))
        throw new Error(
          `The mediaQueries argument is invalid. Format must be : "(mediaquery) resolution". Example : "(max-width: 1024px) 768px"`
        );
      this.mediaQueries = mediaQueries.join(",");
    }
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
