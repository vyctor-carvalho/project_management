import { apiClient } from '@/utils/api';
import { User, CreateUserRequest, ApiResponse, PaginatedResponse } from '@/types';

export class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<User>>('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Falha ao buscar usuários.');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Falha ao buscar usuário.');
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<User>>('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Falha ao criar usuário.');
    }
  }

  async updateUser(id: string, userData: Partial<CreateUserRequest>): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Falha ao atualizar usuário.');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Falha ao deletar usuário.');
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw new Error('Falha ao buscar dados do usuário atual.');
    }
  }
}

export const userService = new UserService();

