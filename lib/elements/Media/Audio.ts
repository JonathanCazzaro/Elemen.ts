import { AudioConstructor } from "../../types/constructors";
import CommonMedia from "./Common";

/**
 * Initiates a new Audio.
 */
export default class Audio extends CommonMedia {
  readonly render: HTMLAudioElement;

  /**
   * Initiates a new Audio.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements is any.
   * @param {string} [src] - (optional) URL/path of the media file. If used, children elements would then not be processed.
   * @param {string} [noSupportMessage] - (optional) Text to be displayed if the browser does not support the feature.
   * @param {boolean} [autoplay] - (optional) Boolean to specify whether the element should be set on autoplay or not (not recommanded).
   * @param {boolean} [showControls] - (optional) Boolean to specify whether the element should provide controls or not.
   * @param {boolean} [loop] - (optional) Boolean to specify whether the element should be set on loop or not.
   * @param {boolean} [muted] - (optional) Boolean to specify whether the element should be muted or not.
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
  }: AudioConstructor) {
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
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLAudioElement {
    const { src, noSupportMessage, autoplay, showControls, loop, muted } = this;
    const element = super.build("audio") as HTMLAudioElement;
    if (src) element.src = src;
    if (noSupportMessage) element.textContent = noSupportMessage;
    if (autoplay) element.autoplay = true;
    if (showControls) element.controls = true;
    if (loop) element.loop = true;
    if (muted) element.muted = true;
    return element;
  }
}
