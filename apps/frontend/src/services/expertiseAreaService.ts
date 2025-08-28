import { apiClient } from '@/utils/api';
import { ExpertiseArea, CreateExpertiseAreaRequest, ApiResponse, PaginatedResponse, User } from '@/types';

export class ExpertiseAreaService {
  async getExpertiseAreas(): Promise<ExpertiseArea[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<ExpertiseArea>>('/expertise-areas');
      return response.data;
    } catch (error) {
      console.error('Error fetching expertise areas:', error);
      throw new Error('Falha ao buscar áreas de expertise.');
    }
  }

  async getExpertiseAreaById(id: string): Promise<ExpertiseArea> {
    try {
      const response = await apiClient.get<ApiResponse<ExpertiseArea>>(`/expertise-areas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expertise area:', error);
      throw new Error('Falha ao buscar área de expertise.');
    }
  }

  async createExpertiseArea(areaData: CreateExpertiseAreaRequest): Promise<ExpertiseArea> {
    try {
      const response = await apiClient.post<ApiResponse<ExpertiseArea>>('/expertise-areas', areaData);
      return response.data;
    } catch (error) {
      console.error('Error creating expertise area:', error);
      throw new Error('Falha ao criar área de expertise.');
    }
  }

  async updateExpertiseArea(id: string, areaData: Partial<CreateExpertiseAreaRequest>): Promise<ExpertiseArea> {
    try {
      const response = await apiClient.put<ApiResponse<ExpertiseArea>>(`/expertise-areas/${id}`, areaData);
      return response.data;
    } catch (error) {
      console.error('Error updating expertise area:', error);
      throw new Error('Falha ao atualizar área de expertise.');
    }
  }

  async deleteExpertiseArea(id: string): Promise<void> {
    try {
      await apiClient.delete(`/expertise-areas/${id}`);
    } catch (error) {
      console.error('Error deleting expertise area:', error);
      throw new Error('Falha ao deletar área de expertise.');
    }
  }

  async getExpertiseAreaMembers(areaId: string): Promise<User[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<User>>(`/expertise-areas/${areaId}/members`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expertise area members:', error);
      throw new Error('Falha ao buscar membros da área de expertise.');
    }
  }
}

export const expertiseAreaService = new ExpertiseAreaService();

