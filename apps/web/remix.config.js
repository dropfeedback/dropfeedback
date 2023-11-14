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
      route("login", "routes/auth/login/route.tsx");
      route("login/email", "routes/auth/login/email/route.tsx", {
        index: true,
      });
      route("signup", "routes/auth/signup/route.tsx");
      route("signup/email", "routes/auth/signup/email/route.tsx", {
        index: true,
      });
      route("dashboard", "routes/dashboard/layout.tsx", () => {
        route("", "routes/dashboard/route.tsx", { index: true });
        route(":projectId", "routes/dashboard/project/layout.tsx", () => {
          route("", "routes/dashboard/project/overview.tsx", { index: true });
          route("feedbacks", "routes/dashboard/project/feedbacks.tsx", {
            index: true,
          });
          route("team", "routes/dashboard/project/team.tsx", { index: true });
          route("integrations", "routes/dashboard/project/integrations.tsx", {
            index: true,
          });
        });
      });
    });
  },
};
