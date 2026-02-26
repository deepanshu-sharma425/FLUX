import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

const TOKEN_NAME = "flux_auth_token";

type AuthPayload = {
  userId: string;
  email: string;
  isAdmin: boolean;
};

export function signAuthToken(payload: AuthPayload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export { TOKEN_NAME, type AuthPayload };

