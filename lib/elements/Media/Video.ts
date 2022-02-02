import { VideoConstructor } from "../../types/constructors";
import CommonMedia from "./Common";

/**
 * Initiates a new Video.
 */
export default class Video extends CommonMedia {
  height?: number;
  width?: number;
  posterFrame?: string;
  readonly render: HTMLVideoElement;

  /**
   * Initiates a new Video.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements is any.
   * @param {string} [src] - (optional) URL/path of the media file. If used, children elements would then not be processed.
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
    classes,
    src,
    children,
    noSupportMessage,
    autoplay,
    showControls,
    loop,
    muted,
    height,
    width,
    posterFrame,
  }: VideoConstructor) {
    super({
      id,
      classes,
      children,
      src,
      noSupportMessage,
      autoplay,
      showControls,
      loop,
      muted,
    });
    if (height) this.height = height;
    if (width) this.width = width;
    if (posterFrame) this.posterFrame = posterFrame;
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLVideoElement {
    const {
      src,
      noSupportMessage,
      autoplay,
      showControls,
      loop,
      muted,
      height,
      width,
      posterFrame,
    } = this;
    const element = super.build("video") as HTMLVideoElement;
    if (src) element.src = src;
    if (noSupportMessage) element.textContent = noSupportMessage;
    if (autoplay) element.autoplay = true;
    if (showControls) element.controls = true;
    if (loop) element.loop = true;
    if (muted) element.muted = true;
    if (height) element.height = height;
    if (width) element.width = width;
    if (posterFrame) element.poster = posterFrame;
    return element;
  }
}
