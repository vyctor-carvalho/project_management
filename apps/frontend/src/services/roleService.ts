import { apiClient } from '@/utils/api';
import { Role, CreateRoleRequest, ApiResponse, PaginatedResponse } from '@/types';

export class RoleService {
  async getRoles(): Promise<Role[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<Role>>('/roles');
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new Error('Falha ao buscar cargos.');
    }
  }

  async getRoleById(id: string): Promise<Role> {
    try {
      const response = await apiClient.get<ApiResponse<Role>>(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching role:', error);
      throw new Error('Falha ao buscar cargo.');
    }
  }

  async createRole(roleData: CreateRoleRequest): Promise<Role> {
    try {
      const response = await apiClient.post<ApiResponse<Role>>('/roles', roleData);
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw new Error('Falha ao criar cargo.');
    }
  }

  async updateRole(id: string, roleData: Partial<CreateRoleRequest>): Promise<Role> {
    try {
      const response = await apiClient.put<ApiResponse<Role>>(`/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      console.error('Error updating role:', error);
      throw new Error('Falha ao atualizar cargo.');
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await apiClient.delete(`/roles/${id}`);
    } catch (error) {
      console.error('Error deleting role:', error);
      throw new Error('Falha ao deletar cargo.');
    }
  }
}

export const roleService = new RoleService();

