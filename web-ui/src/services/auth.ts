type LoginInput = {
  username: string;
  password: string;
};

class AuthService {
  token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("ff_token") || null;
  }

  async login(input: LoginInput) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      if (response.status !== 500) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      throw new Error(response.statusText);
    }

    const data = await response.json();
    this.token = data.token;
    localStorage.setItem("ff_token", data.token);

    return data;
  }
}

const authService = new AuthService();
export default authService;
