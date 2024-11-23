import { Application, ApplicationOptions, Size } from "pixi.js";

export class Game extends Application {
  constructor(placeholder: HTMLElement) {
    super();
    this.placeholder = placeholder;
    this.observer = new ResizeObserver(this.onResize.bind(this));
  }
  readonly placeholder: HTMLElement;
  readonly observer: ResizeObserver;
  private isInited = false;

  async init(options?: Partial<ApplicationOptions>): Promise<void> {
    if (this.isInited) {
      return;
    }
    super.init({
      resizeTo: this.placeholder,
      backgroundColor: "orange",
    });
    this.observer.observe(this.placeholder);
    this.canvas.style.display = "block";
    this.placeholder.appendChild(this.canvas);
    this.isInited = true;
  }

  private onResize(e: ResizeObserverEntry[]) {
    if (e.length < 1) {
      return;
    }
    const entry = e[0];
    const { width, height } = entry.contentRect;
    console.log(width, height);
  }
}
