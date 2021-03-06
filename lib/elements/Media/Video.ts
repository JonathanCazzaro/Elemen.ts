import { ProduceSettingsConfig } from "../../types/configObjects";
import { VideoConstructor } from "../../types/constructors";
import { VideoType } from "../../types/types";
import CommonMedia from "./Common";

/**
 * Initiates a new Video.
 */
export default class Video extends CommonMedia {
  #height?: number;
  #width?: number;
  #posterFrame?: string;
  static _class = Video;

  /**
   * Initiates a new Video.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements is any.
   * @param {string} [source] - (optional) URL/path of the media file. If used, children elements would then not be processed.
   * @param {string} [noSupportMessage] - (optional) Text to be displayed if the browser does not support the feature.
   * @param {boolean} [autoplay] - (optional) Boolean to specify whether the element should be set on autoplay or not (not recommanded).
   * @param {boolean} [showControls] - (optional) Boolean to specify whether the element should provide controls or not.
   * @param {boolean} [loop] - (optional) Boolean to specify whether the element should be set on loop or not.
   * @param {boolean} [muted] - (optional) Boolean to specify whether the element should be muted or not.
   * @param {number} [height] - (optional) The height of the video player in pixels (just the numeric value).
   * @param {number} [width] - (optional) The width of the video player in pixels (just the numeric value).
   * @param {string} [posterFrame] - (optional) An URL to a frame which will be displayed either when the player is loading or until the user launches the video.
   */
  constructor({
    id,
    data_id,
    classes,
    exclusionList,
    source,
    children,
    noSupportMessage,
    autoplay,
    showControls,
    loop,
    muted,
    height,
    width,
    posterFrame,
    displayMode,
  }: VideoConstructor) {
    super({
      id,
      data_id,
      classes,
      exclusionList,
      children,
      source,
      noSupportMessage,
      autoplay,
      showControls,
      loop,
      muted,
      displayMode,
    });
    const element = this.build("video");
    this.setRender(element);
    if (height) this.setHeight(height);
    if (width) this.setWidth(width);
    if (posterFrame) this.setPosterFrame(posterFrame);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLVideoElement {
    return this._render as HTMLVideoElement;
  }

  get height(): number {
    return this.#height;
  }

  get width(): number {
    return this.#width;
  }

  get posterFrame(): string {
    return this.#posterFrame;
  }

  // ***************************
  // Setters
  // ***************************

  setHeight(height: number) {
    this.#height = this.render.height = height;
  }

  setWidth(width: number) {
    this.#width = this.render.width = width;
  }

  setPosterFrame(posterFrame: string) {
    this.#posterFrame = this.render.poster = posterFrame;
  }

  static produce(settings: ProduceSettingsConfig): VideoType[] {
    return super.produce(settings) as VideoType[];
  }
}
