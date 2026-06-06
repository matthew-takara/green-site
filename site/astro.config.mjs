// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  // pre-built HTML files; no server runtime required
  output: "static",

  adapter: cloudflare()
});