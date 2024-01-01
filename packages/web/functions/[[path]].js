var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 98,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
import { useState as useState2 } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

// app/components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function ThemeProvider({ children, ...props }) {
  return /* @__PURE__ */ jsxDEV2(NextThemesProvider, { ...props, children }, void 0, !1, {
    fileName: "app/components/theme-provider.tsx",
    lineNumber: 5,
    columnNumber: 10
  }, this);
}

// app/components/ui/toast.tsx
import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";

// app/lib/utils.ts
import * as dateFns from "date-fns";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var getRelativeTime = (date) => {
  let now = /* @__PURE__ */ new Date(), then = new Date(date), diff = dateFns.differenceInDays(now, then), isToday2 = dateFns.isToday(then);
  return diff === 0 && isToday2 ? `${dateFns.format(
    then,
    "HH:mm"
  )} (${dateFns.formatDistanceToNowStrict(then, { addSuffix: !0 })})` : diff === 0 ? `${dateFns.format(
    then,
    "PP HH:mm"
  )} (${dateFns.formatDistanceToNowStrict(then, { addSuffix: !0 })})` : `${dateFns.format(then, "PP HH:mm")}`;
}, getNameInitials = (name, count2 = 2) => name ? name.split(" ").map((n) => n[0]).join("").replace(/[^a-zA-Z]/g, "").slice(0, count2).toUpperCase() : "";

