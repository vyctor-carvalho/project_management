import { apiClient } from '@/utils/api';
import { LoginRequest, LoginResponse } from '@/types';

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Store tokens in the API client
      apiClient.setTokens(response.access_token, response.refresh_token);
      
      return response;
    } catch (error: any) {
      console.error(error.response.data.message);
      throw new Error('Falha na autenticação. Verifique suas credenciais.');
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local tokens
      apiClient.logout();
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await apiClient.post<{ token: string; refreshToken: string }>('/auth/refresh');
      apiClient.setTokens(response.token, response.refreshToken);
      return response.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Falha ao renovar token de acesso.');
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }
}

export const authService = new AuthService();

