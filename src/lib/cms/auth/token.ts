import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE_NAME = "cms_session";
export const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

function getSecretKey(): Uint8Array {
  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "CMS_SESSION_SECRET is not set (or too short). Set a random string of at least 32 characters."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(): Promise<string> {
  return new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.sub === "admin";
  } catch {
    return false;
  }
}
