/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  postcss: true,
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "routes/landing/route.tsx", { index: true });
      route("docs", "routes/docs/route.tsx");
      route("dashboard", "routes/dashboard/layout.tsx", () => {
        route("", "routes/dashboard/route.tsx", { index: true });
        route(":projectId", "routes/dashboard/project/layout.tsx", () => {
          route("", "routes/dashboard/project/route.tsx", { index: true });
        });
      });
    });
  },
};
