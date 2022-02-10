import { CommonMediaConstructor } from "../../types/constructors";
import { MediaTypeEnum } from "../../types/enum";
import { SourceType } from "../../types/types";
import Common from "../Common";

export default class CommonMedia extends Common {
  #source?: string;
  #children?: SourceType[];
  #noSupportMessage?: string;
  #autoplay: boolean = false;
  #showControls: boolean = false;
  #loop: boolean = false;
  #muted: boolean = false;
  #render: HTMLAudioElement | HTMLVideoElement;

  constructor({ id, classes, exclusionList, source, children, noSupportMessage, autoplay, showControls, loop, muted }: CommonMediaConstructor) {
    super({ id, classes, exclusionList });
    if (source) this.#source = source;    
    if (children) this.setChildren(children);
    if (noSupportMessage) this.#noSupportMessage = noSupportMessage;
    if (autoplay) this.#autoplay = true;
    if (showControls) this.#showControls = true;
    if (loop) this.#loop = true;
    if (muted) this.#muted = true;
  }

  // ***************************
  // Getters
  // ***************************

  get source(): string {
    return this.#source;
  }

  get children(): SourceType[] {
    return this.#children;
  }

  get noSupportMessage(): string {
    return this.#noSupportMessage;
  }

  get autoplay(): boolean {
    return this.#autoplay;
  }

  get showControls(): boolean {
    return this.#showControls;
  }

  get loop(): boolean {
    return this.#loop;
  }

  get muted(): boolean {
    return this.#muted;
  }

  // ***************************
  // Setters
  // ***************************

  setSource(source: string) {
    if (this.children) throw new Error("In order to use the source attribute, you must get rid of the children elements.");
    this.#source = this.#render.src = source;
  }

  setChildren(children: SourceType[]) {
    if (this.source) throw new Error("In order to set children up, you must get rid of the source attribute.");
    if (this.isMounted) this.removeChildren();
    this.#children = [];
    children.forEach((child) => {
      if (child.render.tagName === "SOURCE") {
        if (child.mediaType === MediaTypeEnum.PICTURE)
          throw new Error(`The source element with media type PICTURE can only be used inside Picture elements.`);
        if (this.isMounted) {
          child.setParentSerial(this.serial);
          child.mount();
        }
        this.#children.push(child);
      } else throw new Error("Audio/Video can only take Source elements as children.");
    });
  }

  setNoSupportMessage(message: string) {
    this.#noSupportMessage = this.#render.textContent = message;
  }

  setAutoplay(value: boolean) {
    this.#autoplay = this.#render.autoplay = value;
  }

  setShowControls(value: boolean) {
    this.#showControls = this.#render.controls = value;
  }

  setLoop(value: boolean) {
    this.#loop = this.#render.loop = value;
  }

  setMuted(value: boolean) {
    this.#muted = this.#render.muted = value;
  }

  protected build(tag: string): any {
    const { source, noSupportMessage, autoplay, showControls, loop, muted } = this;
    const element = super.build(tag) as HTMLAudioElement | HTMLVideoElement;
    if (source) element.src = source;
    if (noSupportMessage) element.textContent = noSupportMessage;
    if (autoplay) element.autoplay = true;
    if (showControls) element.controls = true;
    if (loop) element.loop = true;
    if (muted) element.muted = true;
    return element;
  }
}
