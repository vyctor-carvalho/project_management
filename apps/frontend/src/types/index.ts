// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  employmentType: 'CLT' | 'PJ';
  birthDate: string;
  roleId: string;
  role?: Role;
  expertiseAreas?: ExpertiseArea[];
}

export interface CreateUserRequest {
  name: string;
  authLogin: {
    email: string;
    password: string;
  };
  employmentType: 'CLT' | 'PJ';
  BrithDate: string; // Note: keeping the typo from the API spec
  roleId: string;
}

// Role types
export interface Role {
  id: string;
  name: string;
}

export interface CreateRoleRequest {
  name: string;
}

// Expertise Area types
export interface ExpertiseArea {
  id: string;
  name: string;
  members?: User[];
}

export interface CreateExpertiseAreaRequest {
  name: string;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  deadline: string;
  members?: ProjectMember[];
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  technologies: string; // JSON string array
  deadline: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  dueDate: string;
  projectId: string;
  assigneeId: string;
  areaId: string;
  project?: Project;
  assignee?: User;
  area?: ExpertiseArea;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  dueDate: string;
  projectId: string;
  assigneeId: string;
  areaId: string;
}

// Project Member types
export interface ProjectMember {
  id: string;
  projectId: string;
  memberId: string;
  role: string;
  project?: Project;
  member?: User;
}

export interface CreateProjectMemberRequest {
  projectId: string;
  memberId: string;
  role: string;
}

// User Expertise Area types
export interface UserExpertiseArea {
  id: string;
  userId: string;
  expertiseAreaId: string;
  user?: User;
  expertiseArea?: ExpertiseArea;
}

export interface CreateUserExpertiseAreaRequest {
  userId: string;
  expertiseAreaId: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth Context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

