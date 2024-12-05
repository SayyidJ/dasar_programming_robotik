import { Application, Size } from "pixi.js";
import { monaco } from "./monaco";
import { addLib } from "./add_lib";

export class App {
  readonly pixi: Application = new Application();
  public arrowBtnL: HTMLElement;
  public arrowBtnR: HTMLElement;
  public judulMateriContainer: HTMLDivElement;
  protected pixiContainer: HTMLDivElement;
  protected editorContainer: HTMLDivElement;
  private _resizeObserver: ResizeObserver;
  protected codeEditor: monaco.editor.IStandaloneCodeEditor;
  protected logContainer: HTMLElement;
  protected evalBtn: HTMLButtonElement;
  protected resizeListener: Set<(size: Size) => void> = new Set<
    (size: Size) => void
  >();

  private _resizeCallback = (entries: ResizeObserverEntry[]) => {
    const { width, height } = entries[0].contentRect;
    this.resizeListener.forEach((fn) => {
      fn({ width, height });
    });
  };

  public async init() {
    this.initElement();
    await this.initPixi();
    this._resizeObserver = new ResizeObserver((entries) =>
      this._resizeCallback(entries)
    );
    this._resizeObserver.observe(this.pixiContainer);
    this.initMonacoEditor();
    addLib();
  }

  private initElement() {
    this.pixiContainer = document.getElementById(
      "pixi-container"
    ) as HTMLDivElement;
    this.editorContainer = document.getElementById(
      "editor-container"
    ) as HTMLDivElement;
    this.judulMateriContainer = document.getElementById(
      "judul-materi"
    ) as HTMLDivElement;
    this.logContainer = document.getElementById("console-container")!;
    this.arrowBtnL = document.getElementById("arrow-left")!;
    this.arrowBtnR = document.getElementById("arrow-right")!;
    this.evalBtn = document.getElementById("eval-btn") as HTMLButtonElement;
    this.initEvalButton();
  }

  private initEvalButton() {
    this.evalBtn.onclick = async (e) => {
      const model = this.codeEditor.getModel();

      if (!model) {
        return;
      }
      const worker = await monaco.languages.typescript.getTypeScriptWorker();
      const proxy = await worker(model.uri);
      const { outputFiles } = await proxy.getEmitOutput(model.uri.toString());
      this.executeJS(outputFiles[0].text);
    };
  }

  private executeJS(text: string) {
    try {
      while (this.logContainer.firstChild) {
        this.logContainer.removeChild(this.logContainer.firstChild);
      }
      eval(text);
    } catch (e) {
      const error = document.createElement("span");
      error.textContent = e;
      error.classList.add("error-log");
      this.logContainer.appendChild(error);
    }
  }

  private async initPixi() {
    await this.pixi.init({
      resizeTo: this.pixiContainer,
      backgroundAlpha: 0,
    });
    this.pixiContainer.appendChild(this.pixi.canvas);
  }

  private initMonacoEditor() {
    this.codeEditor = monaco.editor.create(this.editorContainer, {
      value: "",
      language: "typescript",
      theme: "vs-dark",
      minimap: { enabled: false },
      padding: {
        top: 24,
      },
    });
  }
}
