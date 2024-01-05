import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  // @ts-ignore
  build,
  getLoadContext: (context) => ({ env: context.env }),
  mode: build.mode,
});
