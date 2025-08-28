'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { User } from '@/types';
import { userService } from '@/services';
import { Plus, Search, UserPlus, Mail, Calendar } from 'lucide-react';

export default function TeamsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'David Silveira Freire',
      email: 'david.freire@empresa.com',
      employmentType: 'CLT',
      birthDate: '1990-05-15T00:00:00.000Z',
      roleId: '1',
      role: { id: '1', name: 'Desenvolvedor Frontend' },
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      employmentType: 'PJ',
      birthDate: '1988-03-22T00:00:00.000Z',
      roleId: '2',
      role: { id: '2', name: 'Desenvolvedor Backend' },
    },
    {
      id: '3',
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      employmentType: 'CLT',
      birthDate: '1992-11-08T00:00:00.000Z',
      roleId: '3',
      role: { id: '3', name: 'Designer UX/UI' },
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana.costa@empresa.com',
      employmentType: 'PJ',
      birthDate: '1985-07-30T00:00:00.000Z',
      roleId: '4',
      role: { id: '4', name: 'Gerente de Projetos' },
    },
  ];

  const displayUsers = users.length > 0 ? users : mockUsers;

  const filteredUsers = displayUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEmploymentTypeColor = (type: string) => {
    return type === 'CLT' ? 'success' : 'secondary';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Equipes</h1>
            <p className="text-gray-600">Gerencie colaboradores e suas informações</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Pessoas
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Equipe
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar equipes ou pessoas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* People you work with */}
        <Card>
          <CardHeader>
            <CardTitle>Pessoas com quem você trabalha</CardTitle>
            <CardDescription>
              Colaboradores ativos na empresa
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando colaboradores...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Avatar
                      fallback={user.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {user.role?.name || 'Cargo não definido'}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getEmploymentTypeColor(user.employmentType)}>
                          {user.employmentType}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          <Mail className="h-3 w-3 inline mr-1" />
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum colaborador encontrado.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Teams Section */}
        <Card>
          <CardHeader>
            <CardTitle>Equipes</CardTitle>
            <CardDescription>
              Organize colaboradores em equipes de projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Compartilhe páginas ou mencione equipes em vez de membros individuais
              </h3>
              <p className="text-gray-500 mb-6">
                Crie equipes para organizar melhor seus colaboradores e facilitar a comunicação.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar sua primeira equipe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

