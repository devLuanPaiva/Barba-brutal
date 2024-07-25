import { useCallback } from "react";

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;

export default function useAPI() {
  const httpGET = useCallback(async function (url: string): Promise<any> {
    try {
      const response = await fetch(`${URL_BASE}/${url}`);
      return await response.json();
    } catch (err) {
      console.error("Error ao executar requisição:", err);
      throw err;
    }
  }, []);
  const httpPOST = useCallback(async function (
    url: string,
    body: any
  ): Promise<any> {
    await fetch(`${URL_BASE}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }, []);
  return { httpGET, httpPOST };
}
