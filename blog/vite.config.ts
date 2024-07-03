import { installGlobals } from "@remix-run/node";
import { viteOkugin } from "@remix-run/dev"
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
  plugins: [remix()],
});
