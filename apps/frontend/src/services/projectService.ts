import { apiClient } from '@/utils/api';
import { Project, CreateProjectRequest, ApiResponse, PaginatedResponse } from '@/types';

export class ProjectService {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<Project>>('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Falha ao buscar projetos.');
    }
  }

  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error('Falha ao buscar projeto.');
    }
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    try {
      const response = await apiClient.post<ApiResponse<Project>>('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Falha ao criar projeto.');
    }
  }

  async updateProject(id: string, projectData: Partial<CreateProjectRequest>): Promise<Project> {
    try {
      const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Falha ao atualizar projeto.');
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await apiClient.delete(`/projects/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Falha ao deletar projeto.');
    }
  }

  async getProjectMembers(projectId: string): Promise<any[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<any>>(`/projects/${projectId}/members`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project members:', error);
      throw new Error('Falha ao buscar membros do projeto.');
    }
  }
}

export const projectService = new ProjectService();

