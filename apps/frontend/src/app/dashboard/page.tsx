'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { FolderOpen, CheckSquare, Users, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Projetos Ativos',
      value: '12',
      description: 'Projetos em andamento',
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Tarefas Pendentes',
      value: '28',
      description: 'Tarefas aguardando conclusão',
      icon: CheckSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Membros da Equipe',
      value: '45',
      description: 'Colaboradores ativos',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Prazos Próximos',
      value: '5',
      description: 'Entregas nos próximos 7 dias',
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const recentProjects = [
    {
      id: '1',
      name: 'Plataforma de E-commerce',
      status: 'Em Andamento',
      progress: 75,
      deadline: '2025-09-15',
      team: 8,
    },
    {
      id: '2',
      name: 'Sistema de CRM',
      status: 'Planejamento',
      progress: 25,
      deadline: '2025-10-20',
      team: 5,
    },
    {
      id: '3',
      name: 'App Mobile',
      status: 'Em Andamento',
      progress: 60,
      deadline: '2025-08-30',
      team: 6,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo das suas atividades e projetos.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Projetos Recentes</CardTitle>
            <CardDescription>
              Acompanhe o progresso dos seus projetos mais importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge
                        variant={project.status === 'Em Andamento' ? 'default' : 'secondary'}
                      >
                        {project.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {project.team} membros
                      </span>
                      <span className="text-sm text-gray-500">
                        Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {project.progress}%
                      </p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

