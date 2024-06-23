import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalRoot } from "@/components/global-modals/modal-root";
import { QueryClientProvider } from "@/lib/react-query";
import { CONFIG } from "@/lib/config";
import { Authenticated } from "@/components/authenticated";
import { PageLogin } from "@/pages/auth/login";
import { PageLoginWithEmail } from "@/pages/auth/login/email";
import { LayoutAuthPage } from "@/components/layouts/auth-page";
import { PageSignup } from "@/pages/auth/signup";
import { PageSignupWithEmail } from "@/pages/auth/signup/email";
import { LayoutCommon } from "@/components/layouts/common";
import { PageProjectList } from "@/pages/projects/list";
import { LayoutProject } from "@/components/layouts/project";
import { PageProjectFeedbackList } from "@/pages/projects/feedbacks/list";
import { PageProjectTeam } from "@/pages/projects/team";
import { PageProjectSettings } from "@/pages/projects/settings";
import { PageSettings } from "@/pages/settings";
import { PageProjectFeedbackDetail } from "@/pages/projects/feedbacks/detail";
import { PageEmailVerification } from "@/pages/email-verification";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider>
          <GoogleOAuthProvider clientId={CONFIG.googleClientId}>
            <main className="relative min-h-screen">
              <ModalRoot />
              <Routes>
                <Route
                  element={
                    <Authenticated key="protected">
                      <LayoutCommon>
                        <Outlet />
                      </LayoutCommon>
                    </Authenticated>
                  }
                >
                  <Route index element={<Navigate to="/projects" />} />

                  <Route path="/projects" element={<Outlet />}>
                    <Route index element={<PageProjectList />} />

                    <Route
                      path=":projectId"
                      element={
                        <LayoutProject>
                          <Outlet />
                        </LayoutProject>
                      }
                    >
                      <Route index element={<Navigate to="feedbacks" />} />

                      <Route
                        path="feedbacks"
                        element={<PageProjectFeedbackList />}
                      />
                      <Route
                        path="feedbacks/:feedbackId"
                        element={<PageProjectFeedbackDetail />}
                      />
                      <Route path="team" element={<PageProjectTeam />} />
                      <Route
                        path="settings"
                        element={<PageProjectSettings />}
                      />
                    </Route>
                  </Route>

                  <Route path="settings" element={<PageSettings />} />
                  <Route
                    path="email-verification"
                    element={<PageEmailVerification />}
                  />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="auth-pages"
                      fallback={
                        <LayoutAuthPage>
                          <Outlet />
                        </LayoutAuthPage>
                      }
                    >
                      <Navigate to="/" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<PageLogin />} />
                  <Route path="/login/email" element={<PageLoginWithEmail />} />
                  <Route path="/signup" element={<PageSignup />} />
                  <Route
                    path="/signup/email"
                    element={<PageSignupWithEmail />}
                  />
                </Route>

                <Route
                  path="*"
                  element={
                    <>
                      <div>404</div>
                      <Link to="/">Go home</Link>
                    </>
                  }
                />
              </Routes>
            </main>
          </GoogleOAuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
