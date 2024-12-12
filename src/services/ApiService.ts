const apiUrl = import.meta.env.VITE_API_URL;

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Realiza uma requisição GET para a URL fornecida.
   * @param endpoint O endpoint relativo (exemplo: `/dados`).
   * @param params Parâmetros de consulta (opcional).
   */
  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw { status: response.status, message: response.statusText };
      }

      return (await response.json()) as T;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const apiService = new ApiService(apiUrl);
