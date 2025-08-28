'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { 
  Home, 
  Users, 
  FolderOpen, 
  CheckSquare, 
  Settings, 
  User,
  Target,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  isCollapsed?: boolean;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Projetos',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    name: 'Tarefas',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Equipes',
    href: '/teams',
    icon: Users,
  },
  {
    name: 'Usuários',
    href: '/users',
    icon: User,
  },
  {
    name: 'Áreas de Expertise',
    href: '/expertise-areas',
    icon: Target,
  },
  {
    name: 'Relatórios',
    href: '/reports',
    icon: BarChart3,
  },
];

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      'flex h-full flex-col bg-white border-r border-gray-200',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-gray-900">ProjectHub</h1>
        ) : (
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                  isCollapsed && 'mr-0'
                )}
                aria-hidden="true"
              />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-gray-200 p-2">
        <Link
          href="/settings"
          className={cn(
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'
          )}
        >
          <Settings
            className={cn(
              'mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500',
              isCollapsed && 'mr-0'
            )}
            aria-hidden="true"
          />
          {!isCollapsed && 'Configurações'}
        </Link>
      </div>
    </div>
  );
}

