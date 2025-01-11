import { handleError } from "./error";

export type LoginInput = {
  username: string;
  password: string;
};

export type RegisterInput = LoginInput & { name: string };

class AuthService {
  #token: string | null = null;

  constructor() {
    this.#token = localStorage.getItem("ff_token") || null;
  }

  get token() {
    return this.#token;
  }

  async login(input: LoginInput) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    handleError(response);

    const data = await response.json();
    this.#token = data.token;
    localStorage.setItem("ff_token", data.token);

    return data;
  }

  async register(input: RegisterInput) {
    console.log(input);
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    handleError(response);

    const data = await response.json();

    return data;
  }
}

const authService = new AuthService();
export default authService;
