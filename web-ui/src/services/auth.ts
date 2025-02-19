import { handleError } from "./error";

export type LoginInput = {
  username: string;
  password: string;
};

export type RegisterInput = LoginInput & { name: string };

const TOKEN_KEY = "ff_token";

async function login(input: LoginInput) {
  const response = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const error = await handleError(response);
  if (error) throw error;

  const data = await response.json();
  localStorage.setItem(TOKEN_KEY, data.token);

  return data;
}

async function register(input: RegisterInput) {
  const response = await fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const error = await handleError(response);
  if (error) throw error;

  const data = await response.json();

  return data;
}

async function loginByToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) throw new Error("No token given");

  const response = await fetch("/api/user/token-login", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const error = await handleError(response);
  if (error) {
    localStorage.removeItem(TOKEN_KEY);
    throw error;
  }

  const data = await response.json();
  return data;
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export default {
  TOKEN_KEY,
  login,
  register,
  loginByToken,
  logout,
  isLoggedIn,
};
