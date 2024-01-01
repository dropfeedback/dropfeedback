/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  postcss: true,
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["worker"],
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  routes(defineRoutes) {
    return defineRoutes((route) => {
      // public routes
      route("/", "routes/landing/route.tsx", { index: true });
      route("docs", "routes/docs/route.tsx");
      // auth page routes
      route("", "routes/auth/layout.tsx", () => {
        route("login", "routes/auth/login/route.tsx");
        route("login/email", "routes/auth/login/email/route.tsx", {
          index: true,
        });
        route("signup", "routes/auth/signup/route.tsx");
        route("signup/email", "routes/auth/signup/email/route.tsx", {
          index: true,
        });
      });
      // protected routes
      route("dashboard", "routes/dashboard/layout.tsx", () => {
        route("", "routes/dashboard/route.tsx", { index: true });
        route(":projectId", "routes/dashboard/project/layout.tsx", () => {
          route("", "routes/dashboard/project/feedbacks.tsx", {
            index: true,
          });
          route("team", "routes/dashboard/project/team.tsx", { index: true });
          route("settings", "routes/dashboard/project/settings.tsx", {
            index: true,
          });
        });
        route(
          "email-verification",
          "routes/dashboard/email-verification/route.tsx",
        );
        route("settings", "routes/dashboard/settings.tsx", { index: true });
      });
    });
  },
};
