import { defineConfig } from "vite";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default () => {
  return defineConfig({
    root: "src",
    plugins: [monacoEditorPlugin({})],
  });
};
