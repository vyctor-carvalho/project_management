import { apiClient } from '@/utils/api';
import { Task, CreateTaskRequest, ApiResponse, PaginatedResponse } from '@/types';

export class TaskService {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<Task>>('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Falha ao buscar tarefas.');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Falha ao buscar tarefa.');
    }
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    try {
      const response = await apiClient.post<ApiResponse<Task>>('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Falha ao criar tarefa.');
    }
  }

  async updateTask(id: string, taskData: Partial<CreateTaskRequest>): Promise<Task> {
    try {
      const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Falha ao atualizar tarefa.');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await apiClient.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Falha ao deletar tarefa.');
    }
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<Task>>(`/projects/${projectId}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project tasks:', error);
      throw new Error('Falha ao buscar tarefas do projeto.');
    }
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    try {
      const response = await apiClient.get<PaginatedResponse<Task>>(`/users/${userId}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      throw new Error('Falha ao buscar tarefas do usuário.');
    }
  }
}

export const taskService = new TaskService();

