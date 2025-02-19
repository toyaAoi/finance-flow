import { toast } from "sonner";

export async function handleError(error: Response) {
  if (!error.ok) {
    let errorMessage = error.statusText || "Something went wrong";

    const isJson = error.headers
      .get("content-type")
      ?.includes("application/json");

    if (isJson) {
      try {
        const errorData = await error.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // ignore
      }
    }

    toast.error(errorMessage);
    return errorMessage;
  }
}
