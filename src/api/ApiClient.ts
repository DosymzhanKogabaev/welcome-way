import { isLiteralObject } from '@/src/utils/isLiteralObject';
import { RequestMethod } from '@/shared/enums';
import i18n from '@/src/i18n/i18n';
import { isTokenExpired } from '@/src/utils/isTokenExpired';
import { t } from 'i18next';

export const buildAuthorizationHeader = (accessToken: string) => {
  return `JWT ${accessToken}`;
};

export class ErrorStatusCode extends Error {
  constructor(message: string, name: string, public statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export type ClientOptions<K> = Omit<
  RequestInit,
  'method' | 'body' | 'headers'
> & {
  body?: BodyInit | K;
  headers?: Record<string, string>;
  withStatus?: boolean;
};

export class ApiClient {
  private static isRefreshing = false;
  private static onLogout: (() => void) | null = null;
  private static onRefreshToken: ((token: string) => Promise<void>) | null =
    null;
  private static getAccessToken: (() => string | null) | null = null;
  private static getRefreshToken: (() => string | null) | null = null;

  public static setTokenHandlers(handlers: {
    onLogout: () => void;
    onRefreshToken: (token: string) => Promise<void>;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
  }) {
    this.onLogout = handlers.onLogout;
    this.onRefreshToken = handlers.onRefreshToken;
    this.getAccessToken = handlers.getAccessToken;
    this.getRefreshToken = handlers.getRefreshToken;
  }

  public static async fetch<T, K>(
    url: string,
    options: ClientOptions<K | null | undefined> = {},
    requestType: RequestMethod = RequestMethod.GET,
    useAccessToken: boolean = true,
    useApplicationLanguage: boolean = true
  ): Promise<T> {
    let headers = options.headers || {};
    if (useAccessToken) {
      const accessToken = this.getAccessToken ? this.getAccessToken() : null;
      if (!accessToken) {
        throw new Error(t('apiClient.accessTokenNotFound'));
      }
      headers = {
        ...headers,
        Authorization: buildAuthorizationHeader(accessToken),
      };
    }
    if (useApplicationLanguage) {
      headers = { ...headers, 'Accept-Language': i18n.language };
    }
    if (!(options.body instanceof FormData)) {
      if (!headers['Content-Type']) {
        headers = { ...headers, 'Content-Type': 'application/json' };
      }
      if (!headers['Accept']) {
        headers = { ...headers, Accept: 'application/json, text/plain, */*' };
      }
    }
    let body = options.body;

    if (
      !(body instanceof FormData) &&
      (isLiteralObject(body) || Array.isArray(body))
    ) {
      body = JSON.stringify(body);
    }
    if (isLiteralObject(body) || Array.isArray(body)) {
      body = JSON.stringify(body);
      if (!headers['Content-Type']) {
        headers = { ...headers, 'Content-Type': 'application/json' };
      }
    }

    const fetchOptions: RequestInit = {
      ...options,
      headers,
      method: requestType,
      body: body as BodyInit,
    };

    let apiPrefix: string = import.meta.env.VITE_API_URL;
    // let apiPrefix: string = 'http://127.0.0.1:8787';
    if (apiPrefix && !apiPrefix.endsWith('/')) {
      apiPrefix = `${apiPrefix}/`;
    }

    // Fix: Ensure absolute URL paths when no prefix is set
    let finalUrl: string;
    if (apiPrefix) {
      finalUrl = `${apiPrefix}${url}`;
    } else {
      // Use absolute path to prevent relative URL issues
      finalUrl = url.startsWith('/') ? url : `/${url}`;
    }

    try {
      const response = await fetch(finalUrl, fetchOptions);

      if (!response.ok) {
        const responseText = await response.text();
        let error: any;
        try {
          error = JSON.parse(responseText);
        } catch {
          error = { message: responseText };
        }
        // Обработка ошибки 401 Unauthorized
        if (response.status === 401) {
          const refreshToken = this.getRefreshToken
            ? this.getRefreshToken()
            : null;

          if (
            refreshToken &&
            !this.isRefreshing &&
            this.onRefreshToken &&
            this.onLogout
          ) {
            this.isRefreshing = true;
            // Проверяем, истек ли refresh token
            if (isTokenExpired(refreshToken)) {
              this.isRefreshing = false;
              // Обнуляем currentUser в состоянии Redux
              this.onLogout();
            } else {
              // Refresh token действителен, пытаемся обновить access token
              try {
                await this.onRefreshToken(refreshToken);
                this.isRefreshing = false;
              } catch (refreshError) {
                this.isRefreshing = false;
                // Очищаем currentUser из состояния, так как refresh не удался
                this.onLogout();
              }
            }
          }
        }

        console.log('ERROR', error);

        throw new ErrorStatusCode(
          error.detail || error.message || error.error || response.statusText,
          error.error || response.statusText,
          response.status
        );
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return {} as T;
      }

      const responseData = await response.json();
      if (options.withStatus) {
        return {
          status: response.status,
          data: responseData,
        } as unknown as T;
      }

      return responseData as T;
    } catch (error) {
      // Дополнительное логирование для сетевых ошибок
      if (error instanceof TypeError && error.message === 'Load failed') {
        console.error('Network error details:', {
          url: finalUrl,
          method: requestType,
          error: error.message,
          stack: error.stack,
        });
      }
      throw error;
    }
  }

  public static async get<T, K>(
    url: string,
    options: ClientOptions<K> = {},
    useAccessToken: boolean = true,
    useApplicationLanguage: boolean = true
  ): Promise<T> {
    return await this.fetch(
      url,
      options,
      RequestMethod.GET,
      useAccessToken,
      useApplicationLanguage
    );
  }

  public static async post<T, K>(
    url: string,
    options: ClientOptions<K> = {},
    useAccessToken: boolean = true,
    useApplicationLanguage: boolean = true
  ): Promise<T> {
    return await this.fetch(
      url,
      options,
      RequestMethod.POST,
      useAccessToken,
      useApplicationLanguage
    );
  }

  public static async put<T, K>(
    url: string,
    options: ClientOptions<K> = {},
    useAccessToken: boolean = true,
    useApplicationLanguage: boolean = true
  ): Promise<T> {
    return await this.fetch(
      url,
      options,
      RequestMethod.PUT,
      useAccessToken,
      useApplicationLanguage
    );
  }

  public static async delete<T, K>(
    url: string,
    options: ClientOptions<K> = {},
    useAccessToken: boolean = true,
    useApplicationLanguage: boolean = true
  ): Promise<T> {
    return await this.fetch(
      url,
      options,
      RequestMethod.DELETE,
      useAccessToken,
      useApplicationLanguage
    );
  }

  public static async patch<T, K>(
    url: string,
    options: ClientOptions<K> = {},
    useAccessToken: boolean = true,
    useApplicationLanguage: boolean = true
  ): Promise<T> {
    return await this.fetch(
      url,
      options,
      RequestMethod.PATCH,
      useAccessToken,
      useApplicationLanguage
    );
  }
}

export default ApiClient;
