export async function handleError(error: Response) {
  if (!error.ok) {
    const errorData = await error.json();
    console.log(errorData);
    throw new Error(
      errorData.error || errorData.statusText || "Something went wrong"
    );
  }
}
