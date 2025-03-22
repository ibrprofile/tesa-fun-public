
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, MessageSquare, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/context/LanguageContext';
import NotificationDropdown from './NotificationDropdown';
import LanguageSwitcher from './LanguageSwitcher';

// Checks if the user is authenticated (mock implementation)
const useAuth = () => {
  // This is just a placeholder, in a real app, this would check for a token or session
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // For demo purposes, let's say the user is authenticated
  useEffect(() => {
    setIsAuthenticated(true);
  }, []);
  
  return { isAuthenticated };
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary" onClick={closeMenu}>
            TESA Fun
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {t('home')}
              </Link>
              <Link 
                to="/marketplace" 
                className={`text-sm font-medium transition-colors ${isActive('/marketplace') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {t('marketplace')}
              </Link>
              <Link 
                to="/add-product" 
                className={`text-sm font-medium transition-colors ${isActive('/add-product') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {t('add_product')}
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/admin" 
                  className={`text-sm font-medium transition-colors ${isActive('/admin') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
                >
                  {t('admin')}
                </Link>
              )}
            </div>
          )}
          
          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Search (Desktop) */}
            {!isMobile && (
              <Button variant="ghost" size="icon" aria-label={t('search')}>
                <Search size={18} />
              </Button>
            )}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? t('light_mode') : t('dark_mode')}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            {/* User Not Authenticated */}
            {!isAuthenticated && !isMobile && (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="ghost">{t('sign_in')}</Button>
                </Link>
                <Link to="/auth">
                  <Button>{t('sign_up')}</Button>
                </Link>
              </div>
            )}
            
            {/* User Authenticated */}
            {isAuthenticated && !isMobile && (
              <div className="flex items-center space-x-2">
                <Link to="/messages">
                  <Button variant="ghost" size="icon" aria-label={t('messages')}>
                    <MessageSquare size={18} />
                  </Button>
                </Link>
                
                <NotificationDropdown />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                        <AvatarFallback>ЮП</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">{t('profile')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/messages" className="cursor-pointer">{t('messages')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/add-product" className="cursor-pointer">{t('add_product')}</Link>
                    </DropdownMenuItem>
                    {isAuthenticated && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">{t('admin')}</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">{t('logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            )}
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 pt-20 bg-background/95 z-40 animate-in fade-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-8 flex flex-col h-full">
            <div className="space-y-6 flex-1">
              <Link to="/" className="block text-lg font-medium" onClick={closeMenu}>
                {t('home')}
              </Link>
              <Link to="/marketplace" className="block text-lg font-medium" onClick={closeMenu}>
                {t('marketplace')}
              </Link>
              <Link to="/add-product" className="block text-lg font-medium" onClick={closeMenu}>
                {t('add_product')}
              </Link>
              {isAuthenticated && (
                <Link to="/admin" className="block text-lg font-medium" onClick={closeMenu}>
                  {t('admin')}
                </Link>
              )}
              
              <div className="pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center py-3" onClick={closeMenu}>
                      <User size={20} className="mr-3" />
                      <span>{t('profile')}</span>
                    </Link>
                    <Link to="/messages" className="flex items-center py-3" onClick={closeMenu}>
                      <MessageSquare size={20} className="mr-3" />
                      <span>{t('messages')}</span>
                    </Link>
                  </>
                ) : (
                  <div className="space-y-4 pt-4">
                    <Link to="/auth" onClick={closeMenu}>
                      <Button className="w-full">{t('sign_in')}</Button>
                    </Link>
                    <Link to="/auth" onClick={closeMenu}>
                      <Button variant="outline" className="w-full">{t('sign_up')}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-6 border-t border-border mt-auto">
              <button className="flex items-center py-3 w-full text-left" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <>
                    <Sun size={20} className="mr-3" />
                    <span>{t('light_mode')}</span>
                  </>
                ) : (
                  <>
                    <Moon size={20} className="mr-3" />
                    <span>{t('dark_mode')}</span>
                  </>
                )}
              </button>
              {isAuthenticated && (
                <button className="flex items-center py-3 w-full text-left text-destructive">
                  <LogOut size={20} className="mr-3" />
                  <span>{t('logout')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
