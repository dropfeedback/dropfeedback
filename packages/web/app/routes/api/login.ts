import { API_URL } from "~/lib/axios";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json, createCookie } from "@remix-run/cloudflare";

export async function action({ request }: ActionFunctionArgs) {
  const requestLogin = await fetch(`${API_URL}/auth/local/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "owner@dropfeedback.com",
      password: "owner",
    }),
  });

  const responseLogin: {
    accessToken: string;
    refreshToken: string;
  } = await requestLogin.json();

  const accessTokenCookie = await createCookie("accessToken", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
  }).serialize(responseLogin.accessToken, {
    encode(value) {
      return atob(value);
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
  });

  const refreshTokenCookie = await createCookie("refreshToken", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  }).serialize(responseLogin.refreshToken, {
    encode(value) {
      console.log("value", value);
      return atob(value);
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  });

  throw json(
    {},
    {
      status: 200,
      statusText: "OK",
      headers: {
        "Set-Cookie": [accessTokenCookie, refreshTokenCookie]
          .join("; ")
          .replace(/"/g, ""),
      },
    },
  );
}