// app/components/ui/toast.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var ToastProvider = ToastPrimitives.Provider, ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toast.tsx",
    lineNumber: 14,
    columnNumber: 3
  },
  this
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Toast = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  ToastPrimitives.Root,
  {
    ref,
    className: cn(toastVariants({ variant }), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toast.tsx",
    lineNumber: 47,
    columnNumber: 5
  },
  this
));
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toast.tsx",
    lineNumber: 60,
    columnNumber: 3
  },
  this
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsxDEV3(Cross2Icon, { className: "h-4 w-4" }, void 0, !1, {
      fileName: "app/components/ui/toast.tsx",
      lineNumber: 84,
      columnNumber: 5
    }, this)
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toast.tsx",
    lineNumber: 75,
    columnNumber: 3
  },
  this
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold [&+div]:text-xs", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toast.tsx",
    lineNumber: 93,
    columnNumber: 3
  },
  this
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/toast.tsx",
    lineNumber: 105,
    columnNumber: 3
  },
  this
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// app/components/ui/use-toast.ts
import * as React2 from "react";
var TOAST_LIMIT = 1, TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  return count = (count + 1) % Number.MAX_VALUE, count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map(), addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId))
    return;
  let timeout = setTimeout(() => {
    toastTimeouts.delete(toastId), dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
}, reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      let { toastId } = action;
      return toastId ? addToRemoveQueue(toastId) : state.toasts.forEach((toast2) => {
        addToRemoveQueue(toast2.id);
      }), {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: !1
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      return action.toastId === void 0 ? {
        ...state,
        toasts: []
      } : {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
}, listeners = [], memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action), listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  let id = genId(), update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  }), dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  return dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: !0,
      onOpenChange: (open) => {
        open || dismiss();
      }
    }
  }), {
    id,
    dismiss,
    update
  };
}
function useToast() {
  let [state, setState] = React2.useState(memoryState);
  return React2.useEffect(() => (listeners.push(setState), () => {
    let index = listeners.indexOf(setState);
    index > -1 && listeners.splice(index, 1);
  }), [state]), {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

// app/components/ui/toaster.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Toaster() {
  let { toasts } = useToast();
  return /* @__PURE__ */ jsxDEV4(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxDEV4(Toast, { ...props, children: [
        /* @__PURE__ */ jsxDEV4("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsxDEV4(ToastTitle, { children: title }, void 0, !1, {
            fileName: "app/components/ui/toaster.tsx",
            lineNumber: 20,
            columnNumber: 25
          }, this),
          description && /* @__PURE__ */ jsxDEV4(ToastDescription, { children: description }, void 0, !1, {
            fileName: "app/components/ui/toaster.tsx",
            lineNumber: 22,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/ui/toaster.tsx",
          lineNumber: 19,
          columnNumber: 13
        }, this),
        action,
        /* @__PURE__ */ jsxDEV4(ToastClose, {}, void 0, !1, {
          fileName: "app/components/ui/toaster.tsx",
          lineNumber: 26,
          columnNumber: 13
        }, this)
      ] }, id, !0, {
        fileName: "app/components/ui/toaster.tsx",
        lineNumber: 18,
        columnNumber: 11
      }, this);
    }),
    /* @__PURE__ */ jsxDEV4(ToastViewport, {}, void 0, !1, {
      fileName: "app/components/ui/toaster.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/ui/toaster.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/components/global-modals/modal-root.tsx
import { useLocation, useSearchParams as useSearchParams2 } from "@remix-run/react";

// app/components/global-modals/create-project.tsx
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// app/components/ui/dialog.tsx
import * as React3 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon as Cross2Icon2 } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var Dialog = DialogPrimitive.Root, DialogTrigger = DialogPrimitive.Trigger, DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV5(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 19,
    columnNumber: 3
  },
  this
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React3.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV5(DialogPortal, { children: [
  /* @__PURE__ */ jsxDEV5(DialogOverlay, {}, void 0, !1, {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV5(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxDEV5(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV5(Cross2Icon2, { className: "h-4 w-4" }, void 0, !1, {
            fileName: "app/components/ui/dialog.tsx",
            lineNumber: 46,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV5("span", { className: "sr-only", children: "Close" }, void 0, !1, {
            fileName: "app/components/ui/dialog.tsx",
            lineNumber: 47,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/ui/dialog.tsx",
          lineNumber: 45,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/ui/dialog.tsx",
      lineNumber: 36,
      columnNumber: 5
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/ui/dialog.tsx",
  lineNumber: 34,
  columnNumber: 3
}, this));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV5(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 58,
    columnNumber: 3
  },
  this
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV5(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 72,
    columnNumber: 3
  },
  this
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV5(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 86,
    columnNumber: 3
  },
  this
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV5(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 101,
    columnNumber: 3
  },
  this
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// app/components/ui/button.tsx
import * as React4 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground disabled:opacity-30",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React4.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV6(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 47,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/lib/axios.ts
import axios from "axios";
var BASE_URL = "http://localhost:8080", axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: !0,
  headers: {
    "Content-Type": "application/json"
  }
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async function(error) {
    let response = error?.response;
    if (!response)
      return Promise.reject(error);
    let status = response?.status, message = response?.data?.message;
    if (typeof window < "u") {
      if (status === 401 && message === "Invalid refresh token")
        return window.location.pathname !== "/login" && window.location.replace("/login"), Promise.reject(error);
      if (status === 403 && message === "Email is not verified")
        return window.location.pathname !== "/dashboard/email-verification" && window.location.replace("/dashboard/email-verification"), Promise.reject(error);
    }
    let originalRequest = error.config;
    return response.status === 401 && !originalRequest?._retry ? (originalRequest._retry = !0, await fetchers.refreshToken(), axiosInstance(originalRequest)) : Promise.reject(error);
  }
);

// app/lib/fetchers/index.ts
var getProjects = async () => {
  let { data } = await axiosInstance.get("/projects");
  return data;
}, getProject = async (projectId) => {
  let { data } = await axiosInstance.get(`/projects/${projectId}`);
  return data;
}, updateProject = async (projectId, payload) => {
  let { data } = await axiosInstance.patch(`/projects/${projectId}`, payload);
  return data;
}, deleteProject = async (projectId) => {
  let { data } = await axiosInstance.delete(`/projects/${projectId}`);
  return data;
}, createProject = async (payload) => {
  let { data } = await axiosInstance.post("/projects", payload);
  return data;
}, getUserInvites = async () => {
  let { data } = await axiosInstance.get("/projects/current-user-invites");
  return data;
}, acceptInvite = async ({ projectId }) => {
  let { data } = await axiosInstance.post(
    `/projects/${projectId}/accept-invite`
  );
  return data;
}, rejectInvite = async ({ projectId }) => {
  let { data } = await axiosInstance.post(
    `/projects/${projectId}/reject-invite`
  );
  return data;
}, me = async (cookie) => {
  let { data } = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: cookie
    }
  });
  return data;
}, updateUser = async (payload) => {
  let { data } = await axiosInstance.patch("/users/me", payload);
  return data;
}, signup = async (payload) => {
  let { data } = await axiosInstance.post("/auth/local/signup", payload);
  return data;
}, signin = async (payload) => {
  let { data } = await axiosInstance.post("/auth/local/signin", payload);
  return data;
}, verifyEmail = async (payload) => {
  let { data } = await axiosInstance.post(
    "/auth/local/verify-email",
    payload
  );
  return data;
}, resendVerificationEmail = async () => {
  let { data } = await axiosInstance.post(
    "/auth/local/send-verification-email"
  );
  return data;
}, logout = async () => {
  let { data } = await axiosInstance.post("/auth/logout");
  return data;
}, refreshToken = async () => {
  let { data } = await axiosInstance.post("/auth/refresh");
  return data;
}, googleLogin = async (payload) => {
  let { data } = await axiosInstance.post("/auth/google/login", payload);
  return data;
}, getFeedbacks = async (params) => {
  let { data } = await axiosInstance.get("/feedbacks", {
    params
  });
  return data;
}, updateFeedbackStatus = async (payload) => {
  let { data } = await axiosInstance.patch(
    `/feedbacks/${payload.id}/status`,
    payload
  );
  return data;
}, getProjectMembers = async (projectId) => {
  let { data } = await axiosInstance.get(`/projects/${projectId}/members`);
  return data;
}, inviteMember = async (projectId, payload) => {
  let { data } = await axiosInstance.post(
    `/projects/${projectId}/invite`,
    payload
  );
  return data;
}, deleteMember = async (projectId, memberId) => {
  let { data } = await axiosInstance.delete(
    `/projects/${projectId}/member/${memberId}`
  );
  return data;
}, cancelInvite = async (projectId, inviteId) => {
  let { data } = await axiosInstance.delete(
    `/projects/${projectId}/invite/${inviteId}`
  );
  return data;
}, getProjectTeam = async (projectId) => {
  let { data } = await axiosInstance.get(`/projects/${projectId}/team`);
  return data;
}, fetchers = {
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  createProject,
  getUserInvites,
  acceptInvite,
  rejectInvite,
  me,
  updateUser,
  signup,
  signin,
  verifyEmail,
  resendVerificationEmail,
  logout,
  refreshToken,
  googleLogin,
  getFeedbacks,
  updateFeedbackStatus,
  getProjectMembers,
  inviteMember,
  deleteMember,
  cancelInvite,
  getProjectTeam
};

// app/components/ui/form.tsx
import * as React6 from "react";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";

// app/components/ui/label.tsx
import * as React5 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var labelVariants = cva3(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), Label = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV7(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/label.tsx",
    lineNumber: 16,
    columnNumber: 3
  },
  this
));
Label.displayName = LabelPrimitive.Root.displayName;

// app/components/ui/form.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var Form = FormProvider, FormFieldContext = React6.createContext(
  {}
), FormField = ({
  ...props
}) => /* @__PURE__ */ jsxDEV8(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxDEV8(Controller, { ...props }, void 0, !1, {
  fileName: "app/components/ui/form.tsx",
  lineNumber: 37,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/ui/form.tsx",
  lineNumber: 36,
  columnNumber: 5
}, this), useFormField = () => {
  let fieldContext = React6.useContext(FormFieldContext), itemContext = React6.useContext(FormItemContext), { getFieldState, formState } = useFormContext(), fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");
  let { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
}, FormItemContext = React6.createContext(
  {}
), FormItem = React6.forwardRef(({ className, ...props }, ref) => {
  let id = React6.useId();
  return /* @__PURE__ */ jsxDEV8(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxDEV8("div", { ref, className: cn("space-y-2", className), ...props }, void 0, !1, {
    fileName: "app/components/ui/form.tsx",
    lineNumber: 81,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/ui/form.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
});
FormItem.displayName = "FormItem";
var FormLabel = React6.forwardRef(({ className, ...props }, ref) => {
  let { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxDEV8(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/form.tsx",
      lineNumber: 94,
      columnNumber: 5
    },
    this
  );
});
FormLabel.displayName = "FormLabel";
var FormControl = React6.forwardRef(({ ...props }, ref) => {
  let { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsxDEV8(
    Slot2,
    {
      ref,
      id: formItemId,
      "aria-describedby": error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`,
      "aria-invalid": !!error,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/form.tsx",
      lineNumber: 111,
      columnNumber: 5
    },
    this
  );
});
FormControl.displayName = "FormControl";
var FormDescription = React6.forwardRef(({ className, ...props }, ref) => {
  let { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsxDEV8(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/form.tsx",
      lineNumber: 133,
      columnNumber: 5
    },
    this
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React6.forwardRef(({ className, children, ...props }, ref) => {
  let { error, formMessageId } = useFormField(), body = error ? String(error?.message) : children;
  return body ? /* @__PURE__ */ jsxDEV8(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/form.tsx",
      lineNumber: 155,
      columnNumber: 5
    },
    this
  ) : null;
});
FormMessage.displayName = "FormMessage";

// app/components/ui/input.tsx
import * as React7 from "react";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Input = React7.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsxDEV9(
    "input",
    {
      type,
      className: cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/input.tsx",
      lineNumber: 11,
      columnNumber: 7
    },
    this
  )
);
Input.displayName = "Input";

// app/components/ui/separator.tsx
import * as React8 from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var Separator = React8.forwardRef(
  ({ className, orientation = "horizontal", decorative = !0, ...props }, ref) => /* @__PURE__ */ jsxDEV10(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/separator.tsx",
      lineNumber: 14,
      columnNumber: 5
    },
    this
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// app/components/loading-indicator.tsx
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
function LoadingIndicator({ className }) {
  return /* @__PURE__ */ jsxDEV11(
    "div",
    {
      className: cn(
        "box-border inline-block h-4 w-4 animate-spin rounded-full border-2 border-inherit !border-b-transparent repeat-infinite",
        className
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/loading-indicator.tsx",
      lineNumber: 5,
      columnNumber: 5
    },
    this
  );
}

// app/components/global-modals/create-project.tsx
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
function CreateProject() {
  let navigate = useNavigate(), [_, setSearchParams] = useSearchParams(), queryClient = useQueryClient(), form = useForm({
    defaultValues: {
      name: ""
    }
  }), close = () => {
    setSearchParams((prev) => (prev.delete("modal"), prev));
  }, { mutate, isPending } = useMutation({
    mutationFn: fetchers.createProject,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] }), close(), navigate(`/dashboard/${data.id}`);
    }
  }), onSubmit = (values) => {
    mutate(values);
  };
  return /* @__PURE__ */ jsxDEV12(
    Dialog,
    {
      modal: !0,
      open: !0,
      onOpenChange: (open) => {
        open || close();
      },
      children: /* @__PURE__ */ jsxDEV12(DialogContent, { children: [
        /* @__PURE__ */ jsxDEV12(DialogHeader, { children: [
          /* @__PURE__ */ jsxDEV12(DialogTitle, { children: "Create project" }, void 0, !1, {
            fileName: "app/components/global-modals/create-project.tsx",
            lineNumber: 75,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV12(DialogDescription, { children: "Add a new project to collect and manage feedback." }, void 0, !1, {
            fileName: "app/components/global-modals/create-project.tsx",
            lineNumber: 76,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/global-modals/create-project.tsx",
          lineNumber: 74,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV12(Separator, {}, void 0, !1, {
          fileName: "app/components/global-modals/create-project.tsx",
          lineNumber: 80,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV12(Form, { ...form, children: /* @__PURE__ */ jsxDEV12("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV12(
            FormField,
            {
              control: form.control,
              name: "name",
              render: ({ field }) => /* @__PURE__ */ jsxDEV12(FormItem, { children: [
                /* @__PURE__ */ jsxDEV12(FormLabel, { children: "Project name" }, void 0, !1, {
                  fileName: "app/components/global-modals/create-project.tsx",
                  lineNumber: 88,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV12(FormControl, { children: /* @__PURE__ */ jsxDEV12(
                  Input,
                  {
                    placeholder: "Acme Inc.",
                    required: !0,
                    minLength: 3,
                    autoComplete: "off",
                    ...field
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/global-modals/create-project.tsx",
                    lineNumber: 90,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/components/global-modals/create-project.tsx",
                  lineNumber: 89,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV12(FormMessage, {}, void 0, !1, {
                  fileName: "app/components/global-modals/create-project.tsx",
                  lineNumber: 98,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/global-modals/create-project.tsx",
                lineNumber: 87,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/global-modals/create-project.tsx",
              lineNumber: 83,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV12(DialogFooter, { children: [
            /* @__PURE__ */ jsxDEV12(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  close();
                },
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "app/components/global-modals/create-project.tsx",
                lineNumber: 104,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV12(Button, { type: "submit", disabled: isPending, children: [
              isPending && /* @__PURE__ */ jsxDEV12(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
                fileName: "app/components/global-modals/create-project.tsx",
                lineNumber: 113,
                columnNumber: 31
              }, this),
              "Save"
            ] }, void 0, !0, {
              fileName: "app/components/global-modals/create-project.tsx",
              lineNumber: 112,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/global-modals/create-project.tsx",
            lineNumber: 103,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/global-modals/create-project.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/components/global-modals/create-project.tsx",
          lineNumber: 81,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/global-modals/create-project.tsx",
        lineNumber: 73,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/global-modals/create-project.tsx",
      lineNumber: 64,
      columnNumber: 5
    },
    this
  );
}

// app/components/global-modals/modal-root.tsx
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
function ModalRoot() {
  let location = useLocation(), [searchParams] = useSearchParams2();
  if (!location.pathname.startsWith("/dashboard"))
    return null;
  switch (searchParams.get("modal")) {
    case "create-project":
      return /* @__PURE__ */ jsxDEV13(CreateProject, {}, void 0, !1, {
        fileName: "app/components/global-modals/modal-root.tsx",
        lineNumber: 12,
        columnNumber: 14
      }, this);
    default:
      return null;
  }
}

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-X5ZHEJVS.css";

// app/root.tsx
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css"
  },
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
async function loader() {
  return json({
    ENV: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "108576727290-r2vpjvnub36682vn3vig0rq1jvj9to2n.apps.googleusercontent.com"
    }
  });
}
function App() {
  let data = useLoaderData(), { toast: toast2 } = useToast(), [queryClient] = useState2(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 1e3
        }
      },
      queryCache: new QueryCache({
        onError: () => toast2({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: /* @__PURE__ */ jsxDEV14(
            ToastAction,
            {
              altText: "Try again",
              onClick: () => window.location.reload(),
              children: "Try again"
            },
            void 0,
            !1,
            {
              fileName: "app/root.tsx",
              lineNumber: 67,
              columnNumber: 11
            },
            this
          )
        })
      }),
      mutationCache: new MutationCache({
        onError: (error, variables, context, mutation) => {
          mutation.options?.meta?.errorToast !== !1 && toast2({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your mutation."
          });
        }
      })
    })
  );
  return /* @__PURE__ */ jsxDEV14("html", { lang: "en", suppressHydrationWarning: !0, children: [
    /* @__PURE__ */ jsxDEV14("head", { children: [
      /* @__PURE__ */ jsxDEV14("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14("body", { className: "antialiased", children: [
      /* @__PURE__ */ jsxDEV14(
        ThemeProvider,
        {
          attribute: "class",
          defaultTheme: "system",
          enableSystem: !0,
          disableTransitionOnChange: !0,
          children: /* @__PURE__ */ jsxDEV14(QueryClientProvider, { client: queryClient, children: [
            /* @__PURE__ */ jsxDEV14(GoogleOAuthProvider, { clientId: data.ENV.GOOGLE_CLIENT_ID, children: /* @__PURE__ */ jsxDEV14("main", { className: "relative min-h-screen", children: [
              /* @__PURE__ */ jsxDEV14(Outlet, {}, void 0, !1, {
                fileName: "app/root.tsx",
                lineNumber: 106,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV14(ModalRoot, {}, void 0, !1, {
                fileName: "app/root.tsx",
                lineNumber: 107,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/root.tsx",
              lineNumber: 105,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 104,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV14(ReactQueryDevtools, { initialIsOpen: !1 }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 110,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/root.tsx",
            lineNumber: 103,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 97,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV14(Toaster, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 113,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 115,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 96,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/route.tsx
var route_exports = {};
__export(route_exports, {
  default: () => Dashboard
});
import { useSearchParams as useSearchParams3 } from "@remix-run/react";

// app/components/user-invite-list.tsx
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

// app/components/user-invite-card.tsx
import { useMutation as useMutation2, useQueryClient as useQueryClient2 } from "@tanstack/react-query";
import { motion } from "framer-motion";

// app/components/ui/popover.tsx
import * as React9 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var Popover = PopoverPrimitive.Root, PopoverTrigger = PopoverPrimitive.Trigger, PopoverContent = React9.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV15(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV15(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/popover.tsx",
    lineNumber: 15,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/popover.tsx",
  lineNumber: 14,
  columnNumber: 3
}, this));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// app/components/user-invite-card.tsx
import { Close as Close3 } from "@radix-ui/react-popover";
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function UserInviteCard({ projectName, projectId }) {
  let queryClient = useQueryClient2(), { mutate: acceptInvite2 } = useMutation2({
    mutationFn: fetchers.acceptInvite,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({ queryKey: ["user-invites"] })
      ]);
    }
  }), { mutate: rejectInvite2 } = useMutation2({
    mutationFn: fetchers.rejectInvite,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user-invites"] });
    }
  }), handleAcceptInvite = () => {
    acceptInvite2({ projectId });
  }, handleRejectInvite = () => {
    rejectInvite2({ projectId });
  };
  return /* @__PURE__ */ jsxDEV16("div", { className: "bg-amber-foreground border-b p-2", children: /* @__PURE__ */ jsxDEV16(
    motion.div,
    {
      className: "container",
      exit: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
      children: /* @__PURE__ */ jsxDEV16("div", { className: "flex flex-wrap items-center justify-between gap-y-2", children: [
        /* @__PURE__ */ jsxDEV16("p", { children: [
          "You have been invited to the project",
          " ",
          /* @__PURE__ */ jsxDEV16("span", { className: "font-semibold", children: projectName }, void 0, !1, {
            fileName: "app/components/user-invite-card.tsx",
            lineNumber: 45,
            columnNumber: 13
          }, this),
          "."
        ] }, void 0, !0, {
          fileName: "app/components/user-invite-card.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV16("div", { className: "space-x-2", children: [
          /* @__PURE__ */ jsxDEV16(Button, { variant: "default", onClick: handleAcceptInvite, size: "sm", children: "Accept" }, void 0, !1, {
            fileName: "app/components/user-invite-card.tsx",
            lineNumber: 48,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV16(Popover, { children: [
            /* @__PURE__ */ jsxDEV16(PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV16(Button, { variant: "destructive", size: "sm", children: "Reject" }, void 0, !1, {
              fileName: "app/components/user-invite-card.tsx",
              lineNumber: 53,
              columnNumber: 17
            }, this) }, void 0, !1, {
              fileName: "app/components/user-invite-card.tsx",
              lineNumber: 52,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV16(PopoverContent, { side: "bottom", align: "center", className: "p-3", children: [
              /* @__PURE__ */ jsxDEV16("p", { className: "font-medium text-primary", children: "Are you sure you want to reject this invite?" }, void 0, !1, {
                fileName: "app/components/user-invite-card.tsx",
                lineNumber: 58,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV16("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxDEV16(
                  Button,
                  {
                    variant: "default",
                    onClick: handleRejectInvite,
                    size: "sm",
                    className: "h-7",
                    children: "Yes"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/user-invite-card.tsx",
                    lineNumber: 62,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV16(Close3, { asChild: !0, children: /* @__PURE__ */ jsxDEV16(Button, { variant: "outline", size: "sm", className: "h-7", children: "No" }, void 0, !1, {
                  fileName: "app/components/user-invite-card.tsx",
                  lineNumber: 71,
                  columnNumber: 21
                }, this) }, void 0, !1, {
                  fileName: "app/components/user-invite-card.tsx",
                  lineNumber: 70,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/user-invite-card.tsx",
                lineNumber: 61,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/user-invite-card.tsx",
              lineNumber: 57,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/user-invite-card.tsx",
            lineNumber: 51,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/user-invite-card.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/user-invite-card.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/user-invite-card.tsx",
      lineNumber: 38,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/user-invite-card.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}

// app/components/user-invite-list.tsx
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var UserInviteList = ({ className }) => {
  let { data: invites } = useQuery({
    queryKey: ["user-invites"],
    queryFn: () => fetchers.getUserInvites()
  });
  return /* @__PURE__ */ jsxDEV17("div", { className: cn(className, "flex flex-col"), children: /* @__PURE__ */ jsxDEV17(AnimatePresence, { initial: !1, children: invites?.map((invite) => /* @__PURE__ */ jsxDEV17(UserInviteCard, { ...invite }, invite.id, !1, {
    fileName: "app/components/user-invite-list.tsx",
    lineNumber: 23,
    columnNumber: 18
  }, this)) }, void 0, !1, {
    fileName: "app/components/user-invite-list.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/user-invite-list.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
};

// app/components/project-list.tsx
import { useQuery as useQuery2 } from "@tanstack/react-query";

// app/components/project-card.tsx
import { Link } from "@remix-run/react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as dateFns2 from "date-fns";

// app/components/ui/card.tsx
import * as React10 from "react";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var Card = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 9,
    columnNumber: 3
  },
  this
));
Card.displayName = "Card";
var CardHeader = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 24,
    columnNumber: 3
  },
  this
));
CardHeader.displayName = "CardHeader";
var CardTitle = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 36,
    columnNumber: 3
  },
  this
));
CardTitle.displayName = "CardTitle";
var CardDescription = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 48,
    columnNumber: 3
  },
  this
));
CardDescription.displayName = "CardDescription";
var CardContent = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, !1, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 60,
  columnNumber: 3
}, this));
CardContent.displayName = "CardContent";
var CardFooter = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 68,
    columnNumber: 3
  },
  this
));
CardFooter.displayName = "CardFooter";

// app/components/project-card.tsx
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
function ProjectCard({ id, name, feedbackCount, createdAt }) {
  let localCreatedAt = dateFns2.format(
    dateFns2.parseISO(createdAt),
    "MMM dd, yyyy"
  );
  return /* @__PURE__ */ jsxDEV19(Link, { to: `/dashboard/${id}`, children: /* @__PURE__ */ jsxDEV19(Card, { className: "group rounded-lg shadow-none", children: [
    /* @__PURE__ */ jsxDEV19(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
      /* @__PURE__ */ jsxDEV19(CardTitle, { className: "text-sm font-medium", children: name }, void 0, !1, {
        fileName: "app/components/project-card.tsx",
        lineNumber: 16,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV19(ChevronRightIcon, { className: "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" }, void 0, !1, {
        fileName: "app/components/project-card.tsx",
        lineNumber: 17,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project-card.tsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV19(CardContent, { children: /* @__PURE__ */ jsxDEV19("div", { className: "mt-2 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxDEV19("div", { children: [
        /* @__PURE__ */ jsxDEV19("div", { className: "font-bold", children: [
          "+",
          feedbackCount
        ] }, void 0, !0, {
          fileName: "app/components/project-card.tsx",
          lineNumber: 22,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV19("p", { className: "text-xs text-muted-foreground", children: "total feedback" }, void 0, !1, {
          fileName: "app/components/project-card.tsx",
          lineNumber: 23,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/project-card.tsx",
        lineNumber: 21,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV19("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxDEV19("div", { className: "text-xs", children: localCreatedAt }, void 0, !1, {
          fileName: "app/components/project-card.tsx",
          lineNumber: 26,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV19("p", { className: "text-xs text-muted-foreground", children: "created at" }, void 0, !1, {
          fileName: "app/components/project-card.tsx",
          lineNumber: 27,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/project-card.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project-card.tsx",
      lineNumber: 20,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/project-card.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project-card.tsx",
    lineNumber: 14,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/project-card.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

// app/components/ui/skeleton.tsx
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV20(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-primary/10", className),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/skeleton.tsx",
      lineNumber: 8,
      columnNumber: 5
    },
    this
  );
}

// app/components/project-card-skeleton.tsx
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
function ProjectCardSkeleton() {
  return /* @__PURE__ */ jsxDEV21("div", { className: "rounded-lg border p-6", children: [
    /* @__PURE__ */ jsxDEV21(Skeleton, { className: "h-5" }, void 0, !1, {
      fileName: "app/components/project-card-skeleton.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV21("div", { className: "mt-4 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxDEV21("div", { className: "w-full space-y-1", children: [
        /* @__PURE__ */ jsxDEV21(Skeleton, { className: "h-4 w-1/4" }, void 0, !1, {
          fileName: "app/components/project-card-skeleton.tsx",
          lineNumber: 9,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV21(Skeleton, { className: "h-4 w-2/4" }, void 0, !1, {
          fileName: "app/components/project-card-skeleton.tsx",
          lineNumber: 10,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/project-card-skeleton.tsx",
        lineNumber: 8,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV21("div", { className: "flex w-full flex-col items-end gap-1", children: [
        /* @__PURE__ */ jsxDEV21(Skeleton, { className: "h-4 w-2/4" }, void 0, !1, {
          fileName: "app/components/project-card-skeleton.tsx",
          lineNumber: 13,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV21(Skeleton, { className: "h-4 w-1/4" }, void 0, !1, {
          fileName: "app/components/project-card-skeleton.tsx",
          lineNumber: 14,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/project-card-skeleton.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/project-card-skeleton.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project-card-skeleton.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/project-empty-view.tsx
import { CubeIcon } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
function ProjectEmptyView() {
  return /* @__PURE__ */ jsxDEV22("div", { className: "flex w-full flex-col items-center justify-center border border-dashed bg-accent/70 px-4 py-16 text-center dark:bg-accent/10", children: [
    /* @__PURE__ */ jsxDEV22(CubeIcon, { className: "h-12 w-12" }, void 0, !1, {
      fileName: "app/components/project-empty-view.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22("h3", { className: "mt-4 text-lg font-medium", children: "You don't have any projects yet." }, void 0, !1, {
      fileName: "app/components/project-empty-view.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { className: "mt-2 text-muted-foreground", children: "Create your first project and start tracking your feedback." }, void 0, !1, {
      fileName: "app/components/project-empty-view.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/project-empty-view.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/project-list.tsx
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
function ProjectList() {
  let {
    data: projects,
    isPending,
    isError
  } = useQuery2({
    queryKey: ["projects"],
    queryFn: () => fetchers.getProjects()
  });
  return isError ? /* @__PURE__ */ jsxDEV23("p", { children: "An error occurred while fetching your projects." }, void 0, !1, {
    fileName: "app/components/project-list.tsx",
    lineNumber: 18,
    columnNumber: 23
  }, this) : isPending ? /* @__PURE__ */ jsxDEV23("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxDEV23(ProjectCardSkeleton, {}, index, !1, {
    fileName: "app/components/project-list.tsx",
    lineNumber: 24,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/components/project-list.tsx",
    lineNumber: 22,
    columnNumber: 7
  }, this) : projects.length === 0 ? /* @__PURE__ */ jsxDEV23(ProjectEmptyView, {}, void 0, !1, {
    fileName: "app/components/project-list.tsx",
    lineNumber: 30,
    columnNumber: 37
  }, this) : /* @__PURE__ */ jsxDEV23("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: projects.map((project) => /* @__PURE__ */ jsxDEV23(ProjectCard, { ...project }, project.id, !1, {
    fileName: "app/components/project-list.tsx",
    lineNumber: 35,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/components/project-list.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/route.tsx
import { Fragment, jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
function Dashboard() {
  let [_, setSearchParams] = useSearchParams3();
  return /* @__PURE__ */ jsxDEV24(Fragment, { children: [
    /* @__PURE__ */ jsxDEV24("div", { className: "container flex flex-wrap items-center justify-between gap-4 py-8 ", children: [
      /* @__PURE__ */ jsxDEV24("div", { children: [
        /* @__PURE__ */ jsxDEV24("h2", { className: "text-3xl tracking-wide", children: "Projects" }, void 0, !1, {
          fileName: "app/routes/dashboard/route.tsx",
          lineNumber: 14,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV24("p", { className: "mt-1 text-muted-foreground", children: "List of projects you have access to." }, void 0, !1, {
          fileName: "app/routes/dashboard/route.tsx",
          lineNumber: 15,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/route.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV24(
        Button,
        {
          onClick: () => {
            setSearchParams(
              (prev) => (prev.set("modal", "create-project"), prev),
              { replace: !0 }
            );
          },
          children: "Create Project"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/dashboard/route.tsx",
          lineNumber: 19,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard/route.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24(Separator, {}, void 0, !1, {
      fileName: "app/routes/dashboard/route.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24(UserInviteList, {}, void 0, !1, {
      fileName: "app/routes/dashboard/route.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24("div", { className: "h-full bg-accent/50 py-4 dark:bg-background md:py-8", children: /* @__PURE__ */ jsxDEV24("div", { className: "container", children: /* @__PURE__ */ jsxDEV24(ProjectList, {}, void 0, !1, {
      fileName: "app/routes/dashboard/route.tsx",
      lineNumber: 37,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/route.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/route.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/route.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}

// app/routes/landing/route.tsx
var route_exports2 = {};
__export(route_exports2, {
  default: () => Index,
  meta: () => meta
});
import { Link as Link2 } from "@remix-run/react";

// app/components/headers/theme-switcher.tsx
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

// app/components/ui/select.tsx
import * as React11 from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value, SelectTrigger = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDEV25(SelectPrimitive.Icon, { asChild: !0, children: /* @__PURE__ */ jsxDEV25(CaretSortIcon, { className: "h-4 w-4 opacity-50" }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 32,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 31,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 22,
    columnNumber: 3
  },
  this
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDEV25(ChevronUpIcon, {}, void 0, !1, {
      fileName: "app/components/ui/select.tsx",
      lineNumber: 50,
      columnNumber: 5
    }, this)
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 42,
    columnNumber: 3
  },
  this
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDEV25(ChevronDownIcon, {}, void 0, !1, {
      fileName: "app/components/ui/select.tsx",
      lineNumber: 67,
      columnNumber: 5
    }, this)
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 59,
    columnNumber: 3
  },
  this
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React11.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxDEV25(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV25(SelectScrollUpButton, {}, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 89,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV25(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        },
        void 0,
        !1,
        {
          fileName: "app/components/ui/select.tsx",
          lineNumber: 90,
          columnNumber: 7
        },
        this
      ),
      /* @__PURE__ */ jsxDEV25(SelectScrollDownButton, {}, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 99,
        columnNumber: 7
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 78,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/select.tsx",
  lineNumber: 77,
  columnNumber: 3
}, this));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 109,
    columnNumber: 3
  },
  this
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV25("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV25(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV25(CheckIcon, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 129,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV25(SelectPrimitive.ItemText, { children }, void 0, !1, {
        fileName: "app/components/ui/select.tsx",
        lineNumber: 134,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 121,
    columnNumber: 3
  },
  this
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/select.tsx",
    lineNumber: 143,
    columnNumber: 3
  },
  this
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// app/components/headers/theme-switcher.tsx
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
function ThemeSwitcher() {
  let { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsxDEV26(Select, { defaultValue: "system", value: theme, onValueChange: setTheme, children: [
    /* @__PURE__ */ jsxDEV26(SelectTrigger, { className: "h-6 w-[90px] px-1.5", children: /* @__PURE__ */ jsxDEV26(SelectValue, { role: "menuitem", asChild: !0, children: {
      system: /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV26(DesktopIcon, { className: "w-3 h-3" }, void 0, !1, {
          fileName: "app/components/headers/theme-switcher.tsx",
          lineNumber: 22,
          columnNumber: 19
        }, this),
        "System"
      ] }, void 0, !0, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 21,
        columnNumber: 17
      }, this),
      dark: /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV26(MoonIcon, {}, void 0, !1, {
          fileName: "app/components/headers/theme-switcher.tsx",
          lineNumber: 28,
          columnNumber: 19
        }, this),
        "Dark"
      ] }, void 0, !0, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 27,
        columnNumber: 17
      }, this),
      light: /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV26(SunIcon, {}, void 0, !1, {
          fileName: "app/components/headers/theme-switcher.tsx",
          lineNumber: 34,
          columnNumber: 19
        }, this),
        "Light"
      ] }, void 0, !0, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 33,
        columnNumber: 17
      }, this)
    }[theme ?? "system"] }, void 0, !1, {
      fileName: "app/components/headers/theme-switcher.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/headers/theme-switcher.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV26(SelectContent, { align: "end", children: [
      /* @__PURE__ */ jsxDEV26(SelectItem, { value: "system", children: /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV26(DesktopIcon, {}, void 0, !1, {
          fileName: "app/components/headers/theme-switcher.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this),
        "System"
      ] }, void 0, !0, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26(SelectItem, { value: "dark", children: /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV26(MoonIcon, {}, void 0, !1, {
          fileName: "app/components/headers/theme-switcher.tsx",
          lineNumber: 51,
          columnNumber: 13
        }, this),
        "Dark"
      ] }, void 0, !0, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26(SelectItem, { value: "light", children: /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center gap-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV26(SunIcon, {}, void 0, !1, {
          fileName: "app/components/headers/theme-switcher.tsx",
          lineNumber: 57,
          columnNumber: 13
        }, this),
        "Light"
      ] }, void 0, !0, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 56,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/theme-switcher.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/headers/theme-switcher.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/headers/theme-switcher.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/routes/landing/route.tsx
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  return /* @__PURE__ */ jsxDEV27("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDEV27("h1", { className: "text-4xl font-bold", children: "Welcome to Needback!" }, void 0, !1, {
      fileName: "app/routes/landing/route.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27("br", {}, void 0, !1, {
      fileName: "app/routes/landing/route.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV27("p", { children: "This is a theme switcher" }, void 0, !1, {
        fileName: "app/routes/landing/route.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV27(ThemeSwitcher, {}, void 0, !1, {
        fileName: "app/routes/landing/route.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/landing/route.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27("br", {}, void 0, !1, {
      fileName: "app/routes/landing/route.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxDEV27(Link2, { className: "text-blue-600", to: "/dashboard", children: [
        "->",
        " Dashboard"
      ] }, void 0, !0, {
        fileName: "app/routes/landing/route.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV27(Link2, { className: "text-blue-600", to: "/docs", children: [
        "->",
        " Docs"
      ] }, void 0, !0, {
        fileName: "app/routes/landing/route.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/landing/route.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/landing/route.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/routes/docs/route.tsx
var route_exports3 = {};
__export(route_exports3, {
  default: () => Docs
});
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV28 } from "react/jsx-dev-runtime";
function Docs() {
  return /* @__PURE__ */ jsxDEV28("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDEV28("h1", { className: "text-4xl font-bold", children: "Welcome to Documents!" }, void 0, !1, {
      fileName: "app/routes/docs/route.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV28("br", {}, void 0, !1, {
      fileName: "app/routes/docs/route.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV28("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxDEV28(Link3, { className: "text-blue-600", to: "/", children: [
        "->",
        " Home"
      ] }, void 0, !0, {
        fileName: "app/routes/docs/route.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV28(Link3, { className: "text-blue-600", to: "/dashboard", children: [
        "->",
        " Dashboard"
      ] }, void 0, !0, {
        fileName: "app/routes/docs/route.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/docs/route.tsx",
      lineNumber: 8,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/docs/route.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/auth/layout.tsx
var layout_exports = {};
__export(layout_exports, {
  default: () => Layout,
  loader: () => loader2
});
import { redirect } from "@remix-run/cloudflare";
import { Outlet as Outlet2 } from "@remix-run/react";

// app/components/headers/auth-header.tsx
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link as Link4, useLocation as useLocation2 } from "@remix-run/react";
import { useEffect as useEffect2, useState as useState3 } from "react";
import { jsxDEV as jsxDEV29 } from "react/jsx-dev-runtime";
function AuthHeader() {
  let location = useLocation2(), [isLoginPage, setIsLoginPage] = useState3(
    location.pathname.startsWith("/login")
  );
  return useEffect2(() => {
    setIsLoginPage(location.pathname.startsWith("/login"));
  }, [location.pathname]), /* @__PURE__ */ jsxDEV29("div", { className: "flex h-16 items-center border-b bg-background px-4 md:px-6", children: [
    /* @__PURE__ */ jsxDEV29("div", { className: "flex flex-1 items-center gap-4", children: /* @__PURE__ */ jsxDEV29("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV29(Link4, { to: "/", children: /* @__PURE__ */ jsxDEV29("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV29(ChatBubbleIcon, { className: "h-5 w-5" }, void 0, !1, {
        fileName: "app/components/headers/auth-header.tsx",
        lineNumber: 23,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV29("span", { className: "text-lg font-bold tracking-tight", children: "DropFeedback" }, void 0, !1, {
        fileName: "app/components/headers/auth-header.tsx",
        lineNumber: 24,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/headers/auth-header.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/headers/auth-header.tsx",
      lineNumber: 21,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/headers/auth-header.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/headers/auth-header.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV29("div", { className: "flex items-center justify-end gap-3", children: [
      /* @__PURE__ */ jsxDEV29("button", { className: "font-normal text-muted-foreground transition-colors hover:text-primary", children: "Feedback" }, void 0, !1, {
        fileName: "app/components/headers/auth-header.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV29(Button, { asChild: !0, variant: "outline", children: isLoginPage ? /* @__PURE__ */ jsxDEV29(Link4, { to: "/signup", children: "Sign Up" }, void 0, !1, {
        fileName: "app/components/headers/auth-header.tsx",
        lineNumber: 37,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV29(Link4, { to: "/login", children: "Log In" }, void 0, !1, {
        fileName: "app/components/headers/auth-header.tsx",
        lineNumber: 39,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/auth-header.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/headers/auth-header.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/headers/auth-header.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/auth/layout.tsx
import { Fragment as Fragment2, jsxDEV as jsxDEV30 } from "react/jsx-dev-runtime";
async function loader2({ request }) {
  let cookie = request.headers.get("Cookie");
  try {
    return await fetchers.me(cookie ?? ""), redirect("/dashboard");
  } catch {
    return null;
  }
}
function Layout() {
  return /* @__PURE__ */ jsxDEV30(Fragment2, { children: [
    /* @__PURE__ */ jsxDEV30(AuthHeader, {}, void 0, !1, {
      fileName: "app/routes/auth/layout.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV30("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxDEV30("div", { className: "container mx-4 w-full rounded-lg border p-4 sm:w-fit sm:p-16  ", children: /* @__PURE__ */ jsxDEV30(Outlet2, {}, void 0, !1, {
      fileName: "app/routes/auth/layout.tsx",
      lineNumber: 24,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/auth/layout.tsx",
      lineNumber: 23,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/auth/layout.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth/layout.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/routes/auth/login/route.tsx
var route_exports4 = {};
__export(route_exports4, {
  default: () => Login
});
import { Link as Link5, useLocation as useLocation3 } from "@remix-run/react";

// app/components/google-oauth-button.tsx
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate as useNavigate2, useSearchParams as useSearchParams4 } from "@remix-run/react";
import { useMutation as useMutation3 } from "@tanstack/react-query";
import { motion as motion2 } from "framer-motion";

// app/components/ui/alert.tsx
import * as React12 from "react";
import { cva as cva4 } from "class-variance-authority";
import { jsxDEV as jsxDEV31 } from "react/jsx-dev-runtime";
var alertVariants = cva4(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Alert = React12.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxDEV31(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert.tsx",
    lineNumber: 26,
    columnNumber: 3
  },
  this
));
Alert.displayName = "Alert";
var AlertTitle = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV31(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert.tsx",
    lineNumber: 39,
    columnNumber: 3
  },
  this
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV31(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert.tsx",
    lineNumber: 51,
    columnNumber: 3
  },
  this
));
AlertDescription.displayName = "AlertDescription";

// app/components/google-oauth-button.tsx
import { jsxDEV as jsxDEV32 } from "react/jsx-dev-runtime";
function GoogleOAuthButton() {
  let [searchParams] = useSearchParams4(), navigate = useNavigate2(), loginMutation = useMutation3({
    mutationFn: fetchers.googleLogin,
    onSuccess: () => {
      let nextURL = searchParams.get("next");
      navigate(nextURL ?? "/dashboard");
    },
    meta: {
      errorToast: !1
    }
  });
  return /* @__PURE__ */ jsxDEV32("div", { className: "space-y-6", children: [
    loginMutation.isError && /* @__PURE__ */ jsxDEV32(
      motion2.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsxDEV32(
          Alert,
          {
            variant: "destructive",
            className: "border-red text-red bg-red-foreground",
            children: /* @__PURE__ */ jsxDEV32(AlertDescription, { children: loginMutation.error?.response?.data?.message ?? loginMutation.error?.message }, void 0, !1, {
              fileName: "app/components/google-oauth-button.tsx",
              lineNumber: 39,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/google-oauth-button.tsx",
            lineNumber: 35,
            columnNumber: 11
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/components/google-oauth-button.tsx",
        lineNumber: 31,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV32("div", { style: { colorScheme: "light" }, children: /* @__PURE__ */ jsxDEV32(
      GoogleLogin,
      {
        text: "continue_with",
        size: "large",
        width: 300,
        useOneTap: !0,
        theme: "filled_blue",
        onSuccess: (credentialResponse) => {
          let credential = credentialResponse.credential;
          credential && loginMutation.mutate({
            idToken: credential
          });
        }
      },
      void 0,
      !1,
      {
        fileName: "app/components/google-oauth-button.tsx",
        lineNumber: 47,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/google-oauth-button.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/google-oauth-button.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}

// app/routes/auth/login/route.tsx
import { jsxDEV as jsxDEV33 } from "react/jsx-dev-runtime";
function Login() {
  let { search } = useLocation3();
  return /* @__PURE__ */ jsxDEV33("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxDEV33("h1", { className: "text-center text-2xl font-semibold tracking-tight sm:text-3xl", children: "Log in to DropFeedback" }, void 0, !1, {
      fileName: "app/routes/auth/login/route.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV33("div", { className: "m-auto max-w-[325px]", children: [
      /* @__PURE__ */ jsxDEV33(GoogleOAuthButton, {}, void 0, !1, {
        fileName: "app/routes/auth/login/route.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV33(Separator, { className: "my-6" }, void 0, !1, {
        fileName: "app/routes/auth/login/route.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV33("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV33(
        Link5,
        {
          to: {
            pathname: "/login/email",
            search
          },
          className: "text-base text-link",
          children: "Continue with Email \u2192"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth/login/route.tsx",
          lineNumber: 17,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/auth/login/route.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth/login/route.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth/login/route.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/auth/login/email/route.tsx
var route_exports5 = {};
__export(route_exports5, {
  default: () => LoginWithEmail
});
import {
  Link as Link6,
  useLocation as useLocation4,
  useNavigate as useNavigate3,
  useSearchParams as useSearchParams5
} from "@remix-run/react";
import { useForm as useForm2 } from "react-hook-form";
import { useMutation as useMutation4 } from "@tanstack/react-query";
import { motion as motion3 } from "framer-motion";
import { jsxDEV as jsxDEV34 } from "react/jsx-dev-runtime";
var useLocalLogin = () => {
  let [searchParams] = useSearchParams5(), navigate = useNavigate3();
  return useMutation4({
    mutationFn: fetchers.signin,
    onSuccess: () => {
      let nextURL = searchParams.get("next");
      navigate(nextURL ?? "/dashboard");
    },
    meta: {
      errorToast: !1
    }
  });
};
function LoginWithEmail() {
  let { search } = useLocation4(), { mutate, isPending, error, isError } = useLocalLogin(), form = useForm2({
    defaultValues: {
      email: "",
      password: ""
    }
  }), onSubmit = (values) => {
    mutate(values);
  };
  return /* @__PURE__ */ jsxDEV34("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxDEV34("h1", { className: "text-center text-2xl font-semibold tracking-tight sm:text-3xl", children: "Log in to DropFeedback" }, void 0, !1, {
      fileName: "app/routes/auth/login/email/route.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV34("div", { className: "m-auto max-w-[325px] space-y-6", children: [
      isError && /* @__PURE__ */ jsxDEV34(
        motion3.div,
        {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          children: /* @__PURE__ */ jsxDEV34(
            Alert,
            {
              variant: "destructive",
              className: "border-red bg-red-foreground text-red",
              children: /* @__PURE__ */ jsxDEV34(AlertDescription, { children: error?.response?.data?.message ?? error?.message }, void 0, !1, {
                fileName: "app/routes/auth/login/email/route.tsx",
                lineNumber: 73,
                columnNumber: 15
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/auth/login/email/route.tsx",
              lineNumber: 69,
              columnNumber: 13
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth/login/email/route.tsx",
          lineNumber: 65,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV34(Form, { ...form, children: /* @__PURE__ */ jsxDEV34("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV34(
          FormField,
          {
            control: form.control,
            name: "email",
            render: ({ field }) => /* @__PURE__ */ jsxDEV34(FormItem, { children: /* @__PURE__ */ jsxDEV34(FormControl, { children: /* @__PURE__ */ jsxDEV34(
              Input,
              {
                ...field,
                placeholder: "Email address",
                className: "h-12",
                required: !0,
                type: "email"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/auth/login/email/route.tsx",
                lineNumber: 88,
                columnNumber: 21
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/auth/login/email/route.tsx",
              lineNumber: 87,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/auth/login/email/route.tsx",
              lineNumber: 86,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/auth/login/email/route.tsx",
            lineNumber: 82,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV34(
          FormField,
          {
            control: form.control,
            name: "password",
            render: ({ field }) => /* @__PURE__ */ jsxDEV34(FormItem, { children: /* @__PURE__ */ jsxDEV34(FormControl, { children: /* @__PURE__ */ jsxDEV34(
              Input,
              {
                ...field,
                placeholder: "Password",
                type: "password",
                required: !0,
                minLength: 4,
                className: "h-12"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/auth/login/email/route.tsx",
                lineNumber: 105,
                columnNumber: 21
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/auth/login/email/route.tsx",
              lineNumber: 104,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/auth/login/email/route.tsx",
              lineNumber: 103,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/auth/login/email/route.tsx",
            lineNumber: 99,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV34(
          Button,
          {
            type: "submit",
            className: "w-full",
            size: "lg",
            disabled: isPending,
            children: [
              isPending && /* @__PURE__ */ jsxDEV34(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
                fileName: "app/routes/auth/login/email/route.tsx",
                lineNumber: 124,
                columnNumber: 29
              }, this),
              "Log In"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/auth/login/email/route.tsx",
            lineNumber: 118,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/auth/login/email/route.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/auth/login/email/route.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth/login/email/route.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV34("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV34(
      Link6,
      {
        to: {
          pathname: "/login",
          search
        },
        className: "text-base text-link",
        children: "\u2190 Other Login Options"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/auth/login/email/route.tsx",
        lineNumber: 131,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/auth/login/email/route.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth/login/email/route.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}

// app/routes/auth/signup/route.tsx
var route_exports6 = {};
__export(route_exports6, {
  default: () => Signup
});
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link as Link7 } from "@remix-run/react";
import { jsxDEV as jsxDEV35 } from "react/jsx-dev-runtime";
function Signup() {
  return /* @__PURE__ */ jsxDEV35("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxDEV35("h1", { className: "text-center text-2xl font-semibold tracking-tight sm:text-3xl", children: "Sign up to DropFeedback" }, void 0, !1, {
      fileName: "app/routes/auth/signup/route.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV35("div", { className: "m-auto flex w-min flex-col items-center", children: [
      /* @__PURE__ */ jsxDEV35(GoogleOAuthButton, {}, void 0, !1, {
        fileName: "app/routes/auth/signup/route.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV35(Separator, { className: "my-6" }, void 0, !1, {
        fileName: "app/routes/auth/signup/route.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV35(Link7, { to: "/signup/email", className: "text-base text-link", children: "Continue with Email \u2192" }, void 0, !1, {
        fileName: "app/routes/auth/signup/route.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth/signup/route.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV35("p", { className: "font-light text-muted-foreground text-center", children: [
      "By joining, you agree to our",
      " ",
      /* @__PURE__ */ jsxDEV35(Link7, { to: "#", className: "font-semibold text-primary hover:underline", children: [
        "Terms of Service",
        /* @__PURE__ */ jsxDEV35(ExternalLinkIcon, { className: "ml-0.5 inline-block h-4 w-4" }, void 0, !1, {
          fileName: "app/routes/auth/signup/route.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/auth/signup/route.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      " ",
      "and",
      " ",
      /* @__PURE__ */ jsxDEV35(Link7, { to: "#", className: "font-semibold text-primary hover:underline", children: [
        "Privacy Policy",
        /* @__PURE__ */ jsxDEV35(ExternalLinkIcon, { className: "ml-0.5 inline-block h-4 w-4" }, void 0, !1, {
          fileName: "app/routes/auth/signup/route.tsx",
          lineNumber: 28,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/auth/signup/route.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth/signup/route.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth/signup/route.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/routes/auth/signup/email/route.tsx
var route_exports7 = {};
__export(route_exports7, {
  default: () => SignupWithEmail
});
import { Link as Link8, useNavigate as useNavigate4 } from "@remix-run/react";
import { useForm as useForm3 } from "react-hook-form";
import { ExternalLinkIcon as ExternalLinkIcon2 } from "@radix-ui/react-icons";
import { useMutation as useMutation5 } from "@tanstack/react-query";
import { motion as motion4 } from "framer-motion";
import { jsxDEV as jsxDEV36 } from "react/jsx-dev-runtime";
function SignupWithEmail() {
  let navigate = useNavigate4(), signUp = useMutation5({
    mutationFn: fetchers.signup,
    onSuccess: () => {
      navigate("/dashboard");
    },
    meta: {
      errorToast: !1
    }
  }), form = useForm3({
    defaultValues: {
      email: "",
      password: "",
      fullName: ""
    }
  }), onSubmit = (values) => {
    signUp.mutate(values);
  };
  return /* @__PURE__ */ jsxDEV36("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxDEV36("h1", { className: "text-center text-2xl font-semibold tracking-tight sm:text-3xl", children: "Sign up for DropFeedback" }, void 0, !1, {
      fileName: "app/routes/auth/signup/email/route.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV36("div", { className: "m-auto max-w-[325px] space-y-6", children: [
      signUp.isError && /* @__PURE__ */ jsxDEV36(
        motion4.div,
        {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          children: /* @__PURE__ */ jsxDEV36(
            Alert,
            {
              variant: "destructive",
              className: "border-red bg-red-foreground text-red",
              children: /* @__PURE__ */ jsxDEV36(AlertDescription, { children: signUp.error?.response?.data?.message ?? signUp.error?.message }, void 0, !1, {
                fileName: "app/routes/auth/signup/email/route.tsx",
                lineNumber: 66,
                columnNumber: 15
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/auth/signup/email/route.tsx",
              lineNumber: 62,
              columnNumber: 13
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/auth/signup/email/route.tsx",
          lineNumber: 58,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV36(Form, { ...form, children: /* @__PURE__ */ jsxDEV36(
        "form",
        {
          onSubmit: form.handleSubmit(onSubmit),
          className: "m-auto max-w-[325px] space-y-4",
          children: [
            /* @__PURE__ */ jsxDEV36(
              FormField,
              {
                control: form.control,
                name: "fullName",
                render: ({ field }) => /* @__PURE__ */ jsxDEV36(FormItem, { children: [
                  /* @__PURE__ */ jsxDEV36(FormControl, { children: /* @__PURE__ */ jsxDEV36(
                    Input,
                    {
                      ...field,
                      placeholder: "Name",
                      className: "h-12",
                      required: !0,
                      type: "text"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/auth/signup/email/route.tsx",
                      lineNumber: 83,
                      columnNumber: 21
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 82,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV36(FormMessage, {}, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 91,
                    columnNumber: 19
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/auth/signup/email/route.tsx",
                  lineNumber: 81,
                  columnNumber: 17
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/auth/signup/email/route.tsx",
                lineNumber: 77,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV36(
              FormField,
              {
                control: form.control,
                name: "email",
                render: ({ field }) => /* @__PURE__ */ jsxDEV36(FormItem, { children: [
                  /* @__PURE__ */ jsxDEV36(FormControl, { children: /* @__PURE__ */ jsxDEV36(
                    Input,
                    {
                      ...field,
                      placeholder: "Email address",
                      className: "h-12",
                      required: !0,
                      type: "email"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/auth/signup/email/route.tsx",
                      lineNumber: 101,
                      columnNumber: 21
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 100,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV36(FormMessage, {}, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 109,
                    columnNumber: 19
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/auth/signup/email/route.tsx",
                  lineNumber: 99,
                  columnNumber: 17
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/auth/signup/email/route.tsx",
                lineNumber: 95,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV36(
              FormField,
              {
                control: form.control,
                name: "password",
                render: ({ field }) => /* @__PURE__ */ jsxDEV36(FormItem, { children: [
                  /* @__PURE__ */ jsxDEV36(FormControl, { children: /* @__PURE__ */ jsxDEV36(
                    Input,
                    {
                      ...field,
                      placeholder: "Password",
                      type: "password",
                      className: "h-12",
                      minLength: 4
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/auth/signup/email/route.tsx",
                      lineNumber: 119,
                      columnNumber: 21
                    },
                    this
                  ) }, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 118,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV36(FormMessage, {}, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 127,
                    columnNumber: 19
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/routes/auth/signup/email/route.tsx",
                  lineNumber: 117,
                  columnNumber: 17
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/auth/signup/email/route.tsx",
                lineNumber: 113,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV36(
              Button,
              {
                type: "submit",
                className: "w-full",
                size: "lg",
                disabled: signUp.isPending,
                children: [
                  signUp.isPending && /* @__PURE__ */ jsxDEV36(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
                    fileName: "app/routes/auth/signup/email/route.tsx",
                    lineNumber: 138,
                    columnNumber: 36
                  }, this),
                  "Sign Up"
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/auth/signup/email/route.tsx",
                lineNumber: 132,
                columnNumber: 13
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/auth/signup/email/route.tsx",
          lineNumber: 73,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/auth/signup/email/route.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth/signup/email/route.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV36("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV36(Link8, { to: "/signup", className: "text-base text-link", children: "\u2190 Other Sign Up Options" }, void 0, !1, {
      fileName: "app/routes/auth/signup/email/route.tsx",
      lineNumber: 145,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/auth/signup/email/route.tsx",
      lineNumber: 144,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV36("p", { className: "text-center font-light text-muted-foreground", children: [
      "By joining, you agree to our",
      " ",
      /* @__PURE__ */ jsxDEV36(Link8, { to: "#", className: "font-semibold text-primary hover:underline", children: [
        "Terms of Service",
        /* @__PURE__ */ jsxDEV36(ExternalLinkIcon2, { className: "ml-0.5 inline-block h-4 w-4" }, void 0, !1, {
          fileName: "app/routes/auth/signup/email/route.tsx",
          lineNumber: 153,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/auth/signup/email/route.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this),
      " ",
      "and",
      " ",
      /* @__PURE__ */ jsxDEV36(Link8, { to: "#", className: "font-semibold text-primary hover:underline", children: [
        "Privacy Policy",
        /* @__PURE__ */ jsxDEV36(ExternalLinkIcon2, { className: "ml-0.5 inline-block h-4 w-4" }, void 0, !1, {
          fileName: "app/routes/auth/signup/email/route.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/auth/signup/email/route.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/auth/signup/email/route.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth/signup/email/route.tsx",
    lineNumber: 52,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/layout.tsx
var layout_exports2 = {};
__export(layout_exports2, {
  default: () => LayoutRoute,
  loader: () => loader3
});
import { json as json2, redirect as redirect2 } from "@remix-run/cloudflare";
import { Outlet as Outlet3, useLoaderData as useLoaderData2 } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient as QueryClient2,
  dehydrate
} from "@tanstack/react-query";

// app/components/headers/dashboard-header.tsx
import { useState as useState5 } from "react";
import { Link as Link10, useParams as useParams2, useNavigate as useNavigate6 } from "@remix-run/react";
import { useMutation as useMutation6 } from "@tanstack/react-query";
import {
  GearIcon,
  ChatBubbleIcon as ChatBubbleIcon2,
  SlashIcon,
  ExitIcon
} from "@radix-ui/react-icons";

// app/components/ui/avatar.tsx
import * as React13 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsxDEV as jsxDEV37 } from "react/jsx-dev-runtime";
var Avatar = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV37(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/avatar.tsx",
    lineNumber: 10,
    columnNumber: 3
  },
  this
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV37(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/avatar.tsx",
    lineNumber: 25,
    columnNumber: 3
  },
  this
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV37(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/avatar.tsx",
    lineNumber: 37,
    columnNumber: 3
  },
  this
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// app/components/ui/dropdown-menu.tsx
import * as React14 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon as CheckIcon2,
  ChevronRightIcon as ChevronRightIcon2,
  DotFilledIcon
} from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV38 } from "react/jsx-dev-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root, DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React14.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDEV38(ChevronRightIcon2, { className: "ml-auto h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 39,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 29,
    columnNumber: 3
  },
  this
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 49,
    columnNumber: 3
  },
  this
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React14.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV38(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 66,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 65,
  columnNumber: 3
}, this));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React14.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 86,
    columnNumber: 3
  },
  this
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React14.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV38("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV38(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV38(CheckIcon2, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 113,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 112,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 111,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 102,
    columnNumber: 3
  },
  this
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React14.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV38("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV38(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV38(DotFilledIcon, { className: "h-4 w-4 fill-current" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 135,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 134,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 126,
    columnNumber: 3
  },
  this
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React14.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 150,
    columnNumber: 3
  },
  this
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV38(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 166,
    columnNumber: 3
  },
  this
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV38(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 179,
    columnNumber: 5
  },
  this
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// app/components/ui/menubar.tsx
import * as React15 from "react";
import {
  CheckIcon as CheckIcon3,
  ChevronRightIcon as ChevronRightIcon3,
  DotFilledIcon as DotFilledIcon2
} from "@radix-ui/react-icons";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { jsxDEV as jsxDEV39 } from "react/jsx-dev-runtime";
var Menubar = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.Root,
  {
    ref,
    className: cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 25,
    columnNumber: 3
  },
  this
));
Menubar.displayName = MenubarPrimitive.Root.displayName;
var MenubarTrigger = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 40,
    columnNumber: 3
  },
  this
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
var MenubarSubTrigger = React15.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDEV39(ChevronRightIcon3, { className: "ml-auto h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 67,
        columnNumber: 5
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 57,
    columnNumber: 3
  },
  this
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
var MenubarSubContent = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 76,
    columnNumber: 3
  },
  this
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
var MenubarContent = React15.forwardRef(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsxDEV39(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV39(
    MenubarPrimitive.Content,
    {
      ref,
      align,
      alignOffset,
      sideOffset,
      className: cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/menubar.tsx",
      lineNumber: 96,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 95,
    columnNumber: 5
  }, this)
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
var MenubarItem = React15.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 118,
    columnNumber: 3
  },
  this
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
var MenubarCheckboxItem = React15.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV39("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV39(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV39(CheckIcon3, { className: "h-4 w-4" }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 144,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 143,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 134,
    columnNumber: 3
  },
  this
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;
var MenubarRadioItem = React15.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV39("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV39(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV39(DotFilledIcon2, { className: "h-4 w-4 fill-current" }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 166,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/menubar.tsx",
        lineNumber: 165,
        columnNumber: 5
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 157,
    columnNumber: 3
  },
  this
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
var MenubarLabel = React15.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 181,
    columnNumber: 3
  },
  this
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
var MenubarSeparator = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV39(
  MenubarPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 197,
    columnNumber: 3
  },
  this
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
var MenubarShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV39(
  "span",
  {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/menubar.tsx",
    lineNumber: 210,
    columnNumber: 5
  },
  this
);
MenubarShortcut.displayname = "MenubarShortcut";

// app/components/headers/project-switcher.tsx
import { useEffect as useEffect3, useState as useState4 } from "react";
import {
  Link as Link9,
  useNavigate as useNavigate5,
  useParams,
  useSearchParams as useSearchParams6
} from "@remix-run/react";
import { useQuery as useQuery3 } from "@tanstack/react-query";
import {
  CaretSortIcon as CaretSortIcon2,
  CheckIcon as CheckIcon4,
  PlusCircledIcon
} from "@radix-ui/react-icons";

// app/components/ui/command.tsx
import * as React16 from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";
import { jsxDEV as jsxDEV40 } from "react/jsx-dev-runtime";
var Command = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV40(
  CommandPrimitive,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 13,
    columnNumber: 3
  },
  this
));
Command.displayName = CommandPrimitive.displayName;
var CommandInput = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV40("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxDEV40(MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }, void 0, !1, {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV40(
    CommandPrimitive.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/command.tsx",
      lineNumber: 44,
      columnNumber: 5
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/ui/command.tsx",
  lineNumber: 42,
  columnNumber: 3
}, this));
CommandInput.displayName = CommandPrimitive.Input.displayName;
var CommandList = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV40(
  CommandPrimitive.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 61,
    columnNumber: 3
  },
  this
));
CommandList.displayName = CommandPrimitive.List.displayName;
var CommandEmpty = React16.forwardRef((props, ref) => /* @__PURE__ */ jsxDEV40(
  CommandPrimitive.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 74,
    columnNumber: 3
  },
  this
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
var CommandGroup = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV40(
  CommandPrimitive.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 87,
    columnNumber: 3
  },
  this
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV40(
  CommandPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 103,
    columnNumber: 3
  },
  this
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
var CommandItem = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV40(
  CommandPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 115,
    columnNumber: 3
  },
  this
));
CommandItem.displayName = CommandPrimitive.Item.displayName;
var CommandShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV40(
  "span",
  {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/command.tsx",
    lineNumber: 132,
    columnNumber: 5
  },
  this
);
CommandShortcut.displayName = "CommandShortcut";

// app/components/headers/project-switcher.tsx
import { Fragment as Fragment3, jsxDEV as jsxDEV41 } from "react/jsx-dev-runtime";
function ProjectSwitcher() {
  let { projectId } = useParams(), navigate = useNavigate5(), [_, setSearchParams] = useSearchParams6(), { toast: toast2 } = useToast();
  if (!projectId)
    throw new Error("Project ID is required");
  let [open, setOpen] = useState4(!1), [selectedProjectId, setSelectedProjectId] = useState4(projectId), projects = useQuery3({
    queryKey: ["projects"],
    queryFn: () => fetchers.getProjects()
  }), project = useQuery3({
    queryKey: ["project", selectedProjectId],
    queryFn: () => fetchers.getProject(selectedProjectId)
  });
  return useEffect3(() => {
    setSelectedProjectId(projectId);
  }, [projectId]), useEffect3(() => {
    project.error && toast2({
      description: "Project not found.",
      action: /* @__PURE__ */ jsxDEV41(
        ToastAction,
        {
          altText: "Go to dashboard",
          onClick: () => navigate("/dashboard"),
          children: "Go to dashboard"
        },
        void 0,
        !1,
        {
          fileName: "app/components/headers/project-switcher.tsx",
          lineNumber: 63,
          columnNumber: 11
        },
        this
      )
    });
  }, [project.error, navigate, toast2]), projects.isError || project.isError ? null : projects.isPending || project.isPending ? /* @__PURE__ */ jsxDEV41("div", { className: "flex gap-1", children: [
    /* @__PURE__ */ jsxDEV41(Skeleton, { className: "h-5 w-24" }, void 0, !1, {
      fileName: "app/components/headers/project-switcher.tsx",
      lineNumber: 79,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV41(Skeleton, { className: "h-5 w-4" }, void 0, !1, {
      fileName: "app/components/headers/project-switcher.tsx",
      lineNumber: 80,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/headers/project-switcher.tsx",
    lineNumber: 78,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV41(Fragment3, { children: [
    /* @__PURE__ */ jsxDEV41(
      Link9,
      {
        to: `/dashboard/${project.data.id}`,
        className: "max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: project.data.name
      },
      void 0,
      !1,
      {
        fileName: "app/components/headers/project-switcher.tsx",
        lineNumber: 87,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV41(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxDEV41(PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV41(Button, { variant: "ghost", size: "icon", className: "-ml-1.5 w-auto px-1", children: /* @__PURE__ */ jsxDEV41(CaretSortIcon2, { className: "h-5 w-5 shrink-0 text-muted-foreground" }, void 0, !1, {
        fileName: "app/components/headers/project-switcher.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/project-switcher.tsx",
        lineNumber: 96,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/project-switcher.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV41(PopoverContent, { className: "z-50 w-[200px] bg-background p-0", children: /* @__PURE__ */ jsxDEV41(Command, { children: [
        /* @__PURE__ */ jsxDEV41(CommandGroup, { children: projects.data.map((project2) => /* @__PURE__ */ jsxDEV41(
          CommandItem,
          {
            value: project2.id,
            onSelect: (value) => {
              setSelectedProjectId(value), setOpen(!1), navigate(`/dashboard/${value}`);
            },
            children: [
              /* @__PURE__ */ jsxDEV41(
                CheckIcon4,
                {
                  className: cn(
                    "mr-2 h-4 w-4 shrink-0",
                    selectedProjectId === project2.id ? "opacity-100" : "opacity-0"
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/headers/project-switcher.tsx",
                  lineNumber: 113,
                  columnNumber: 19
                },
                this
              ),
              project2.name
            ]
          },
          project2.id,
          !0,
          {
            fileName: "app/components/headers/project-switcher.tsx",
            lineNumber: 104,
            columnNumber: 17
          },
          this
        )) }, void 0, !1, {
          fileName: "app/components/headers/project-switcher.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(CommandSeparator, {}, void 0, !1, {
          fileName: "app/components/headers/project-switcher.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV41(CommandGroup, { children: /* @__PURE__ */ jsxDEV41(
          CommandItem,
          {
            onSelect: () => {
              setSearchParams(
                (prev) => (prev.set("modal", "create-project"), prev),
                { replace: !0 }
              ), setOpen(!1);
            },
            children: [
              /* @__PURE__ */ jsxDEV41(PlusCircledIcon, { className: "mr-2 h-4 w-4" }, void 0, !1, {
                fileName: "app/components/headers/project-switcher.tsx",
                lineNumber: 139,
                columnNumber: 17
              }, this),
              "Create Project"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/headers/project-switcher.tsx",
            lineNumber: 127,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/headers/project-switcher.tsx",
          lineNumber: 126,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/headers/project-switcher.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/project-switcher.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/headers/project-switcher.tsx",
      lineNumber: 94,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/headers/project-switcher.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
}

// app/data-hooks/useMe.ts
import { useQuery as useQuery4 } from "@tanstack/react-query";
var useMe = () => useQuery4({
  queryKey: ["me"],
  queryFn: () => fetchers.me(),
  retry: !1,
  refetchOnWindowFocus: !1,
  meta: {
    errorToast: !1
  }
});

// app/components/headers/dashboard-header.tsx
import { Fragment as Fragment4, jsxDEV as jsxDEV42 } from "react/jsx-dev-runtime";
function DashboardHeader() {
  let params = useParams2(), navigate = useNavigate6(), [open, setOpen] = useState5(!1), logoutMutation = useMutation6({
    mutationFn: fetchers.logout,
    onSuccess: () => {
      navigate("/login");
    }
  }), { data: user } = useMe(), logout2 = () => {
    logoutMutation.mutate();
  };
  return /* @__PURE__ */ jsxDEV42("nav", { className: "z-50 flex h-16 items-center border-b px-4 md:px-6", children: [
    /* @__PURE__ */ jsxDEV42("div", { className: "flex flex-1 items-center gap-4", children: /* @__PURE__ */ jsxDEV42("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV42(Link10, { to: "/dashboard", children: /* @__PURE__ */ jsxDEV42("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV42(ChatBubbleIcon2, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 50,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV42("span", { className: "hidden text-lg font-bold tracking-tight sm:block", children: "DropFeedback" }, void 0, !1, {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 51,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/headers/dashboard-header.tsx",
        lineNumber: 49,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/headers/dashboard-header.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      params?.projectId && /* @__PURE__ */ jsxDEV42(Fragment4, { children: [
        /* @__PURE__ */ jsxDEV42(SlashIcon, { className: "h-4 w-4 text-primary opacity-20" }, void 0, !1, {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 59,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV42(ProjectSwitcher, {}, void 0, !1, {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 60,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/headers/dashboard-header.tsx",
        lineNumber: 58,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/headers/dashboard-header.tsx",
      lineNumber: 47,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/headers/dashboard-header.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV42("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsxDEV42(
        Button,
        {
          variant: "outline",
          className: "hidden font-normal text-muted-foreground sm:block",
          children: "Feedback"
        },
        void 0,
        !1,
        {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 66,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV42(
        Button,
        {
          asChild: !0,
          variant: "link",
          className: "font-normal text-muted-foreground hover:text-primary hover:no-underline",
          children: /* @__PURE__ */ jsxDEV42(Link10, { to: "/docs", children: "Docs" }, void 0, !1, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 77,
            columnNumber: 11
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 72,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV42(DropdownMenu, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxDEV42(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV42(
          Button,
          {
            variant: "ghost",
            className: "relative h-7 w-7 rounded-full p-0",
            children: /* @__PURE__ */ jsxDEV42(Avatar, { className: "h-7 w-7", children: [
              /* @__PURE__ */ jsxDEV42(AvatarImage, { src: user?.avatarUrl, alt: `${user?.fullName}` }, void 0, !1, {
                fileName: "app/components/headers/dashboard-header.tsx",
                lineNumber: 86,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV42(AvatarFallback, { children: getNameInitials(`${user?.fullName}`) }, void 0, !1, {
                fileName: "app/components/headers/dashboard-header.tsx",
                lineNumber: 87,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 85,
              columnNumber: 15
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 81,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV42(DropdownMenuContent, { align: "end", className: "w-[220px]", children: [
          /* @__PURE__ */ jsxDEV42("div", { className: "px-2 py-1.5", children: [
            /* @__PURE__ */ jsxDEV42("p", { className: "font-medium text-primary", children: `${user?.fullName}` }, void 0, !1, {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV42("p", { children: user?.email }, void 0, !1, {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 96,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 94,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV42(DropdownMenuSeparator, {}, void 0, !1, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 98,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV42("div", { className: "flex justify-between px-2 py-1.5 transition-colors hover:text-accent-foreground", children: [
            "Theme",
            /* @__PURE__ */ jsxDEV42(ThemeSwitcher, {}, void 0, !1, {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 101,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 99,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV42(DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ jsxDEV42(Link10, { to: "/dashboard/settings", children: [
            "Settings",
            /* @__PURE__ */ jsxDEV42(MenubarShortcut, { children: /* @__PURE__ */ jsxDEV42(GearIcon, {}, void 0, !1, {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 107,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 106,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 104,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 103,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV42(DropdownMenuSeparator, {}, void 0, !1, {
            fileName: "app/components/headers/dashboard-header.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV42(
            DropdownMenuItem,
            {
              onClick: logout2,
              className: "text-red focus:bg-red-foreground focus:text-red",
              children: [
                logoutMutation.isPending ? "Logging out.." : "Log out",
                /* @__PURE__ */ jsxDEV42(MenubarShortcut, { children: /* @__PURE__ */ jsxDEV42(ExitIcon, {}, void 0, !1, {
                  fileName: "app/components/headers/dashboard-header.tsx",
                  lineNumber: 118,
                  columnNumber: 17
                }, this) }, void 0, !1, {
                  fileName: "app/components/headers/dashboard-header.tsx",
                  lineNumber: 117,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/headers/dashboard-header.tsx",
              lineNumber: 112,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/headers/dashboard-header.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/headers/dashboard-header.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/headers/dashboard-header.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/headers/dashboard-header.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/layout.tsx
import { Fragment as Fragment5, jsxDEV as jsxDEV43 } from "react/jsx-dev-runtime";
async function loader3({ request }) {
  let queryClient = new QueryClient2(), { pathname } = new URL(request.url), shouldAddNext = ![
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/email-verification"
  ].includes(pathname), nextUrl = encodeURIComponent(pathname), cookie = request.headers.get("Cookie");
  if (!cookie) {
    let redirectNext = shouldAddNext ? `/login?next=${nextUrl}` : "/login";
    throw redirect2(redirectNext);
  }
  try {
    return await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: () => fetchers.me(cookie)
    }), json2({ dehydratedState: dehydrate(queryClient) });
  } catch (error) {
    let response = error.response, status = response?.status, message = response?.data?.message, redirectUrl = "/login";
    return status === 403 && message === "Email is not verified" && (redirectUrl = "/dashboard/email-verification"), pathname === redirectUrl ? json2({ dehydratedState: dehydrate(queryClient) }) : redirect2(
      shouldAddNext ? `${redirectUrl}?next=${nextUrl}` : redirectUrl
    );
  }
}
function Layout2() {
  return /* @__PURE__ */ jsxDEV43(Fragment5, { children: [
    /* @__PURE__ */ jsxDEV43(DashboardHeader, {}, void 0, !1, {
      fileName: "app/routes/dashboard/layout.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV43("div", { className: "flex h-[calc(100vh-4rem)] flex-col", children: /* @__PURE__ */ jsxDEV43(Outlet3, {}, void 0, !1, {
      fileName: "app/routes/dashboard/layout.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/layout.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/layout.tsx",
    lineNumber: 63,
    columnNumber: 5
  }, this);
}
function LayoutRoute() {
  let { dehydratedState } = useLoaderData2();
  return /* @__PURE__ */ jsxDEV43(HydrationBoundary, { state: dehydratedState, children: /* @__PURE__ */ jsxDEV43(Layout2, {}, void 0, !1, {
    fileName: "app/routes/dashboard/layout.tsx",
    lineNumber: 76,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard/layout.tsx",
    lineNumber: 75,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/layout.tsx
var layout_exports3 = {};
__export(layout_exports3, {
  default: () => Layout3
});
import { Outlet as Outlet4 } from "@remix-run/react";

// app/components/headers/project-header.tsx
import { useEffect as useEffect4, useState as useState6 } from "react";
import { ChatBubbleIcon as ChatBubbleIcon3 } from "@radix-ui/react-icons";
import { Link as Link11, useLocation as useLocation5, useParams as useParams3 } from "@remix-run/react";
import { motion as motion5 } from "framer-motion";
import { jsxDEV as jsxDEV44 } from "react/jsx-dev-runtime";
var ROUTES = [
  {
    key: "feedback",
    title: "Feedback",
    path: "/dashboard/:projectId"
  },
  {
    key: "team",
    title: "Team",
    path: "/dashboard/:projectId/team"
  },
  {
    key: "settings",
    title: "Settings",
    path: "/dashboard/:projectId/settings"
  }
];
function ProjectHeader() {
  let [isStickyActive, setIsStickyActive] = useState6(!1), params = useParams3(), location = useLocation5();
  useEffect4(() => {
    let handleScroll = () => {
      window.scrollY > 45 ? setIsStickyActive(!0) : setIsStickyActive(!1);
    };
    return document.addEventListener("scroll", handleScroll), () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let activeRoute = ROUTES.find((route) => location.pathname.includes(route.key)) ?? ROUTES[0];
  return /* @__PURE__ */ jsxDEV44("div", { className: "sticky top-0 z-50 -mt-3 flex h-auto items-center overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-none border-b bg-background px-4 py-2 text-muted-foreground md:px-6", children: [
    isStickyActive && /* @__PURE__ */ jsxDEV44(
      motion5.div,
      {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsxDEV44(ChatBubbleIcon3, { className: "h-5 w-5" }, void 0, !1, {
          fileName: "app/components/headers/project-header.tsx",
          lineNumber: 59,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/headers/project-header.tsx",
        lineNumber: 55,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV44(
      motion5.div,
      {
        layout: !0,
        layoutDependency: isStickyActive,
        className: cn("relative ml-2", { "-ml-3": !isStickyActive }),
        children: ROUTES.map((route) => /* @__PURE__ */ jsxDEV44(
          Button,
          {
            variant: "ghost",
            size: "default",
            asChild: !0,
            className: cn("tab-button relative font-medium", {
              "active-tab-button font-semibold text-primary": activeRoute.key === route.key
            }),
            children: /* @__PURE__ */ jsxDEV44(Link11, { to: route.path.replace(":projectId", params.projectId), children: route.title }, void 0, !1, {
              fileName: "app/components/headers/project-header.tsx",
              lineNumber: 78,
              columnNumber: 13
            }, this)
          },
          route.key,
          !1,
          {
            fileName: "app/components/headers/project-header.tsx",
            lineNumber: 68,
            columnNumber: 11
          },
          this
        ))
      },
      void 0,
      !1,
      {
        fileName: "app/components/headers/project-header.tsx",
        lineNumber: 62,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/headers/project-header.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/layout.tsx
import { jsxDEV as jsxDEV45 } from "react/jsx-dev-runtime";
function Layout3() {
  return /* @__PURE__ */ jsxDEV45("div", { children: [
    /* @__PURE__ */ jsxDEV45(ProjectHeader, {}, void 0, !1, {
      fileName: "app/routes/dashboard/project/layout.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV45("div", { children: /* @__PURE__ */ jsxDEV45(Outlet4, {}, void 0, !1, {
      fileName: "app/routes/dashboard/project/layout.tsx",
      lineNumber: 9,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/project/layout.tsx",
      lineNumber: 8,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/project/layout.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/feedbacks.tsx
var feedbacks_exports = {};
__export(feedbacks_exports, {
  default: () => Feedbacks
});

// app/components/feedback-sider.tsx
import { useEffect as useEffect7, useRef, useState as useState11 } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon as MagnifyingGlassIcon2
} from "@radix-ui/react-icons";
import debounce from "lodash.debounce";

// app/components/feedback-radio-group.tsx
import { DotFilledIcon as DotFilledIcon3, DotIcon } from "@radix-ui/react-icons";

// app/components/feedback-provider.tsx
import { useParams as useParams4 } from "@remix-run/react";
import { createContext as createContext2, useContext as useContext2, useState as useState7 } from "react";

// app/types/index.ts
var FeedbackCategory = /* @__PURE__ */ ((FeedbackCategory2) => (FeedbackCategory2.other = "other", FeedbackCategory2.issue = "issue", FeedbackCategory2.idea = "idea", FeedbackCategory2))(FeedbackCategory || {});

// app/components/feedback-provider.tsx
import { jsxDEV as jsxDEV46 } from "react/jsx-dev-runtime";
var defaultFiltersAndSorters = {
  filters: { search: "", status: "new" /* new */ },
  sorters: { createdAt: "desc" }
}, FeedbackContext = createContext2({
  projectId: "",
  filtersAndSorters: defaultFiltersAndSorters,
  setFiltersAndSorters: () => {
  },
  counts: {},
  setCounts: () => {
  }
});
function FeedbackProvider({ children }) {
  let { projectId } = useParams4();
  if (!projectId)
    throw new Error("Project ID is required");
  let [counts, setCounts] = useState7({}), [filtersAndSorters, setFiltersAndSorters] = useState7(
    defaultFiltersAndSorters
  );
  return /* @__PURE__ */ jsxDEV46(
    FeedbackContext.Provider,
    {
      value: {
        projectId,
        filtersAndSorters,
        setFiltersAndSorters,
        counts,
        setCounts
      },
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/feedback-provider.tsx",
      lineNumber: 46,
      columnNumber: 5
    },
    this
  );
}
function useFeedbackContext() {
  let context = useContext2(FeedbackContext);
  if (!context)
    throw new Error("useFeedbackContext must be used within FeedbackProvider");
  return context;
}

// app/components/feedback-radio-group.tsx
import { jsxDEV as jsxDEV47 } from "react/jsx-dev-runtime";
var categories = [
  {
    label: "All",
    value: "all"
  },
  {
    label: "Issue",
    value: "issue"
  },
  {
    label: "Idea",
    value: "idea"
  },
  {
    label: "Other",
    value: "other"
  },
  {
    label: "Archive",
    value: "archive"
  }
];
function FeedbackRadioGroup() {
  let { counts, filtersAndSorters, setFiltersAndSorters } = useFeedbackContext(), { filters } = filtersAndSorters;
  return /* @__PURE__ */ jsxDEV47("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-1", children: categories.map((category) => /* @__PURE__ */ jsxDEV47(
    Button,
    {
      variant: "ghost",
      className: cn(
        "justify-between px-1.5 font-semibold text-muted-foreground transition-colors duration-200 hover:text-muted-foreground",
        {
          "bg-blue-foreground text-blue hover:bg-blue-foreground hover:text-blue": filters.category === void 0 && category.value === "all" && filters.status !== "archived",
          "bg-red-foreground text-red hover:bg-red-foreground hover:text-red": filters.category === "issue" && filters.category === category.value,
          "bg-amber-foreground text-amber hover:bg-amber-foreground hover:text-amber": filters.category === "idea" && filters.category === category.value,
          "bg-gray-foreground text-gray hover:bg-gray-foreground hover:text-gray": filters.category === "other" && filters.category === category.value,
          "bg-stone-100  hover:bg-stone-100  dark:bg-stone-800 hover:dark:bg-stone-800": filters.status === "archived" && category.value === "archive"
        }
      ),
      onClick: () => {
        let value = category.value;
        if (value === "archive") {
          setFiltersAndSorters((prev) => ({
            sorters: {
              updatedAt: Object.values(prev.sorters)[0]
            },
            filters: {
              ...prev.filters,
              category: void 0,
              status: "archived" /* archived */
            }
          }));
          return;
        }
        setFiltersAndSorters((prev) => ({
          sorters: {
            createdAt: Object.values(prev.sorters)[0]
          },
          filters: {
            ...prev.filters,
            status: "new" /* new */,
            category: value === "all" ? void 0 : FeedbackCategory[value]
          }
        }));
      },
      children: [
        /* @__PURE__ */ jsxDEV47("div", { className: "flex items-center", children: [
          category.value === "archive" ? /* @__PURE__ */ jsxDEV47(DotIcon, { className: "h-6 w-6" }, void 0, !1, {
            fileName: "app/components/feedback-radio-group.tsx",
            lineNumber: 96,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV47(
            DotFilledIcon3,
            {
              className: cn("h-6 w-6", {
                "text-blue": category.value === "all",
                "text-red": category.value === "issue",
                "text-amber": category.value === "idea",
                "text-gray": category.value === "other"
              })
            },
            void 0,
            !1,
            {
              fileName: "app/components/feedback-radio-group.tsx",
              lineNumber: 98,
              columnNumber: 15
            },
            this
          ),
          category.label
        ] }, void 0, !0, {
          fileName: "app/components/feedback-radio-group.tsx",
          lineNumber: 94,
          columnNumber: 11
        }, this),
        counts[category.value] === void 0 ? /* @__PURE__ */ jsxDEV47(Skeleton, { className: "h-6 w-8" }, void 0, !1, {
          fileName: "app/components/feedback-radio-group.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDEV47("div", { className: "tabular-nums", children: category.value === "all" ? filters.search === void 0 || filters.search === "" ? counts.countNew : (counts.idea ?? 0) + (counts.issue ?? 0) + (counts.other ?? 0) : counts[category.value] }, void 0, !1, {
          fileName: "app/components/feedback-radio-group.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this)
      ]
    },
    category.value,
    !0,
    {
      fileName: "app/components/feedback-radio-group.tsx",
      lineNumber: 42,
      columnNumber: 9
    },
    this
  )) }, void 0, !1, {
    fileName: "app/components/feedback-radio-group.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}

// app/components/feedback-collapsible-area.tsx
import { useEffect as useEffect5, useState as useState8 } from "react";

// app/components/ui/collapsible.tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
var Collapsible = CollapsiblePrimitive.Root, CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger, CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;

// app/components/feedback-collapsible-area.tsx
import { ChevronDownIcon as ChevronDownIcon2, ChevronUpIcon as ChevronUpIcon2 } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV48 } from "react/jsx-dev-runtime";
function FeedbackCollapsibleArea({
  title,
  children
}) {
  let [permanentOpen, setPermanentOpen] = useState8(!0), [isOpen, setIsOpen] = useState8(!0);
  return useEffect5(() => {
    window.innerWidth < 768 && setPermanentOpen(!1);
    function handleResize(event) {
      event.target.innerWidth >= 768 ? setPermanentOpen(!0) : setPermanentOpen(!1);
    }
    return window.addEventListener("resize", handleResize), () => window.removeEventListener("resize", handleResize);
  }, []), /* @__PURE__ */ jsxDEV48(Collapsible, { open: permanentOpen || isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxDEV48(CollapsibleTrigger2, { asChild: !0, children: /* @__PURE__ */ jsxDEV48(
      "button",
      {
        className: "flex w-full items-center justify-between",
        "aria-label": "Toggle collapsible area",
        disabled: permanentOpen,
        children: [
          /* @__PURE__ */ jsxDEV48("span", { className: "sr-only", children: "Toggle" }, void 0, !1, {
            fileName: "app/components/feedback-collapsible-area.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV48("h3", { className: "font-medium", children: title }, void 0, !1, {
            fileName: "app/components/feedback-collapsible-area.tsx",
            lineNumber: 49,
            columnNumber: 11
          }, this),
          !permanentOpen && (isOpen ? /* @__PURE__ */ jsxDEV48(ChevronUpIcon2, {}, void 0, !1, {
            fileName: "app/components/feedback-collapsible-area.tsx",
            lineNumber: 50,
            columnNumber: 40
          }, this) : /* @__PURE__ */ jsxDEV48(ChevronDownIcon2, {}, void 0, !1, {
            fileName: "app/components/feedback-collapsible-area.tsx",
            lineNumber: 50,
            columnNumber: 60
          }, this))
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/feedback-collapsible-area.tsx",
        lineNumber: 43,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/feedback-collapsible-area.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV48(Separator, { className: "mb-4 mt-2" }, void 0, !1, {
      fileName: "app/components/feedback-collapsible-area.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV48(CollapsibleContent2, { children }, void 0, !1, {
      fileName: "app/components/feedback-collapsible-area.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/feedback-collapsible-area.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}

// app/components/copy-button.tsx
import { useEffect as useEffect6, useState as useState10 } from "react";
import { motion as motion6 } from "framer-motion";
import { CheckIcon as CheckIcon5, CopyIcon } from "@radix-ui/react-icons";

// app/lib/hooks/useCopyToClipboard.ts
import { useState as useState9 } from "react";
function useCopyToClipboard() {
  let [copiedText, setCopiedText] = useState9(null);
  return [async (text) => {
    if (!navigator?.clipboard)
      return console.warn("Clipboard not supported"), !1;
    try {
      return await navigator.clipboard.writeText(text), setCopiedText(text), !0;
    } catch (error) {
      return console.warn("Copy failed", error), setCopiedText(null), !1;
    }
  }, copiedText];
}

// app/components/copy-button.tsx
import { jsxDEV as jsxDEV49 } from "react/jsx-dev-runtime";
function CopyButton({
  value,
  className
}) {
  let [copy] = useCopyToClipboard(), [isCopied, setIsCopied] = useState10(!1), handleClick = () => {
    copy(value), setIsCopied(!0);
  };
  return useEffect6(() => {
    if (isCopied) {
      let timer = setTimeout(() => {
        setIsCopied(!1);
      }, 2e3);
      return () => clearTimeout(timer);
    }
  }, [isCopied]), /* @__PURE__ */ jsxDEV49(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className,
      type: "button",
      onClick: handleClick,
      children: isCopied ? /* @__PURE__ */ jsxDEV49(motion6.div, { initial: { scale: 0 }, animate: { scale: 1 }, children: /* @__PURE__ */ jsxDEV49(CheckIcon5, {}, void 0, !1, {
        fileName: "app/components/copy-button.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/copy-button.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV49(CopyIcon, {}, void 0, !1, {
        fileName: "app/components/copy-button.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/copy-button.tsx",
      lineNumber: 33,
      columnNumber: 5
    },
    this
  );
}

// app/components/feedback-sider.tsx
import { jsxDEV as jsxDEV50 } from "react/jsx-dev-runtime";
function FeedbackSider() {
  let [search, setSearch] = useState11(""), { projectId, filtersAndSorters, setFiltersAndSorters } = useFeedbackContext(), { sorters } = filtersAndSorters, debouncedSearch = useRef(
    debounce((value) => {
      setFiltersAndSorters((prev) => ({
        ...prev,
        filters: {
          ...prev.filters,
          search: value
        }
      }));
    }, 300)
  ).current;
  return useEffect7(() => () => {
    debouncedSearch.cancel();
  }, [debouncedSearch]), /* @__PURE__ */ jsxDEV50("div", { className: "relative w-full shrink-0 border-r-0 md:w-[280px] md:border-r", children: /* @__PURE__ */ jsxDEV50("div", { className: "sticky top-20", children: /* @__PURE__ */ jsxDEV50("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV50(FeedbackCollapsibleArea, { title: "Filter", children: /* @__PURE__ */ jsxDEV50("div", { className: "space-y-4 pr-0 md:pr-4", children: [
      /* @__PURE__ */ jsxDEV50("div", { className: "relative", children: [
        /* @__PURE__ */ jsxDEV50(
          Input,
          {
            placeholder: "Search feedback",
            value: search,
            className: "pr-6",
            onChange: (e) => {
              setSearch(e.target.value), debouncedSearch(e.target.value);
            }
          },
          void 0,
          !1,
          {
            fileName: "app/components/feedback-sider.tsx",
            lineNumber: 47,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV50(MagnifyingGlassIcon2, { className: "absolute right-2 top-1/2 -translate-y-1/2 transform" }, void 0, !1, {
          fileName: "app/components/feedback-sider.tsx",
          lineNumber: 56,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/feedback-sider.tsx",
        lineNumber: 46,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV50(FeedbackRadioGroup, {}, void 0, !1, {
        fileName: "app/components/feedback-sider.tsx",
        lineNumber: 58,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/feedback-sider.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/feedback-sider.tsx",
      lineNumber: 44,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV50(FeedbackCollapsibleArea, { title: "Sorter", children: /* @__PURE__ */ jsxDEV50("div", { className: "grid grid-cols-2 gap-1.5 pr-0 md:pr-4", children: [
      /* @__PURE__ */ jsxDEV50(
        Button,
        {
          className: "px-2 text-muted-foreground hover:text-muted-foreground",
          variant: Object.values(sorters)[0] === "desc" ? "outline" : "ghost",
          onClick: () => setFiltersAndSorters((prev) => ({
            ...prev,
            sorters: Object.fromEntries(
              Object.entries(prev.sorters).map(([key, value]) => [
                key,
                "desc"
              ])
            )
          })),
          children: [
            /* @__PURE__ */ jsxDEV50(ArrowDownIcon, { className: "mr-1 h-4 w-4" }, void 0, !1, {
              fileName: "app/components/feedback-sider.tsx",
              lineNumber: 80,
              columnNumber: 17
            }, this),
            "Newest first"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/feedback-sider.tsx",
          lineNumber: 63,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ jsxDEV50(
        Button,
        {
          className: "px-2 text-muted-foreground hover:text-muted-foreground",
          variant: Object.values(sorters)[0] === "asc" ? "outline" : "ghost",
          onClick: () => setFiltersAndSorters((prev) => ({
            ...prev,
            sorters: Object.fromEntries(
              Object.entries(prev.sorters).map(([key, value]) => [
                key,
                "asc"
              ])
            )
          })),
          children: [
            /* @__PURE__ */ jsxDEV50(ArrowUpIcon, { className: "mr-1 h-4 w-4" }, void 0, !1, {
              fileName: "app/components/feedback-sider.tsx",
              lineNumber: 100,
              columnNumber: 17
            }, this),
            "Oldest first"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/feedback-sider.tsx",
          lineNumber: 83,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/feedback-sider.tsx",
      lineNumber: 62,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/feedback-sider.tsx",
      lineNumber: 61,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV50(FeedbackCollapsibleArea, { title: "Project ID", children: /* @__PURE__ */ jsxDEV50("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxDEV50("p", { className: "text-xs tracking-tight text-muted-foreground", children: projectId }, void 0, !1, {
        fileName: "app/components/feedback-sider.tsx",
        lineNumber: 107,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV50(
        CopyButton,
        {
          className: "h-4 w-4 text-muted-foreground",
          value: projectId
        },
        void 0,
        !1,
        {
          fileName: "app/components/feedback-sider.tsx",
          lineNumber: 110,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/feedback-sider.tsx",
      lineNumber: 106,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/feedback-sider.tsx",
      lineNumber: 105,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/feedback-sider.tsx",
    lineNumber: 43,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/feedback-sider.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/feedback-sider.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}

// app/components/feedback-list.tsx
import { Fragment as Fragment7, useEffect as useEffect8, useState as useState12 } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// app/components/feedback-card-skeleton.tsx
import { motion as motion7 } from "framer-motion";
import { jsxDEV as jsxDEV51 } from "react/jsx-dev-runtime";
function FeedbackCardSkeleton() {
  return /* @__PURE__ */ jsxDEV51(
    motion7.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 },
      className: "flex flex-col gap-2 border-b p-2 last:border-none",
      children: [
        /* @__PURE__ */ jsxDEV51("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxDEV51(Skeleton, { className: "h-5 w-[55px]" }, void 0, !1, {
            fileName: "app/components/feedback-card-skeleton.tsx",
            lineNumber: 13,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV51(Skeleton, { className: "h-3 w-[65px]" }, void 0, !1, {
            fileName: "app/components/feedback-card-skeleton.tsx",
            lineNumber: 14,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/feedback-card-skeleton.tsx",
          lineNumber: 12,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV51("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV51(Skeleton, { className: "h-4 w-full" }, void 0, !1, {
            fileName: "app/components/feedback-card-skeleton.tsx",
            lineNumber: 17,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV51(Skeleton, { className: "h-4 w-full" }, void 0, !1, {
            fileName: "app/components/feedback-card-skeleton.tsx",
            lineNumber: 18,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV51(Skeleton, { className: "h-4 w-full" }, void 0, !1, {
            fileName: "app/components/feedback-card-skeleton.tsx",
            lineNumber: 19,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/feedback-card-skeleton.tsx",
          lineNumber: 16,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/feedback-card-skeleton.tsx",
      lineNumber: 6,
      columnNumber: 5
    },
    this
  );
}

// app/components/feedback-card.tsx
import {
  DesktopIcon as DesktopIcon2,
  FileIcon,
  GlobeIcon,
  PersonIcon,
  SizeIcon
} from "@radix-ui/react-icons";
import UAParser from "ua-parser-js";
import { motion as motion8 } from "framer-motion";
import { useMutation as useMutation7, useQueryClient as useQueryClient3 } from "@tanstack/react-query";
import { Link as Link12 } from "@remix-run/react";

// app/components/ui/tooltip.tsx
import * as React18 from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsxDEV as jsxDEV52 } from "react/jsx-dev-runtime";
var TooltipProvider = TooltipPrimitive.Provider, Tooltip = TooltipPrimitive.Root, TooltipTrigger = TooltipPrimitive.Trigger, TooltipContent = React18.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV52(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/tooltip.tsx",
    lineNumber: 16,
    columnNumber: 3
  },
  this
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// app/components/feedback-card.tsx
import { Fragment as Fragment6, jsxDEV as jsxDEV53 } from "react/jsx-dev-runtime";
function FeedbackCard({
  id,
  content,
  createdAt,
  device,
  url,
  category,
  openedCardId,
  status,
  meta: meta2,
  reportIdentifier,
  resolution,
  setOpenedCardId
}) {
  let queryClient = useQueryClient3(), { projectId, filtersAndSorters } = useFeedbackContext(), isOpen = openedCardId === id, ua = new UAParser(device).getResult(), updateFeedbackStatus2 = useMutation7({
    mutationFn: (variables) => fetchers.updateFeedbackStatus(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", projectId, { ...filtersAndSorters }]
      });
    }
  });
  return /* @__PURE__ */ jsxDEV53(
    motion8.button,
    {
      "aria-label": "Open feedback card to see more details",
      whileInView: { opacity: 1, transition: { duration: 0.2 } },
      className: cn(
        "block w-full cursor-pointer select-text overflow-hidden border-b p-2 text-left opacity-0 transition-all last:border-none",
        {
          "cursor-auto bg-accent/70": isOpen
        }
      ),
      onClick: () => setOpenedCardId(id),
      children: /* @__PURE__ */ jsxDEV53("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxDEV53("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxDEV53("div", { className: "text-xs text-muted-foreground", children: getRelativeTime(createdAt) }, void 0, !1, {
            fileName: "app/components/feedback-card.tsx",
            lineNumber: 82,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV53(
            "div",
            {
              className: cn(
                "inline-flex select-none items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
                {
                  "border-amber bg-amber-foreground text-amber": category === "idea" /* idea */,
                  "border-red bg-red-foreground text-red": category === "issue" /* issue */,
                  "border-gray bg-gray-foreground text-gray": category === "other" /* other */
                }
              ),
              children: category
            },
            void 0,
            !1,
            {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 85,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/feedback-card.tsx",
          lineNumber: 81,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV53(
          "p",
          {
            className: cn("line-clamp-5 text-base", {
              "line-clamp-none": isOpen
            }),
            children: content
          },
          void 0,
          !1,
          {
            fileName: "app/components/feedback-card.tsx",
            lineNumber: 101,
            columnNumber: 9
          },
          this
        ),
        isOpen && /* @__PURE__ */ jsxDEV53(Fragment6, { children: [
          /* @__PURE__ */ jsxDEV53("div", { className: "border-t", children: [
            /* @__PURE__ */ jsxDEV53("h3", { className: "my-2 font-medium", children: "Session" }, void 0, !1, {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 111,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV53("div", { className: "grid grid-cols-1 gap-x-1 gap-y-2 md:grid-cols-2", children: [
              reportIdentifier && /* @__PURE__ */ jsxDEV53("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV53(SessionIcon, { tooltipDescription: "Reporter", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ jsxDEV53(PersonIcon, { className: "flex-shrink-0 text-muted-foreground" }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 117,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 116,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 115,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV53("p", { className: "break-all", children: reportIdentifier }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 120,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/feedback-card.tsx",
                lineNumber: 114,
                columnNumber: 19
              }, this),
              url && /* @__PURE__ */ jsxDEV53("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV53(SessionIcon, { tooltipDescription: "Page", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ jsxDEV53(FileIcon, { className: "flex-shrink-0 text-muted-foreground" }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 127,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 126,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 125,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV53(
                  Link12,
                  {
                    to: url,
                    className: "break-all transition-colors hover:text-link",
                    children: url
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/feedback-card.tsx",
                    lineNumber: 130,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/components/feedback-card.tsx",
                lineNumber: 124,
                columnNumber: 19
              }, this),
              ua.os.name && ua.os.version && /* @__PURE__ */ jsxDEV53("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV53(SessionIcon, { tooltipDescription: "System", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ jsxDEV53(DesktopIcon2, { className: "flex-shrink-0 text-muted-foreground" }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 142,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 141,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 140,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV53("p", { children: `${ua.os.name} ${ua.os.version}` }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 145,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/feedback-card.tsx",
                lineNumber: 139,
                columnNumber: 19
              }, this),
              ua.browser.name && ua.browser.version && /* @__PURE__ */ jsxDEV53("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV53(SessionIcon, { tooltipDescription: "Browser", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ jsxDEV53(GlobeIcon, { className: "flex-shrink-0 text-muted-foreground" }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 152,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 151,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 150,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV53("p", { children: `${ua.browser.name} ${ua.browser.version}` }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 155,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/feedback-card.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, this),
              resolution && /* @__PURE__ */ jsxDEV53("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV53(SessionIcon, { tooltipDescription: "Screen Size", children: /* @__PURE__ */ jsxDEV53("div", { className: "flex h-5 items-center", children: /* @__PURE__ */ jsxDEV53(SizeIcon, { className: "flex-shrink-0 text-muted-foreground" }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 162,
                  columnNumber: 25
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 161,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 160,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV53("p", { children: resolution }, void 0, !1, {
                  fileName: "app/components/feedback-card.tsx",
                  lineNumber: 165,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/feedback-card.tsx",
                lineNumber: 159,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 112,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/feedback-card.tsx",
            lineNumber: 110,
            columnNumber: 13
          }, this),
          Object.keys(meta2).length > 0 && /* @__PURE__ */ jsxDEV53("div", { className: "border-t", children: [
            /* @__PURE__ */ jsxDEV53("h3", { className: "my-2 font-medium", children: "Custom Data" }, void 0, !1, {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 172,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV53("div", { className: "grid grid-cols-1 gap-x-1 gap-y-2 md:grid-cols-2", children: Object.entries(meta2).map(([key, value]) => /* @__PURE__ */ jsxDEV53(MetaItem, { label: key, value }, key, !1, {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 175,
              columnNumber: 21
            }, this)) }, void 0, !1, {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 173,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/feedback-card.tsx",
            lineNumber: 171,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV53("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxDEV53(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  updateFeedbackStatus2.mutate({
                    id,
                    projectId,
                    status: status === "archived" /* archived */ ? "new" /* new */ : "archived" /* archived */
                  });
                },
                children: status === "archived" /* archived */ ? "Unarchive" : "Archive"
              },
              void 0,
              !1,
              {
                fileName: "app/components/feedback-card.tsx",
                lineNumber: 182,
                columnNumber: 15
              },
              this
            ),
            status === "new" /* new */ && /* @__PURE__ */ jsxDEV53(ReplyButton, { email: reportIdentifier }, void 0, !1, {
              fileName: "app/components/feedback-card.tsx",
              lineNumber: 199,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/feedback-card.tsx",
            lineNumber: 181,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/feedback-card.tsx",
          lineNumber: 109,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/feedback-card.tsx",
        lineNumber: 80,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/feedback-card.tsx",
      lineNumber: 69,
      columnNumber: 5
    },
    this
  );
}
var SessionIcon = (props) => /* @__PURE__ */ jsxDEV53(TooltipProvider, { children: /* @__PURE__ */ jsxDEV53(Tooltip, { delayDuration: 300, children: [
  /* @__PURE__ */ jsxDEV53(TooltipTrigger, { asChild: !0, children: props.children }, void 0, !1, {
    fileName: "app/components/feedback-card.tsx",
    lineNumber: 215,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV53(TooltipContent, { sideOffset: 5, children: props.tooltipDescription }, void 0, !1, {
    fileName: "app/components/feedback-card.tsx",
    lineNumber: 216,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/feedback-card.tsx",
  lineNumber: 214,
  columnNumber: 5
}, this) }, void 0, !1, {
  fileName: "app/components/feedback-card.tsx",
  lineNumber: 213,
  columnNumber: 3
}, this), MetaItem = (props) => {
  let value = props.value;
  if (Array.isArray(value)) {
    if (value.length === 0) {
      value = "Empty";
      return;
    }
    value = value.join(", ");
  }
  return typeof value == "object" && (value = JSON.stringify(value)), typeof value == "boolean" && (value = value.toString()), /* @__PURE__ */ jsxDEV53("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxDEV53("div", { className: "text-xs text-muted-foreground", children: props.label }, void 0, !1, {
      fileName: "app/components/feedback-card.tsx",
      lineNumber: 251,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV53("div", { className: "break-words", children: value }, void 0, !1, {
      fileName: "app/components/feedback-card.tsx",
      lineNumber: 252,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/feedback-card.tsx",
    lineNumber: 250,
    columnNumber: 5
  }, this);
}, ReplyButton = (props) => !props.email || !props.email.match(/.+@.+\..+/) ? null : /* @__PURE__ */ jsxDEV53(Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ jsxDEV53(Link12, { to: `mailto:${props.email}`, children: "Reply" }, void 0, !1, {
  fileName: "app/components/feedback-card.tsx",
  lineNumber: 270,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/feedback-card.tsx",
  lineNumber: 269,
  columnNumber: 5
}, this);

// app/components/feedback-empty-view.tsx
import { ChatBubbleIcon as ChatBubbleIcon4 } from "@radix-ui/react-icons";
import { Link as Link13 } from "@remix-run/react";
import { jsxDEV as jsxDEV54 } from "react/jsx-dev-runtime";
function FeedbackEmptyView() {
  return /* @__PURE__ */ jsxDEV54("div", { className: "flex h-max w-full flex-col items-center justify-center border border-dashed bg-accent/70 px-4 py-16 text-center dark:bg-accent/10", children: [
    /* @__PURE__ */ jsxDEV54(ChatBubbleIcon4, { className: "h-12 w-12" }, void 0, !1, {
      fileName: "app/components/feedback-empty-view.tsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV54("h3", { className: "mt-4 text-lg font-medium", children: "There is no feedback yet. " }, void 0, !1, {
      fileName: "app/components/feedback-empty-view.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV54("p", { className: "mt-2 text-muted-foreground", children: "Connect to widget and start collecting feedback." }, void 0, !1, {
      fileName: "app/components/feedback-empty-view.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV54(Button, { className: "mt-4", asChild: !0, children: /* @__PURE__ */ jsxDEV54(Link13, { to: "#", children: "Learn more" }, void 0, !1, {
      fileName: "app/components/feedback-empty-view.tsx",
      lineNumber: 14,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/feedback-empty-view.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/feedback-empty-view.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}

// app/components/feedback-filter-empty-view.tsx
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV55 } from "react/jsx-dev-runtime";
function FeedbackFilterEmptyView() {
  return /* @__PURE__ */ jsxDEV55("div", { className: "flex h-max w-full flex-col items-center border border-dashed bg-accent/70 px-4 py-16 text-center dark:bg-accent/10 ", children: [
    /* @__PURE__ */ jsxDEV55(MixerHorizontalIcon, { className: "h-6 w-6 text-muted-foreground" }, void 0, !1, {
      fileName: "app/components/feedback-filter-empty-view.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV55("p", { className: "mt-4 text-muted-foreground", children: "No feedbacks found for this filter." }, void 0, !1, {
      fileName: "app/components/feedback-filter-empty-view.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/feedback-filter-empty-view.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/feedback-list.tsx
import { jsxDEV as jsxDEV56 } from "react/jsx-dev-runtime";
var PAGE_SIZE = 10;
function FeedbackList() {
  let { ref, inView } = useInView(), [openedCardId, setOpenedCardId] = useState12(""), { projectId, filtersAndSorters, setCounts } = useFeedbackContext(), {
    data,
    isPending,
    isError,
    isStale,
    fetchNextPage,
    hasNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ["feedbacks", projectId, { ...filtersAndSorters }],
    queryFn: ({ pageParam }) => {
      let cursor = pageParam ?? "";
      return fetchers.getFeedbacks({
        projectId,
        cursor,
        take: PAGE_SIZE,
        ...filtersAndSorters.filters,
        orderBy: filtersAndSorters.sorters
      });
    },
    enabled: !!projectId,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? void 0,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? void 0,
    initialPageParam: ""
  });
  return useEffect8(() => {
    inView && fetchNextPage();
  }, [fetchNextPage, inView]), useEffect8(() => {
    status === "success" && !isStale && setCounts({
      all: data.pages[data.pages.length - 1].countAll,
      countNew: data.pages[data.pages.length - 1].countNew,
      issue: data.pages[data.pages.length - 1].countIssue,
      idea: data.pages[data.pages.length - 1].countIdea,
      other: data.pages[data.pages.length - 1].countOther,
      archive: data.pages[data.pages.length - 1].countArchived
    });
  }, [status, data, setCounts, isStale]), isError ? /* @__PURE__ */ jsxDEV56("p", { children: "Cound not load feedbacks" }, void 0, !1, {
    fileName: "app/components/feedback-list.tsx",
    lineNumber: 66,
    columnNumber: 23
  }, this) : isPending ? /* @__PURE__ */ jsxDEV56("div", { className: "flex w-full flex-col", children: [...Array(5)].map((_, index) => /* @__PURE__ */ jsxDEV56(FeedbackCardSkeleton, {}, index, !1, {
    fileName: "app/components/feedback-list.tsx",
    lineNumber: 72,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/components/feedback-list.tsx",
    lineNumber: 70,
    columnNumber: 7
  }, this) : data.pages[data.pages.length - 1].countAll === 0 ? /* @__PURE__ */ jsxDEV56(FeedbackEmptyView, {}, void 0, !1, {
    fileName: "app/components/feedback-list.tsx",
    lineNumber: 79,
    columnNumber: 12
  }, this) : data.pages[0].data.length === 0 ? /* @__PURE__ */ jsxDEV56(FeedbackFilterEmptyView, {}, void 0, !1, {
    fileName: "app/components/feedback-list.tsx",
    lineNumber: 81,
    columnNumber: 47
  }, this) : /* @__PURE__ */ jsxDEV56("div", { className: "flex w-full flex-col", children: [
    /* @__PURE__ */ jsxDEV56("div", { className: "mb-6", children: data.pages.map((page) => /* @__PURE__ */ jsxDEV56(Fragment7, { children: page.data.map((feedback) => /* @__PURE__ */ jsxDEV56(
      FeedbackCard,
      {
        openedCardId,
        setOpenedCardId,
        ...feedback
      },
      feedback.id,
      !1,
      {
        fileName: "app/components/feedback-list.tsx",
        lineNumber: 89,
        columnNumber: 15
      },
      this
    )) }, page.nextCursor, !1, {
      fileName: "app/components/feedback-list.tsx",
      lineNumber: 87,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/components/feedback-list.tsx",
      lineNumber: 85,
      columnNumber: 7
    }, this),
    hasNextPage && data.pages[data.pages.length - 1].countCurrent > PAGE_SIZE && /* @__PURE__ */ jsxDEV56("div", { ref, className: "mb-4 flex justify-center", children: /* @__PURE__ */ jsxDEV56(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
      fileName: "app/components/feedback-list.tsx",
      lineNumber: 102,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/feedback-list.tsx",
      lineNumber: 101,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/feedback-list.tsx",
    lineNumber: 84,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/feedbacks.tsx
import { jsxDEV as jsxDEV57 } from "react/jsx-dev-runtime";
function Feedbacks() {
  return /* @__PURE__ */ jsxDEV57(FeedbackProvider, { children: /* @__PURE__ */ jsxDEV57("div", { className: "bg-background", children: /* @__PURE__ */ jsxDEV57("div", { className: "container", children: /* @__PURE__ */ jsxDEV57("div", { className: "flex min-h-[calc(100vh-105px)] flex-wrap gap-8 pt-8 md:flex-nowrap", children: [
    /* @__PURE__ */ jsxDEV57(FeedbackSider, {}, void 0, !1, {
      fileName: "app/routes/dashboard/project/feedbacks.tsx",
      lineNumber: 11,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV57("h2", { className: "w-full text-center text-3xl tracking-wide md:hidden", children: "Feedback" }, void 0, !1, {
      fileName: "app/routes/dashboard/project/feedbacks.tsx",
      lineNumber: 12,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV57(FeedbackList, {}, void 0, !1, {
      fileName: "app/routes/dashboard/project/feedbacks.tsx",
      lineNumber: 15,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/project/feedbacks.tsx",
    lineNumber: 10,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard/project/feedbacks.tsx",
    lineNumber: 9,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard/project/feedbacks.tsx",
    lineNumber: 8,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/dashboard/project/feedbacks.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/team.tsx
var team_exports = {};
__export(team_exports, {
  default: () => Teams
});
import { useParams as useParams8 } from "@remix-run/react";
import { useQuery as useQuery5 } from "@tanstack/react-query";

// app/components/team-invite-modal.tsx
import { useState as useState13 } from "react";
import { useForm as useForm4 } from "react-hook-form";
import { useParams as useParams5 } from "@remix-run/react";
import { useMutation as useMutation8, useQueryClient as useQueryClient4 } from "@tanstack/react-query";

// app/components/ui/radio-group.tsx
import * as React19 from "react";
import { CheckIcon as CheckIcon6 } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { jsxDEV as jsxDEV58 } from "react/jsx-dev-runtime";
var RadioGroup3 = React19.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV58(
  RadioGroupPrimitive.Root,
  {
    className: cn("grid gap-2", className),
    ...props,
    ref
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/radio-group.tsx",
    lineNumber: 12,
    columnNumber: 5
  },
  this
));
RadioGroup3.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React19.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV58(
  RadioGroupPrimitive.Item,
  {
    ref,
    className: cn(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDEV58(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxDEV58(CheckIcon6, { className: "h-3.5 w-3.5 fill-primary" }, void 0, !1, {
      fileName: "app/components/ui/radio-group.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/ui/radio-group.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/radio-group.tsx",
    lineNumber: 26,
    columnNumber: 5
  },
  this
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// app/lib/constants/roles.ts
var ROLES = [
  {
    value: "member" /* member */,
    name: "Member",
    description: "Can view the project and its feedback."
  },
  {
    value: "manager" /* manager */,
    name: "Manager",
    description: "Can add/remove members and change roles."
  },
  {
    value: "owner" /* owner */,
    name: "Owner",
    description: "Can add/remove members, change roles, and delete the project."
  }
];

// app/components/team-invite-modal.tsx
import { jsxDEV as jsxDEV59 } from "react/jsx-dev-runtime";
function TeamInviteModal() {
  let { projectId } = useParams5();
  if (!projectId)
    throw new Error("Project ID is required");
  let [open, setOpen] = useState13(!1), queryClient = useQueryClient4(), { toast: toast2 } = useToast(), form = useForm4({
    defaultValues: {
      email: "",
      role: "member"
    }
  }), { data: user } = useMe(), userRoleOnProject = user?.projects.find(
    (project) => project.id === projectId
  )?.role, inviteUser = useMutation8({
    mutationFn: (variables) => fetchers.inviteMember(projectId, variables),
    onSuccess: () => {
      form.reset(), setOpen(!1), queryClient.invalidateQueries({
        queryKey: ["team", projectId]
      });
    },
    onError: (error) => {
      let description;
      typeof error.response?.data.message == "string" && (description = error.response?.data.message), Array.isArray(error.response?.data.message) && (description = /* @__PURE__ */ jsxDEV59("div", { className: "flex flex-col", children: error.response?.data.message.map((message) => /* @__PURE__ */ jsxDEV59("p", { children: message }, message, !1, {
        fileName: "app/components/team-invite-modal.tsx",
        lineNumber: 79,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/components/team-invite-modal.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this)), toast2({
        title: "Error",
        description
      });
    }
  }), onSubmit = (values) => {
    inviteUser.mutate(values);
  }, inviteMemberButtonProps = {
    disabled: userRoleOnProject === "member" /* member */,
    title: userRoleOnProject === "member" /* member */ ? "You must be an owner or manager to invite members" : "Invite a member"
  };
  return /* @__PURE__ */ jsxDEV59(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxDEV59(DialogTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV59(Button, { ...inviteMemberButtonProps, children: "Invite Member" }, void 0, !1, {
      fileName: "app/components/team-invite-modal.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/team-invite-modal.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV59(DialogContent, { children: [
      /* @__PURE__ */ jsxDEV59(DialogHeader, { children: [
        /* @__PURE__ */ jsxDEV59(DialogTitle, { children: "Invite your team members" }, void 0, !1, {
          fileName: "app/components/team-invite-modal.tsx",
          lineNumber: 111,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV59(DialogDescription, { children: "They will receive an email invitation to join the project." }, void 0, !1, {
          fileName: "app/components/team-invite-modal.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-invite-modal.tsx",
        lineNumber: 110,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV59(Separator, {}, void 0, !1, {
        fileName: "app/components/team-invite-modal.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV59(Form, { ...form, children: /* @__PURE__ */ jsxDEV59("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV59(
          FormField,
          {
            control: form.control,
            name: "email",
            render: ({ field }) => /* @__PURE__ */ jsxDEV59(FormItem, { children: [
              /* @__PURE__ */ jsxDEV59(FormLabel, { children: "Email" }, void 0, !1, {
                fileName: "app/components/team-invite-modal.tsx",
                lineNumber: 124,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV59(FormControl, { children: /* @__PURE__ */ jsxDEV59(
                Input,
                {
                  placeholder: "someone@example.com",
                  required: !0,
                  type: "email",
                  autoComplete: "off",
                  ...field
                },
                void 0,
                !1,
                {
                  fileName: "app/components/team-invite-modal.tsx",
                  lineNumber: 126,
                  columnNumber: 21
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/team-invite-modal.tsx",
                lineNumber: 125,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV59(FormMessage, {}, void 0, !1, {
                fileName: "app/components/team-invite-modal.tsx",
                lineNumber: 134,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/team-invite-modal.tsx",
              lineNumber: 123,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/team-invite-modal.tsx",
            lineNumber: 119,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV59(
          FormField,
          {
            control: form.control,
            name: "role",
            render: ({ field }) => /* @__PURE__ */ jsxDEV59(FormItem, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxDEV59(FormLabel, { children: "Role" }, void 0, !1, {
                fileName: "app/components/team-invite-modal.tsx",
                lineNumber: 144,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV59(FormControl, { children: /* @__PURE__ */ jsxDEV59(
                RadioGroup3,
                {
                  onValueChange: field.onChange,
                  defaultValue: field.value,
                  className: "gap-4",
                  children: ROLES.map((role) => {
                    let disabled = role.value === "owner" /* owner */ && userRoleOnProject !== "owner" /* owner */;
                    return /* @__PURE__ */ jsxDEV59(
                      FormItem,
                      {
                        className: "flex space-x-3 space-y-0",
                        children: [
                          /* @__PURE__ */ jsxDEV59(FormControl, { children: /* @__PURE__ */ jsxDEV59(
                            RadioGroupItem,
                            {
                              id: role.value,
                              disabled,
                              value: role.value
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/team-invite-modal.tsx",
                              lineNumber: 162,
                              columnNumber: 31
                            },
                            this
                          ) }, void 0, !1, {
                            fileName: "app/components/team-invite-modal.tsx",
                            lineNumber: 161,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV59(
                            FormLabel,
                            {
                              className: cn("font-normal", {
                                "text-muted-foreground": disabled,
                                "opacity-70": disabled
                              }),
                              htmlFor: role.value,
                              children: [
                                /* @__PURE__ */ jsxDEV59("div", { className: "mb-1 leading-none", children: role.name }, void 0, !1, {
                                  fileName: "app/components/team-invite-modal.tsx",
                                  lineNumber: 175,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV59("p", { className: "text-xs text-muted-foreground", children: role.description }, void 0, !1, {
                                  fileName: "app/components/team-invite-modal.tsx",
                                  lineNumber: 178,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            !0,
                            {
                              fileName: "app/components/team-invite-modal.tsx",
                              lineNumber: 168,
                              columnNumber: 29
                            },
                            this
                          )
                        ]
                      },
                      role.value,
                      !0,
                      {
                        fileName: "app/components/team-invite-modal.tsx",
                        lineNumber: 157,
                        columnNumber: 27
                      },
                      this
                    );
                  })
                },
                void 0,
                !1,
                {
                  fileName: "app/components/team-invite-modal.tsx",
                  lineNumber: 146,
                  columnNumber: 21
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/team-invite-modal.tsx",
                lineNumber: 145,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV59(FormMessage, {}, void 0, !1, {
                fileName: "app/components/team-invite-modal.tsx",
                lineNumber: 187,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/team-invite-modal.tsx",
              lineNumber: 143,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/team-invite-modal.tsx",
            lineNumber: 139,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV59(DialogFooter, { children: [
          /* @__PURE__ */ jsxDEV59(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                setOpen(!1);
              },
              children: "Cancel"
            },
            void 0,
            !1,
            {
              fileName: "app/components/team-invite-modal.tsx",
              lineNumber: 193,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV59(Button, { type: "submit", disabled: inviteUser.isPending, children: [
            inviteUser.isPending && /* @__PURE__ */ jsxDEV59(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
              fileName: "app/components/team-invite-modal.tsx",
              lineNumber: 203,
              columnNumber: 42
            }, this),
            "Invite"
          ] }, void 0, !0, {
            fileName: "app/components/team-invite-modal.tsx",
            lineNumber: 202,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/team-invite-modal.tsx",
          lineNumber: 192,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-invite-modal.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/components/team-invite-modal.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-invite-modal.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/team-invite-modal.tsx",
    lineNumber: 105,
    columnNumber: 5
  }, this);
}

// app/components/team-skeleton.tsx
import { jsxDEV as jsxDEV60 } from "react/jsx-dev-runtime";
function TeamSkeleton() {
  return /* @__PURE__ */ jsxDEV60("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxDEV60("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-5 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 7,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-6 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 8,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-6 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-6 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 10,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-skeleton.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV60("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-5 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-6 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-6 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV60(Skeleton, { className: "h-6 w-full" }, void 0, !1, {
        fileName: "app/components/team-skeleton.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-skeleton.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/team-skeleton.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/team-member-actions.tsx
import { useState as useState14 } from "react";
import { useParams as useParams6 } from "@remix-run/react";
import { useMutation as useMutation9, useQueryClient as useQueryClient5 } from "@tanstack/react-query";
import { useForm as useForm5 } from "react-hook-form";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// app/components/ui/alert-dialog.tsx
import * as React20 from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { jsxDEV as jsxDEV61 } from "react/jsx-dev-runtime";
var AlertDialog = AlertDialogPrimitive.Root, AlertDialogTrigger = AlertDialogPrimitive.Trigger, AlertDialogPortal = AlertDialogPrimitive.Portal, AlertDialogOverlay = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV61(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 17,
    columnNumber: 3
  },
  this
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV61(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxDEV61(AlertDialogOverlay, {}, void 0, !1, {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV61(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/alert-dialog.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/ui/alert-dialog.tsx",
  lineNumber: 32,
  columnNumber: 3
}, this));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV61(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 50,
    columnNumber: 3
  },
  this
);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV61(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 64,
    columnNumber: 3
  },
  this
);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV61(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 78,
    columnNumber: 3
  },
  this
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV61(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 90,
    columnNumber: 3
  },
  this
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV61(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 103,
    columnNumber: 3
  },
  this
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV61(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/alert-dialog.tsx",
    lineNumber: 115,
    columnNumber: 3
  },
  this
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// app/components/team-member-actions.tsx
import { Fragment as Fragment8, jsxDEV as jsxDEV62 } from "react/jsx-dev-runtime";
function TeamMemberActions({ member }) {
  let { projectId } = useParams6();
  if (!projectId)
    throw new Error("Project ID is required");
  let [open, setOpen] = useState14(!1), [showDeleteDialog, setShowDeleteDialog] = useState14(!1), queryClient = useQueryClient5(), removeMember = useMutation9({
    mutationFn: ({ memberId }) => fetchers.deleteMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", projectId] }), setShowDeleteDialog(!1);
    }
  }), form = useForm5({
    defaultValues: {
      role: member.role
    }
  }), onSubmit = (values) => {
    console.log("values", values);
  }, { data: user } = useMe(), userRoleOnProject = user?.projects.find((project) => project.id === projectId)?.role ?? "member", isMember = userRoleOnProject === "member" /* member */, isManager = userRoleOnProject === "manager" /* manager */, isCurrentUser = user?.id === member.id;
  return /* @__PURE__ */ jsxDEV62(Fragment8, { children: [
    /* @__PURE__ */ jsxDEV62(DropdownMenu, { children: [
      /* @__PURE__ */ jsxDEV62(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV62(
        Button,
        {
          variant: "ghost",
          size: "icon",
          title: "Actions",
          disabled: isMember || isManager && member.role === "owner" /* owner */ || isCurrentUser,
          children: [
            /* @__PURE__ */ jsxDEV62("span", { className: "sr-only", children: "Actions" }, void 0, !1, {
              fileName: "app/components/team-member-actions.tsx",
              lineNumber: 103,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV62(DotsHorizontalIcon, { className: "h-4 w-4" }, void 0, !1, {
              fileName: "app/components/team-member-actions.tsx",
              lineNumber: 104,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 93,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV62(DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ jsxDEV62(DropdownMenuItem, { onSelect: () => setOpen(!0), children: "Change role" }, void 0, !1, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 108,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV62(
          DropdownMenuItem,
          {
            onSelect: () => setShowDeleteDialog(!0),
            className: "text-red",
            children: "Remove from project"
          },
          void 0,
          !1,
          {
            fileName: "app/components/team-member-actions.tsx",
            lineNumber: 111,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-member-actions.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV62(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxDEV62(DialogContent, { children: [
      /* @__PURE__ */ jsxDEV62(DialogHeader, { children: [
        /* @__PURE__ */ jsxDEV62(DialogTitle, { children: [
          "Change ",
          member.fullName,
          "'s role on this project"
        ] }, void 0, !0, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV62(DialogDescription, { children: "This will change the permissions of this person on this project." }, void 0, !1, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 121,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV62(Separator, {}, void 0, !1, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV62(Form, { ...form, children: /* @__PURE__ */ jsxDEV62("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV62(
          FormField,
          {
            control: form.control,
            name: "role",
            render: ({ field }) => /* @__PURE__ */ jsxDEV62(FormItem, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxDEV62(FormLabel, { children: "Role" }, void 0, !1, {
                fileName: "app/components/team-member-actions.tsx",
                lineNumber: 137,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV62(FormControl, { children: /* @__PURE__ */ jsxDEV62(
                RadioGroup3,
                {
                  onValueChange: field.onChange,
                  defaultValue: field.value,
                  className: "gap-4",
                  children: ROLES.map((role) => {
                    let disabled = role.value === "owner" /* owner */ && isManager;
                    return /* @__PURE__ */ jsxDEV62(
                      FormItem,
                      {
                        className: "flex space-x-3 space-y-0",
                        children: [
                          /* @__PURE__ */ jsxDEV62(FormControl, { children: /* @__PURE__ */ jsxDEV62(
                            RadioGroupItem,
                            {
                              id: role.value,
                              disabled,
                              value: role.value
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/team-member-actions.tsx",
                              lineNumber: 154,
                              columnNumber: 33
                            },
                            this
                          ) }, void 0, !1, {
                            fileName: "app/components/team-member-actions.tsx",
                            lineNumber: 153,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV62(
                            FormLabel,
                            {
                              className: cn("font-normal", {
                                "text-muted-foreground": disabled,
                                "opacity-70": disabled
                              }),
                              htmlFor: role.value,
                              children: [
                                /* @__PURE__ */ jsxDEV62("div", { className: "mb-1 leading-none", children: role.name }, void 0, !1, {
                                  fileName: "app/components/team-member-actions.tsx",
                                  lineNumber: 167,
                                  columnNumber: 33
                                }, this),
                                /* @__PURE__ */ jsxDEV62("p", { className: "text-xs text-muted-foreground", children: role.description }, void 0, !1, {
                                  fileName: "app/components/team-member-actions.tsx",
                                  lineNumber: 170,
                                  columnNumber: 33
                                }, this)
                              ]
                            },
                            void 0,
                            !0,
                            {
                              fileName: "app/components/team-member-actions.tsx",
                              lineNumber: 160,
                              columnNumber: 31
                            },
                            this
                          )
                        ]
                      },
                      role.value,
                      !0,
                      {
                        fileName: "app/components/team-member-actions.tsx",
                        lineNumber: 149,
                        columnNumber: 29
                      },
                      this
                    );
                  })
                },
                void 0,
                !1,
                {
                  fileName: "app/components/team-member-actions.tsx",
                  lineNumber: 139,
                  columnNumber: 23
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/team-member-actions.tsx",
                lineNumber: 138,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV62(FormMessage, {}, void 0, !1, {
                fileName: "app/components/team-member-actions.tsx",
                lineNumber: 179,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/team-member-actions.tsx",
              lineNumber: 136,
              columnNumber: 19
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/team-member-actions.tsx",
            lineNumber: 132,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV62(DialogFooter, { children: [
          /* @__PURE__ */ jsxDEV62(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                setOpen(!1);
              },
              children: "Cancel"
            },
            void 0,
            !1,
            {
              fileName: "app/components/team-member-actions.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV62(Button, { type: "submit", children: "Change Role" }, void 0, !1, {
            fileName: "app/components/team-member-actions.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 184,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 131,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 130,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-member-actions.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/team-member-actions.tsx",
      lineNumber: 119,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV62(AlertDialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: /* @__PURE__ */ jsxDEV62(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxDEV62(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxDEV62(AlertDialogTitle, { children: [
          "Remove ",
          member.fullName,
          " from this project?"
        ] }, void 0, !0, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV62(AlertDialogDescription, { children: "This action cannot be undone. This person will no longer have access to this project." }, void 0, !1, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 202,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV62(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxDEV62(AlertDialogCancel, { children: "Cancel" }, void 0, !1, {
          fileName: "app/components/team-member-actions.tsx",
          lineNumber: 212,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV62(
          Button,
          {
            variant: "destructive",
            disabled: removeMember.isPending,
            onClick: () => {
              removeMember.mutate({ memberId: member.id });
            },
            children: [
              removeMember.isPending && /* @__PURE__ */ jsxDEV62(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
                fileName: "app/components/team-member-actions.tsx",
                lineNumber: 220,
                columnNumber: 42
              }, this),
              "Remove"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/team-member-actions.tsx",
            lineNumber: 213,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/team-member-actions.tsx",
        lineNumber: 211,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-member-actions.tsx",
      lineNumber: 201,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/team-member-actions.tsx",
      lineNumber: 200,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/team-member-actions.tsx",
    lineNumber: 90,
    columnNumber: 5
  }, this);
}

// app/components/ui/table.tsx
import * as React21 from "react";
import { jsxDEV as jsxDEV63 } from "react/jsx-dev-runtime";
var Table = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxDEV63(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 10,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/table.tsx",
  lineNumber: 9,
  columnNumber: 3
}, this));
Table.displayName = "Table";
var TableHeader = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }, void 0, !1, {
  fileName: "app/components/ui/table.tsx",
  lineNumber: 23,
  columnNumber: 3
}, this));
TableHeader.displayName = "TableHeader";
var TableBody = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 31,
    columnNumber: 3
  },
  this
));
TableBody.displayName = "TableBody";
var TableFooter = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 43,
    columnNumber: 3
  },
  this
));
TableFooter.displayName = "TableFooter";
var TableRow = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 58,
    columnNumber: 3
  },
  this
));
TableRow.displayName = "TableRow";
var TableHead = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 73,
    columnNumber: 3
  },
  this
));
TableHead.displayName = "TableHead";
var TableCell = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 88,
    columnNumber: 3
  },
  this
));
TableCell.displayName = "TableCell";
var TableCaption = React21.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV63(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/table.tsx",
    lineNumber: 103,
    columnNumber: 3
  },
  this
));
TableCaption.displayName = "TableCaption";

// app/components/team-member-table.tsx
import { jsxDEV as jsxDEV64 } from "react/jsx-dev-runtime";
function TeamMemberTable({ members }) {
  return /* @__PURE__ */ jsxDEV64(Table, { children: /* @__PURE__ */ jsxDEV64(TableBody, { children: members.map((member) => /* @__PURE__ */ jsxDEV64(TableRow, { children: [
    /* @__PURE__ */ jsxDEV64(TableCell, { children: /* @__PURE__ */ jsxDEV64("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxDEV64(Avatar, { children: [
        /* @__PURE__ */ jsxDEV64(
          AvatarImage,
          {
            src: member.avatarUrl,
            alt: `${member.fullName}`
          },
          void 0,
          !1,
          {
            fileName: "app/components/team-member-table.tsx",
            lineNumber: 15,
            columnNumber: 19
          },
          this
        ),
        /* @__PURE__ */ jsxDEV64(AvatarFallback, { children: `${member.fullName}` }, void 0, !1, {
          fileName: "app/components/team-member-table.tsx",
          lineNumber: 19,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-member-table.tsx",
        lineNumber: 14,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV64("div", { children: [
        /* @__PURE__ */ jsxDEV64("p", { className: "font-medium leading-none", children: `${member.fullName}` }, void 0, !1, {
          fileName: "app/components/team-member-table.tsx",
          lineNumber: 22,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV64("p", { className: "text-muted-foreground", children: member.email }, void 0, !1, {
          fileName: "app/components/team-member-table.tsx",
          lineNumber: 25,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-member-table.tsx",
        lineNumber: 21,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-member-table.tsx",
      lineNumber: 13,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/team-member-table.tsx",
      lineNumber: 12,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV64(TableCell, { className: "w-20 capitalize text-muted-foreground", children: member.role }, void 0, !1, {
      fileName: "app/components/team-member-table.tsx",
      lineNumber: 29,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV64(TableCell, { className: "w-9 text-right", children: /* @__PURE__ */ jsxDEV64(TeamMemberActions, { member }, void 0, !1, {
      fileName: "app/components/team-member-table.tsx",
      lineNumber: 33,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/team-member-table.tsx",
      lineNumber: 32,
      columnNumber: 13
    }, this)
  ] }, member.id, !0, {
    fileName: "app/components/team-member-table.tsx",
    lineNumber: 11,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/components/team-member-table.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/team-member-table.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/components/team-invite-actions.tsx
import { useState as useState15 } from "react";
import { useMutation as useMutation10, useQueryClient as useQueryClient6 } from "@tanstack/react-query";
import { useParams as useParams7 } from "@remix-run/react";
import { DotsHorizontalIcon as DotsHorizontalIcon2 } from "@radix-ui/react-icons";
import { Fragment as Fragment9, jsxDEV as jsxDEV65 } from "react/jsx-dev-runtime";
function TeamInviteActions({ invite }) {
  let { projectId } = useParams7();
  if (!projectId)
    throw new Error("Project ID is required");
  let [open, setIsOpen] = useState15(!1), queryClient = useQueryClient6(), cancelInvite2 = useMutation10({
    mutationFn: ({ inviteId }) => fetchers.cancelInvite(projectId, inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", projectId] }), setIsOpen(!1);
    }
  }), { data: user } = useMe(), isMember = user?.projects.find(
    (project) => project.id === projectId
  )?.role === "member" /* member */;
  return /* @__PURE__ */ jsxDEV65(Fragment9, { children: [
    /* @__PURE__ */ jsxDEV65(DropdownMenu, { children: [
      /* @__PURE__ */ jsxDEV65(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV65(
        Button,
        {
          variant: "ghost",
          size: "icon",
          title: "Actions",
          disabled: isMember,
          children: [
            /* @__PURE__ */ jsxDEV65("span", { className: "sr-only", children: "Actions" }, void 0, !1, {
              fileName: "app/components/team-invite-actions.tsx",
              lineNumber: 63,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV65(DotsHorizontalIcon2, { className: "h-4 w-4" }, void 0, !1, {
              fileName: "app/components/team-invite-actions.tsx",
              lineNumber: 64,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/team-invite-actions.tsx",
          lineNumber: 57,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/team-invite-actions.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV65(DropdownMenuContent, { align: "end", children: /* @__PURE__ */ jsxDEV65(
        DropdownMenuItem,
        {
          onSelect: () => setIsOpen(!0),
          className: "text-red",
          children: "Cancel invite"
        },
        void 0,
        !1,
        {
          fileName: "app/components/team-invite-actions.tsx",
          lineNumber: 68,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/team-invite-actions.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-invite-actions.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV65(AlertDialog, { open, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxDEV65(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxDEV65(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxDEV65(AlertDialogTitle, { children: [
          "Cancel invite for ",
          invite.email,
          "?"
        ] }, void 0, !0, {
          fileName: "app/components/team-invite-actions.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV65(AlertDialogDescription, { children: "This invite will be canceled and the user will not be able to join the project." }, void 0, !1, {
          fileName: "app/components/team-invite-actions.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/team-invite-actions.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV65(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxDEV65(AlertDialogCancel, { children: "Close" }, void 0, !1, {
          fileName: "app/components/team-invite-actions.tsx",
          lineNumber: 88,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV65(
          Button,
          {
            variant: "destructive",
            disabled: cancelInvite2.isPending,
            onClick: () => {
              cancelInvite2.mutate({ inviteId: invite.id });
            },
            children: [
              cancelInvite2.isPending && /* @__PURE__ */ jsxDEV65(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
                fileName: "app/components/team-invite-actions.tsx",
                lineNumber: 96,
                columnNumber: 42
              }, this),
              "Cancel Invite"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/team-invite-actions.tsx",
            lineNumber: 89,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/team-invite-actions.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/team-invite-actions.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/team-invite-actions.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/team-invite-actions.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}

// app/components/team-invite-table.tsx
import { jsxDEV as jsxDEV66 } from "react/jsx-dev-runtime";
function TeamInviteTable({
  invites
}) {
  return invites.length === 0 ? /* @__PURE__ */ jsxDEV66("div", { className: "py-3 text-center", children: /* @__PURE__ */ jsxDEV66("p", { className: "text-muted-foreground", children: "No invites yet." }, void 0, !1, {
    fileName: "app/components/team-invite-table.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/team-invite-table.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV66(Table, { children: /* @__PURE__ */ jsxDEV66(TableBody, { children: invites.map((invite) => /* @__PURE__ */ jsxDEV66(TableRow, { children: [
    /* @__PURE__ */ jsxDEV66(TableCell, { children: invite.email }, void 0, !1, {
      fileName: "app/components/team-invite-table.tsx",
      lineNumber: 24,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV66(TableCell, { className: "w-20 capitalize text-muted-foreground", children: invite.role }, void 0, !1, {
      fileName: "app/components/team-invite-table.tsx",
      lineNumber: 25,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV66(TableCell, { className: "w-16 text-muted-foreground", children: /* @__PURE__ */ jsxDEV66(
      "div",
      {
        className: cn(
          "inline-flex select-none items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",
          {
            "bg-amber-foreground text-amber": invite.state === "pending" /* Pending */,
            "bg-red-foreground text-red": invite.state === "rejected" /* Rejected */,
            "bg-green-foreground text-green": invite.state === "accepted" /* Accepted */
          }
        ),
        children: invite.state
      },
      void 0,
      !1,
      {
        fileName: "app/components/team-invite-table.tsx",
        lineNumber: 29,
        columnNumber: 15
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/team-invite-table.tsx",
      lineNumber: 28,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV66(TableCell, { className: "w-9 text-right", children: /* @__PURE__ */ jsxDEV66(TeamInviteActions, { invite }, void 0, !1, {
      fileName: "app/components/team-invite-table.tsx",
      lineNumber: 46,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/components/team-invite-table.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this)
  ] }, invite.id, !0, {
    fileName: "app/components/team-invite-table.tsx",
    lineNumber: 23,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/components/team-invite-table.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/team-invite-table.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/team.tsx
import { Fragment as Fragment10, jsxDEV as jsxDEV67 } from "react/jsx-dev-runtime";
function Teams() {
  let { projectId } = useParams8();
  if (!projectId)
    throw new Error("Project ID is required");
  let team = useQuery5({
    queryKey: ["team", projectId],
    queryFn: () => fetchers.getProjectTeam(projectId)
  });
  return team.isError ? /* @__PURE__ */ jsxDEV67("p", { children: "Could not load team" }, void 0, !1, {
    fileName: "app/routes/dashboard/project/team.tsx",
    lineNumber: 20,
    columnNumber: 28
  }, this) : /* @__PURE__ */ jsxDEV67(Fragment10, { children: [
    /* @__PURE__ */ jsxDEV67("div", { className: "container flex flex-wrap items-center justify-between gap-4 py-8", children: [
      /* @__PURE__ */ jsxDEV67("div", { children: [
        /* @__PURE__ */ jsxDEV67("h2", { className: "text-3xl tracking-wide", children: "Team" }, void 0, !1, {
          fileName: "app/routes/dashboard/project/team.tsx",
          lineNumber: 26,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV67("p", { className: "mt-1 text-muted-foreground", children: "Manage and invite team members." }, void 0, !1, {
          fileName: "app/routes/dashboard/project/team.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/project/team.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV67(TeamInviteModal, {}, void 0, !1, {
        fileName: "app/routes/dashboard/project/team.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV67(Separator, { className: "mb-6" }, void 0, !1, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV67("div", { className: "container", children: /* @__PURE__ */ jsxDEV67("div", { className: "mb-6 rounded-lg border p-2 md:p-12", children: /* @__PURE__ */ jsxDEV67("div", { className: "m-auto max-w-[500px] space-y-8", children: team.isPending ? /* @__PURE__ */ jsxDEV67(TeamSkeleton, {}, void 0, !1, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 38,
      columnNumber: 15
    }, this) : /* @__PURE__ */ jsxDEV67(Fragment10, { children: [
      /* @__PURE__ */ jsxDEV67("div", { className: "rounded-sm border", children: [
        /* @__PURE__ */ jsxDEV67("h3", { className: "bg-accent py-2 pl-4 font-semibold text-muted-foreground", children: "Members" }, void 0, !1, {
          fileName: "app/routes/dashboard/project/team.tsx",
          lineNumber: 42,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV67(TeamMemberTable, { members: team.data.members }, void 0, !1, {
          fileName: "app/routes/dashboard/project/team.tsx",
          lineNumber: 45,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/project/team.tsx",
        lineNumber: 41,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV67("div", { className: "rounded-sm border", children: [
        /* @__PURE__ */ jsxDEV67("h3", { className: "bg-accent py-2 pl-4 font-semibold text-muted-foreground", children: "Invites" }, void 0, !1, {
          fileName: "app/routes/dashboard/project/team.tsx",
          lineNumber: 48,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV67(TeamInviteTable, { invites: team.data.invites }, void 0, !1, {
          fileName: "app/routes/dashboard/project/team.tsx",
          lineNumber: 51,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/project/team.tsx",
        lineNumber: 47,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 40,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 36,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/project/team.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/project/team.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/project/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  default: () => Settings
});
import { useEffect as useEffect9 } from "react";
import { useNavigate as useNavigate7, useParams as useParams9 } from "@remix-run/react";
import { useForm as useForm6 } from "react-hook-form";
import { useQueryClient as useQueryClient7, useMutation as useMutation11, useQuery as useQuery6 } from "@tanstack/react-query";
import { Fragment as Fragment11, jsxDEV as jsxDEV68 } from "react/jsx-dev-runtime";
function Settings() {
  let { projectId } = useParams9();
  if (!projectId)
    throw new Error("Project ID is required");
  let navigate = useNavigate7(), queryClient = useQueryClient7(), form = useForm6({
    defaultValues: {
      id: projectId,
      name: ""
    }
  }), project = useQuery6({
    queryKey: ["project", projectId],
    queryFn: () => fetchers.getProject(projectId),
    enabled: !!projectId
  });
  useEffect9(() => {
    project.data && form.reset(project.data);
  }, [project.data, form]);
  let updateMutation = useMutation11({
    mutationFn: (variables) => fetchers.updateProject(projectId, variables),
    onSuccess: (data) => {
      queryClient.setQueryData(["project", projectId], data), queryClient.setQueryData(["projects"], (projects) => {
        if (!projects)
          return;
        let index = projects.findIndex((p) => p.id === projectId);
        return index === -1 ? projects : [
          ...projects.slice(0, index),
          { ...projects[index], name: data.name },
          ...projects.slice(index + 1)
        ];
      }), form.reset(data);
    }
  }), deleteMutation = useMutation11({
    mutationFn: () => fetchers.deleteProject(projectId),
    onSuccess: () => {
      queryClient.setQueryData(["projects"], (projects) => {
        if (!projects)
          return;
        let index = projects.findIndex((p) => p.id === projectId);
        return index === -1 ? projects : [...projects.slice(0, index), ...projects.slice(index + 1)];
      });
    }
  });
  useEffect9(() => {
    deleteMutation.isSuccess && navigate("/dashboard");
  }, [deleteMutation.isSuccess, navigate]);
  let { data: user } = useMe(), userRoleOnProject = user?.projects.find(
    (project2) => project2.id === projectId
  )?.role, isMember = userRoleOnProject === "member" /* member */, isManager = userRoleOnProject === "manager" /* manager */, onSubmit = (variables) => {
    updateMutation.mutate({ name: variables.name.trim() });
  };
  return /* @__PURE__ */ jsxDEV68(Fragment11, { children: [
    /* @__PURE__ */ jsxDEV68("div", { className: "container py-10 pb-4", children: /* @__PURE__ */ jsxDEV68("h2", { className: "text-3xl tracking-wide", children: "Project Settings" }, void 0, !1, {
      fileName: "app/routes/dashboard/project/settings.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/project/settings.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV68(Separator, { className: "my-6" }, void 0, !1, {
      fileName: "app/routes/dashboard/project/settings.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV68("div", { className: "container mb-6", children: [
      /* @__PURE__ */ jsxDEV68(Form, { ...form, children: /* @__PURE__ */ jsxDEV68("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [
        /* @__PURE__ */ jsxDEV68(
          FormField,
          {
            control: form.control,
            name: "id",
            render: ({ field }) => /* @__PURE__ */ jsxDEV68(FormItem, { children: [
              /* @__PURE__ */ jsxDEV68(FormLabel, { children: "Project ID" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 132,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV68(FormDescription, { children: "Used when interacting with the widget." }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 133,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV68("div", { className: "relative max-w-[400px]", children: [
                /* @__PURE__ */ jsxDEV68(FormControl, { children: /* @__PURE__ */ jsxDEV68(Input, { ...field, disabled: !0 }, void 0, !1, {
                  fileName: "app/routes/dashboard/project/settings.tsx",
                  lineNumber: 138,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/routes/dashboard/project/settings.tsx",
                  lineNumber: 137,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV68(
                  CopyButton,
                  {
                    className: "absolute right-0 top-0",
                    value: projectId
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/dashboard/project/settings.tsx",
                    lineNumber: 140,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 136,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard/project/settings.tsx",
              lineNumber: 131,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/dashboard/project/settings.tsx",
            lineNumber: 127,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV68(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxDEV68(FormItem, { children: [
              /* @__PURE__ */ jsxDEV68(FormLabel, { children: "Project Name" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 153,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV68(FormDescription, { children: "Used to identify your Project on the Dashboard." }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 154,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV68("div", { className: "w-[300px]", children: project.isPending ? /* @__PURE__ */ jsxDEV68(Skeleton, { className: "h-9 w-full" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 159,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDEV68(FormControl, { children: /* @__PURE__ */ jsxDEV68(
                Input,
                {
                  ...field,
                  autoComplete: "false",
                  disabled: isMember || isManager
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/dashboard/project/settings.tsx",
                  lineNumber: 162,
                  columnNumber: 25
                },
                this
              ) }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 161,
                columnNumber: 23
              }, this) }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 157,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV68(FormMessage, {}, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 170,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard/project/settings.tsx",
              lineNumber: 152,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/dashboard/project/settings.tsx",
            lineNumber: 148,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV68(
          Button,
          {
            type: "submit",
            size: "sm",
            disabled: updateMutation.isPending || isMember || isManager,
            children: [
              updateMutation.isPending ? /* @__PURE__ */ jsxDEV68(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 180,
                columnNumber: 17
              }, this) : null,
              "Save"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/dashboard/project/settings.tsx",
            lineNumber: 174,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/project/settings.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/dashboard/project/settings.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV68(Separator, { className: "my-6" }, void 0, !1, {
        fileName: "app/routes/dashboard/project/settings.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV68("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV68("h3", { className: "text-sm font-medium", children: "Delete Project" }, void 0, !1, {
          fileName: "app/routes/dashboard/project/settings.tsx",
          lineNumber: 188,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV68("p", { className: "text-[0.8rem] text-muted-foreground", children: "The project will be permanently deleted, including its feedback. This action is irreversible and can not be undone." }, void 0, !1, {
          fileName: "app/routes/dashboard/project/settings.tsx",
          lineNumber: 189,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV68(AlertDialog, { children: [
          /* @__PURE__ */ jsxDEV68(AlertDialogTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV68(
            Button,
            {
              variant: "destructive",
              size: "sm",
              disabled: isMember || isManager,
              children: "Delete"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/dashboard/project/settings.tsx",
              lineNumber: 195,
              columnNumber: 15
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/dashboard/project/settings.tsx",
            lineNumber: 194,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV68(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxDEV68(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxDEV68(AlertDialogTitle, { children: "Delete Project" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 205,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV68(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your project and all its feedback." }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 206,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard/project/settings.tsx",
              lineNumber: 204,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV68(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxDEV68(AlertDialogCancel, { children: "Cancel" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 212,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV68(AlertDialogAction, { onClick: () => deleteMutation.mutate(), children: "Continue" }, void 0, !1, {
                fileName: "app/routes/dashboard/project/settings.tsx",
                lineNumber: 213,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/dashboard/project/settings.tsx",
              lineNumber: 211,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard/project/settings.tsx",
            lineNumber: 203,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard/project/settings.tsx",
          lineNumber: 193,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/project/settings.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard/project/settings.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/project/settings.tsx",
    lineNumber: 119,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/email-verification/route.tsx
var route_exports8 = {};
__export(route_exports8, {
  default: () => EmailVerification
});
import { useNavigate as useNavigate8, useSearchParams as useSearchParams7 } from "@remix-run/react";
import { useMutation as useMutation12 } from "@tanstack/react-query";
import { useEffect as useEffect10 } from "react";
import { useTimer } from "use-timer";
import { jsxDEV as jsxDEV69 } from "react/jsx-dev-runtime";
function EmailVerification() {
  let { time, start, status } = useTimer({
    initialTime: 180,
    endTime: 0,
    timerType: "DECREMENTAL"
  }), navigate = useNavigate8(), [params] = useSearchParams7(), emailVerificationToken = params.get("emailVerificationToken"), resendVerificationEmail2 = useMutation12({
    mutationFn: fetchers.resendVerificationEmail
  }), verifyEmail2 = useMutation12({
    mutationFn: fetchers.verifyEmail,
    onSuccess: () => {
      navigate("/dashboard", { replace: !0 });
    }
  });
  useEffect10(() => {
    emailVerificationToken && verifyEmail2.mutate({ emailVerificationToken });
  }, [verifyEmail2.mutate, emailVerificationToken]);
  let handleResendVerificationEmail = async () => {
    await resendVerificationEmail2.mutateAsync(), start();
  }, showApiError = verifyEmail2.isError, showUrlInvalidError = !emailVerificationToken, hasError = showApiError || showUrlInvalidError, showLoading = (verifyEmail2.isPending || verifyEmail2.isIdle) && !hasError;
  return /* @__PURE__ */ jsxDEV69(
    "div",
    {
      className: cn(
        "mt-[15dvh]",
        "space-y-8",
        "flex flex-col items-center justify-center"
      ),
      children: /* @__PURE__ */ jsxDEV69("div", { className: cn("m-auto max-w-[500px]"), children: [
        showLoading && /* @__PURE__ */ jsxDEV69("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxDEV69("div", { className: cn("h-8 w-8"), children: /* @__PURE__ */ jsxDEV69(
            LoadingIndicator,
            {
              className: cn("h-full w-full", "border-link")
            },
            void 0,
            !1,
            {
              fileName: "app/routes/dashboard/email-verification/route.tsx",
              lineNumber: 65,
              columnNumber: 15
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 64,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV69("h1", { className: "text-center text-2xl font-bold", children: "Verifying your email..." }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 69,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard/email-verification/route.tsx",
          lineNumber: 63,
          columnNumber: 11
        }, this),
        showApiError && /* @__PURE__ */ jsxDEV69("div", { className: "flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxDEV69("h1", { className: "whitespace-nowrap text-center text-2xl font-bold", children: [
            /* @__PURE__ */ jsxDEV69("div", { children: "Email verification is invalid or expired." }, void 0, !1, {
              fileName: "app/routes/dashboard/email-verification/route.tsx",
              lineNumber: 77,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV69("div", { children: "Please resend the email." }, void 0, !1, {
              fileName: "app/routes/dashboard/email-verification/route.tsx",
              lineNumber: 78,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 76,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV69(Button, { className: "mt-4", variant: "outline", children: "Resend Email" }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV69("p", { className: "mt-4 text-center text-muted-foreground", children: "If you have not yet received an email, please check your Spam folder." }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard/email-verification/route.tsx",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        showUrlInvalidError && /* @__PURE__ */ jsxDEV69("div", { className: "flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxDEV69("h1", { className: "text-center text-2xl font-bold", children: /* @__PURE__ */ jsxDEV69("div", { children: "Your email is not verified. Please check your email or resend." }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 91,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV69(
            Button,
            {
              className: "mt-4",
              variant: "outline",
              disabled: status === "RUNNING",
              onClick: handleResendVerificationEmail,
              children: /* @__PURE__ */ jsxDEV69("div", { children: status === "RUNNING" ? /* @__PURE__ */ jsxDEV69("span", { className: "ml-2", children: [
                "You can resend in",
                " ",
                /* @__PURE__ */ jsxDEV69("span", { className: "tabular-nums", children: time }, void 0, !1, {
                  fileName: "app/routes/dashboard/email-verification/route.tsx",
                  lineNumber: 106,
                  columnNumber: 21
                }, this),
                " seconds"
              ] }, void 0, !0, {
                fileName: "app/routes/dashboard/email-verification/route.tsx",
                lineNumber: 104,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDEV69("span", { children: "Resend Email" }, void 0, !1, {
                fileName: "app/routes/dashboard/email-verification/route.tsx",
                lineNumber: 109,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/routes/dashboard/email-verification/route.tsx",
                lineNumber: 102,
                columnNumber: 15
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/dashboard/email-verification/route.tsx",
              lineNumber: 96,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV69("p", { className: "mt-4 text-center text-muted-foreground", children: "If you have not yet received an email, please check your Spam folder or contact support." }, void 0, !1, {
            fileName: "app/routes/dashboard/email-verification/route.tsx",
            lineNumber: 113,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/dashboard/email-verification/route.tsx",
          lineNumber: 90,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/email-verification/route.tsx",
        lineNumber: 61,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/routes/dashboard/email-verification/route.tsx",
      lineNumber: 54,
      columnNumber: 5
    },
    this
  );
}

// app/routes/dashboard/settings.tsx
var settings_exports2 = {};
__export(settings_exports2, {
  default: () => Settings2
});
import { useEffect as useEffect11 } from "react";
import { useForm as useForm7 } from "react-hook-form";
import { useQueryClient as useQueryClient8, useMutation as useMutation13 } from "@tanstack/react-query";
import { Fragment as Fragment12, jsxDEV as jsxDEV70 } from "react/jsx-dev-runtime";
function Settings2() {
  let queryClient = useQueryClient8(), { toast: toast2 } = useToast(), user = useMe(), form = useForm7({
    defaultValues: {
      fullName: user.data?.fullName ?? ""
    }
  });
  useEffect11(() => {
    user.data && form.reset({ fullName: user.data.fullName });
  }, [user.data, form]);
  let updateMutation = useMutation13({
    mutationFn: fetchers.updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data), form.reset({ fullName: data.fullName }), toast2({
        title: "Success!",
        description: "Your account settings have been updated."
      });
    }
  }), onSubmit = (variables) => {
    updateMutation.mutate({ fullName: variables.fullName.trim() });
  };
  return /* @__PURE__ */ jsxDEV70(Fragment12, { children: [
    /* @__PURE__ */ jsxDEV70("div", { className: "container py-10 pb-4", children: /* @__PURE__ */ jsxDEV70("h2", { className: "text-3xl tracking-wide", children: "Account Settings" }, void 0, !1, {
      fileName: "app/routes/dashboard/settings.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/settings.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV70(Separator, { className: "my-6" }, void 0, !1, {
      fileName: "app/routes/dashboard/settings.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV70("div", { className: "container mb-6", children: /* @__PURE__ */ jsxDEV70(Form, { ...form, children: /* @__PURE__ */ jsxDEV70("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [
      /* @__PURE__ */ jsxDEV70(
        FormField,
        {
          control: form.control,
          name: "fullName",
          render: ({ field }) => /* @__PURE__ */ jsxDEV70(FormItem, { children: [
            /* @__PURE__ */ jsxDEV70(FormLabel, { children: "Name" }, void 0, !1, {
              fileName: "app/routes/dashboard/settings.tsx",
              lineNumber: 79,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV70(FormDescription, { children: "This is how your name will appear in the app." }, void 0, !1, {
              fileName: "app/routes/dashboard/settings.tsx",
              lineNumber: 80,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV70("div", { className: "w-[300px]", children: /* @__PURE__ */ jsxDEV70(FormControl, { children: /* @__PURE__ */ jsxDEV70(Input, { ...field, autoComplete: "false" }, void 0, !1, {
              fileName: "app/routes/dashboard/settings.tsx",
              lineNumber: 85,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/routes/dashboard/settings.tsx",
              lineNumber: 84,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/dashboard/settings.tsx",
              lineNumber: 83,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV70(FormMessage, {}, void 0, !1, {
              fileName: "app/routes/dashboard/settings.tsx",
              lineNumber: 88,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/dashboard/settings.tsx",
            lineNumber: 78,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/routes/dashboard/settings.tsx",
          lineNumber: 74,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV70(Button, { type: "submit", size: "sm", disabled: updateMutation.isPending, children: [
        updateMutation.isPending ? /* @__PURE__ */ jsxDEV70(LoadingIndicator, { className: "mr-2" }, void 0, !1, {
          fileName: "app/routes/dashboard/settings.tsx",
          lineNumber: 94,
          columnNumber: 17
        }, this) : null,
        "Save"
      ] }, void 0, !0, {
        fileName: "app/routes/dashboard/settings.tsx",
        lineNumber: 92,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dashboard/settings.tsx",
      lineNumber: 73,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/settings.tsx",
      lineNumber: 72,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/dashboard/settings.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dashboard/settings.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-OKQARIJB.js", imports: ["/build/_shared/chunk-IFJ75IDK.js", "/build/_shared/chunk-TOMCL6U5.js", "/build/_shared/chunk-RYE6BCZB.js", "/build/_shared/chunk-ED7KKCRB.js", "/build/_shared/chunk-QFEAKD5I.js", "/build/_shared/chunk-ZIPKILLR.js", "/build/_shared/chunk-PECDPABK.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-V53O6GXA.js", imports: ["/build/_shared/chunk-AJGJ4MKH.js", "/build/_shared/chunk-47X5OTQ2.js", "/build/_shared/chunk-MUB22Q7X.js", "/build/_shared/chunk-3CFI43SX.js", "/build/_shared/chunk-2YDYXUAE.js", "/build/_shared/chunk-TAKUDCZB.js", "/build/_shared/chunk-747Z67ZF.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-OCSL7FYV.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-43BTZJRS.js", "/build/_shared/chunk-WHWQSV3J.js", "/build/_shared/chunk-BOWT3I25.js", "/build/_shared/chunk-VA6TKV7K.js", "/build/_shared/chunk-XISPE656.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-NFYMXIMP.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-SBCFKZZX.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth/layout": { id: "routes/auth/layout", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/auth/layout-WY3S27EW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth/login/email/route": { id: "routes/auth/login/email/route", parentId: "routes/auth/layout", path: "login/email", index: !0, caseSensitive: void 0, module: "/build/routes/auth/login/email/route-XY7DLSG5.js", imports: ["/build/_shared/chunk-57AL456H.js", "/build/_shared/chunk-MUB22Q7X.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth/login/route": { id: "routes/auth/login/route", parentId: "routes/auth/layout", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/login/route-YDQKP2AW.js", imports: ["/build/_shared/chunk-AU6PC23G.js", "/build/_shared/chunk-57AL456H.js", "/build/_shared/chunk-47X5OTQ2.js", "/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth/signup/email/route": { id: "routes/auth/signup/email/route", parentId: "routes/auth/layout", path: "signup/email", index: !0, caseSensitive: void 0, module: "/build/routes/auth/signup/email/route-U4DXZBRQ.js", imports: ["/build/_shared/chunk-57AL456H.js", "/build/_shared/chunk-MUB22Q7X.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-SBCFKZZX.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth/signup/route": { id: "routes/auth/signup/route", parentId: "routes/auth/layout", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/signup/route-SIRXV2AC.js", imports: ["/build/_shared/chunk-AU6PC23G.js", "/build/_shared/chunk-57AL456H.js", "/build/_shared/chunk-47X5OTQ2.js", "/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-SBCFKZZX.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/route-FSJTAKJS.js", imports: ["/build/_shared/chunk-JKGZU6J3.js", "/build/_shared/chunk-UXM4BWNW.js", "/build/_shared/chunk-UXA4GCOQ.js", "/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-445VP2QN.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/route": { id: "routes/dashboard/route", parentId: "routes/dashboard/layout", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/route-FSJTAKJS.js", imports: ["/build/_shared/chunk-JKGZU6J3.js", "/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-OCSL7FYV.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-VA6TKV7K.js", "/build/_shared/chunk-XISPE656.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-SBCFKZZX.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/email-verification/route": { id: "routes/dashboard/email-verification/route", parentId: "routes/dashboard/layout", path: "email-verification", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/email-verification/route-FMY2USYJ.js", imports: ["/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/layout": { id: "routes/dashboard/layout", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/layout-Y75ZNRNX.js", imports: ["/build/_shared/chunk-7YOZIL2V.js", "/build/_shared/chunk-MHQVYBZY.js", "/build/_shared/chunk-UXM4BWNW.js", "/build/_shared/chunk-UXA4GCOQ.js", "/build/_shared/chunk-Z3K6EGDN.js", "/build/_shared/chunk-PXFGVUXW.js", "/build/_shared/chunk-445VP2QN.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/project/feedbacks": { id: "routes/dashboard/project/feedbacks", parentId: "routes/dashboard/project/layout", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/project/feedbacks-IN7K6HGV.js", imports: ["/build/_shared/chunk-2VBGJDWD.js", "/build/_shared/chunk-CDBMYDSX.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-UXA4GCOQ.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-OCSL7FYV.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-BOWT3I25.js", "/build/_shared/chunk-445VP2QN.js", "/build/_shared/chunk-XISPE656.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/project/layout": { id: "routes/dashboard/project/layout", parentId: "routes/dashboard/layout", path: ":projectId", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard/project/layout-HTTCMP2J.js", imports: ["/build/_shared/chunk-JY5JDNAU.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-SBCFKZZX.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/project/settings": { id: "routes/dashboard/project/settings", parentId: "routes/dashboard/project/layout", path: "settings", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/project/settings-RXG5KY3M.js", imports: ["/build/_shared/chunk-YLDLAJ5D.js", "/build/_shared/chunk-MHQVYBZY.js", "/build/_shared/chunk-2VBGJDWD.js", "/build/_shared/chunk-CDBMYDSX.js", "/build/_shared/chunk-MUB22Q7X.js", "/build/_shared/chunk-TAKUDCZB.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-UXA4GCOQ.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-OCSL7FYV.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-VA6TKV7K.js", "/build/_shared/chunk-XISPE656.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/project/team": { id: "routes/dashboard/project/team", parentId: "routes/dashboard/project/layout", path: "team", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/project/team-3EPMT3OM.js", imports: ["/build/_shared/chunk-YLDLAJ5D.js", "/build/_shared/chunk-7YOZIL2V.js", "/build/_shared/chunk-MHQVYBZY.js", "/build/_shared/chunk-CDBMYDSX.js", "/build/_shared/chunk-MUB22Q7X.js", "/build/_shared/chunk-2YDYXUAE.js", "/build/_shared/chunk-TAKUDCZB.js", "/build/_shared/chunk-747Z67ZF.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-UXA4GCOQ.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-OCSL7FYV.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-PXFGVUXW.js", "/build/_shared/chunk-WHWQSV3J.js", "/build/_shared/chunk-445VP2QN.js", "/build/_shared/chunk-VA6TKV7K.js", "/build/_shared/chunk-XISPE656.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dashboard/settings": { id: "routes/dashboard/settings", parentId: "routes/dashboard/layout", path: "settings", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/settings-SWQAE6P5.js", imports: ["/build/_shared/chunk-MUB22Q7X.js", "/build/_shared/chunk-747Z67ZF.js", "/build/_shared/chunk-FE7XC6LG.js", "/build/_shared/chunk-Q47DIIO7.js", "/build/_shared/chunk-7UUYPRQM.js", "/build/_shared/chunk-PKKS7UXI.js", "/build/_shared/chunk-QOU5C4RB.js", "/build/_shared/chunk-MA4PTSMO.js", "/build/_shared/chunk-GKYHHTTA.js", "/build/_shared/chunk-SUDYWICU.js", "/build/_shared/chunk-DWEKTIPF.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/docs": { id: "routes/docs", parentId: "root", path: "docs", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/route-EZOCRQAC.js", imports: ["/build/_shared/chunk-XK57IYLL.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/docs/route": { id: "routes/docs/route", parentId: "root", path: "docs", index: void 0, caseSensitive: void 0, module: "/build/routes/docs/route-EZOCRQAC.js", imports: ["/build/_shared/chunk-XK57IYLL.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/landing": { id: "routes/landing", parentId: "root", path: "landing", index: void 0, caseSensitive: void 0, module: "/build/routes/landing/route-ZDDEGZ4L.js", imports: ["/build/_shared/chunk-QFTG65CS.js", "/build/_shared/chunk-Z3K6EGDN.js", "/build/_shared/chunk-PXFGVUXW.js", "/build/_shared/chunk-445VP2QN.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/landing/route": { id: "routes/landing/route", parentId: "root", path: "/", index: !0, caseSensitive: void 0, module: "/build/routes/landing/route-ZDDEGZ4L.js", imports: ["/build/_shared/chunk-QFTG65CS.js", "/build/_shared/chunk-Z3K6EGDN.js", "/build/_shared/chunk-PXFGVUXW.js", "/build/_shared/chunk-445VP2QN.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "febefcf4", hmr: { runtime: "/build/_shared/chunk-QFEAKD5I.js", timestamp: 1704126734896 }, url: "/build/manifest-FEBEFCF4.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/landing": {
    id: "routes/landing",
    parentId: "root",
    path: "landing",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports3
  },
  "routes/landing/route": {
    id: "routes/landing/route",
    parentId: "root",
    path: "/",
    index: !0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/docs/route": {
    id: "routes/docs/route",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports3
  },
  "routes/auth/layout": {
    id: "routes/auth/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: layout_exports
  },
  "routes/auth/login/route": {
    id: "routes/auth/login/route",
    parentId: "routes/auth/layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports4
  },
  "routes/auth/login/email/route": {
    id: "routes/auth/login/email/route",
    parentId: "routes/auth/layout",
    path: "login/email",
    index: !0,
    caseSensitive: void 0,
    module: route_exports5
  },
  "routes/auth/signup/route": {
    id: "routes/auth/signup/route",
    parentId: "routes/auth/layout",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports6
  },
  "routes/auth/signup/email/route": {
    id: "routes/auth/signup/email/route",
    parentId: "routes/auth/layout",
    path: "signup/email",
    index: !0,
    caseSensitive: void 0,
    module: route_exports7
  },
  "routes/dashboard/layout": {
    id: "routes/dashboard/layout",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: layout_exports2
  },
  "routes/dashboard/route": {
    id: "routes/dashboard/route",
    parentId: "routes/dashboard/layout",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/dashboard/project/layout": {
    id: "routes/dashboard/project/layout",
    parentId: "routes/dashboard/layout",
    path: ":projectId",
    index: void 0,
    caseSensitive: void 0,
    module: layout_exports3
  },
  "routes/dashboard/project/feedbacks": {
    id: "routes/dashboard/project/feedbacks",
    parentId: "routes/dashboard/project/layout",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: feedbacks_exports
  },
  "routes/dashboard/project/team": {
    id: "routes/dashboard/project/team",
    parentId: "routes/dashboard/project/layout",
    path: "team",
    index: !0,
    caseSensitive: void 0,
    module: team_exports
  },
  "routes/dashboard/project/settings": {
    id: "routes/dashboard/project/settings",
    parentId: "routes/dashboard/project/layout",
    path: "settings",
    index: !0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/dashboard/email-verification/route": {
    id: "routes/dashboard/email-verification/route",
    parentId: "routes/dashboard/layout",
    path: "email-verification",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports8
  },
  "routes/dashboard/settings": {
    id: "routes/dashboard/settings",
    parentId: "routes/dashboard/layout",
    path: "settings",
    index: !0,
    caseSensitive: void 0,
    module: settings_exports2
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=[[path]].js.map
