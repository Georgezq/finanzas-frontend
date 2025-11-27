export async function extractApiError(error: any): Promise<string> {
  try {
    if (error instanceof Response) {
      const data = await error.json().catch(() => null);
      return data?.message ?? "Ocurrió un error inesperado.";
    }

    if (error?.message) return error.message;

    return "Ocurrió un error inesperado.";
  } catch {
    return "Ocurrió un error inesperado.";
  }
}
