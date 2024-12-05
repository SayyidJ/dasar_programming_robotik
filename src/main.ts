import { App } from "./app/app";

async function main() {
  const app = new App();
  ("init app");
  await app.init();
}

main();
