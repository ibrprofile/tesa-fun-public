
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: t('dashboard'), path: '/admin' },
    { icon: <Users size={20} />, label: t('users'), path: '/admin/users' },
    { icon: <ShoppingBag size={20} />, label: t('products'), path: '/admin/products' },
    { icon: <CreditCard size={20} />, label: t('orders'), path: '/admin/orders' },
    { icon: <BarChart3 size={20} />, label: t('statistics'), path: '/admin/statistics' },
    { icon: <Settings size={20} />, label: t('settings_admin'), path: '/admin/settings' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-10 flex flex-col border-r border-border bg-background/80 backdrop-blur-md transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 py-4">
          {!isCollapsed && (
            <Link to="/" className="text-xl font-bold text-primary">
              Admin Panel
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={isCollapsed ? "mx-auto" : ""}
          >
            <ChevronLeft size={20} className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-2 py-2.5 text-sm font-medium rounded-md",
                "transition-colors duration-200",
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="border-t border-border px-2 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex w-full items-center px-2 py-2.5 text-sm font-medium rounded-md text-foreground/70 hover:bg-muted hover:text-foreground transition-colors duration-200"
          >
            <span className="mr-3"><LogOut size={20} /></span>
            {!isCollapsed && <span>{t('back_to_site')}</span>}
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
