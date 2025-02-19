import authService from "./auth";
import { handleError } from "./error";

async function fetchAccount({ queryKey }: { queryKey: string[] }) {
  const token = "Bearer " + localStorage.getItem(authService.TOKEN_KEY);
  const id = queryKey[1];
  const response = await fetch(`/api/account/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  handleError(response);

  const data = await response.json();
  return data;
}

export default {
  fetchAccount,
};
