'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Project } from '@/types';
import { projectService } from '@/services';
import { Plus, Search, Filter, Calendar, Users } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilDeadline < 0) return 'destructive';
    if (daysUntilDeadline <= 7) return 'warning';
    return 'success';
  };

  const getStatusText = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilDeadline < 0) return 'Atrasado';
    if (daysUntilDeadline <= 7) return 'Urgente';
    return 'No Prazo';
  };

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Plataforma de E-commerce',
      description: 'Desenvolvimento de uma nova plataforma de vendas online para o cliente X.',
      technologies: ['NestJS', 'Next.js', 'PostgreSQL', 'Docker'],
      deadline: '2025-09-15T12:00:00.000Z',
    },
    {
      id: '2',
      name: 'Sistema de CRM',
      description: 'Sistema de gestão de relacionamento com clientes.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      deadline: '2025-10-20T12:00:00.000Z',
    },
    {
      id: '3',
      name: 'App Mobile de Delivery',
      description: 'Aplicativo mobile para delivery de comida.',
      technologies: ['React Native', 'Firebase', 'Stripe'],
      deadline: '2025-08-30T12:00:00.000Z',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  const filteredProjects = displayProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const status = getStatusText(project.deadline);
    return matchesSearch && status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
            <p className="text-gray-600">Gerencie todos os projetos da empresa</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar projetos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  Todos
                </Button>
                <Button
                  variant={filterStatus === 'urgente' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('urgente')}
                >
                  Urgentes
                </Button>
                <Button
                  variant={filterStatus === 'atrasado' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('atrasado')}
                >
                  Atrasados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando projetos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={getStatusColor(project.deadline)}>
                      {getStatusText(project.deadline)}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Technologies */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Tecnologias:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                    </div>

                    {/* Team (mock data) */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Equipe
                      </div>
                      <div className="flex -space-x-2">
                        <Avatar size="sm" fallback="JD" />
                        <Avatar size="sm" fallback="MS" />
                        <Avatar size="sm" fallback="AB" />
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                          +3
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum projeto encontrado.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

