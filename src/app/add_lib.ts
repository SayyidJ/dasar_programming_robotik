import { monaco } from "./monaco";

export function addLib(): void {
  monaco.languages.typescript.typescriptDefaults.addExtraLib("", "global.d.ts");
}
