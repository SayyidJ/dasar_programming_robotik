import { Application } from "pixi.js";
import { Game } from "./game";

async function main() {
  const placeholder = document.getElementById("_game");
  if (!placeholder) {
    throw "PLACEHOLDER NOT FOUND #_game";
  }
  const app = new Game(placeholder);
  await app.init();
}

main();
