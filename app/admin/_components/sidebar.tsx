'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Menu as MenuIcon,
  Globe,
  BadgePercent,
  MailCheck,
  Settings,
  Store,
  Zap,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Badge } from '@/src/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import { useEstablishments } from '@/src/hooks/useEstablishments';

// Types
interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  comingSoon?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

interface NavSection {
  title?: string;
  items: {
    href: string;
    icon: React.ReactNode;
    label: string;
    comingSoon?: boolean;
  }[];
}

interface SidebarProps {
  className?: string;
}

// Fonction pour tronquer le texte si trop long
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// SidebarItem component
const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  label,
  active = false,
  comingSoon = false,
  collapsed = false,
  onClick,
}) => {
  const content = (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group',
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-modules-beige hover:bg-accent/10 hover:text-accent-foreground',
        comingSoon && 'opacity-60 pointer-events-none',
        collapsed ? 'justify-center' : 'justify-start'
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-5 h-5">{icon}</div>

      {!collapsed && (
        <div className="flex-grow flex items-center justify-between">
          <span className={cn('font-medium text-sm', active && 'font-semibold')}>{label}</span>

          {comingSoon && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary-foreground">
              Em breve
            </Badge>
          )}
        </div>
      )}
    </div>
  );

  if (comingSoon) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
};

// Composant pour un groupe de navigation
const NavGroup: React.FC<{
  section: NavSection;
  pathname: string;
  collapsed: boolean;
}> = ({ section, pathname, collapsed }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasActiveItem = section.items.some(item => pathname === item.href);

  // Si en mode collapsed, ne pas afficher le titre et toujours montrer les items
  if (collapsed) {
    return (
      <div className="space-y-1">
        {section.items.map(item => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
            comingSoon={item.comingSoon}
            collapsed={collapsed}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-4">
      {section.title && (
        <div
          className="flex items-center justify-between px-3 py-2 text-xs uppercase text-modules-beige-light/70 font-medium cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{section.title}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              isOpen ? 'transform rotate-0' : 'transform rotate-180'
            )}
          />
        </div>
      )}
      {isOpen && (
        <div className={cn('space-y-1', section.title && 'ml-2')}>
          {section.items.map(item => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
              comingSoon={item.comingSoon}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { establishments, selectedEstablishment, isLoading, setSelectedEstablishment } =
    useEstablishments();

  // Navigation items organisés par section
  const navSections: NavSection[] = [
    {
      title: 'Gestion générale',
      items: [
        { href: '/admin/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
        { href: '/admin/clients', icon: <Users />, label: 'Dados Clientes' },
      ],
    },
    {
      title: 'Présence en ligne',
      items: [
        { href: '/admin/menu', icon: <MenuIcon />, label: 'Menu' },
        { href: '/admin/online', icon: <Globe />, label: 'Profile Online' },
      ],
    },
    {
      title: 'Marketing',
      items: [
        { href: '/admin/fidelity', icon: <BadgePercent />, label: 'Fidelidade' },
        { href: '/admin/marketing', icon: <MailCheck />, label: 'Marketing' },
        { href: '/admin/automation', icon: <Zap />, label: 'Automação', comingSoon: true },
      ],
    },
    {
      title: '',
      items: [{ href: '/admin/settings', icon: <Settings />, label: 'Configurações' }],
    },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Main sidebar content
  const sidebarContent = (
    <div
      className={cn(
        'flex flex-col h-full bg-modules-soft-dark transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Establishment selector */}
      <div
        className={cn(
          'p-4 border-b border-accent/20',
          collapsed && 'flex justify-center items-center'
        )}
      >
        {collapsed ? (
          <Button variant="ghost" size="icon" className="text-modules-beige">
            <Store className="h-5 w-5" />
          </Button>
        ) : (
          <Select
            value={selectedEstablishment?.name}
            onValueChange={setSelectedEstablishment}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full bg-transparent border-accent text-modules-beige hover:bg-accent/10">
              <SelectValue placeholder="Selecionar estabelecimento">
                {selectedEstablishment?.name
                  ? truncateText(selectedEstablishment.name, 20)
                  : 'Selecionar'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {establishments.map(establishment => (
                <SelectItem key={establishment.id} value={establishment.id}>
                  {truncateText(establishment.name, 30)}
                  <span className="text-xs block text-muted-foreground">
                    {truncateText(establishment.address, 25)}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {navSections.map((section, index) => (
          <NavGroup key={index} section={section} pathname={pathname} collapsed={collapsed} />
        ))}
      </div>

      {/* Collapse/Expand button */}
      <div className="p-4 border-t border-accent/20 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="text-modules-beige hover:bg-accent/10"
        >
          {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      </div>
    </div>
  );

  // Mobile sidebar
  const mobileSidebar = (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-4 left-4 z-40 text-primary bg-background"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-w-fit  w-full border-none">
        {sidebarContent}
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">{mobileSidebar}</div>
      {/* Desktop sidebar */}
      <div className="hidden lg:block min-h-screen">{sidebarContent}</div>
    </>
  );
};

export default Sidebar;
