
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI, User } from '@/api';
import { useToast } from '@/components/ui/use-toast';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  password: string;
}

export const useAuth = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Мутация для входа
  const login = useMutation({
    mutationFn: (data: LoginData) => authAPI.login(data.email, data.password),
    onSuccess: (response) => {
      if (response.success && response.user) {
        setIsAuthenticated(true);
        setCurrentUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        toast({
          title: "Вход выполнен успешно",
          description: `Добро пожаловать, ${response.user.firstName}!`,
          variant: "default",
        });
        
        return response.user;
      } else {
        toast({
          title: "Ошибка входа",
          description: response.message || "Неверный email или пароль",
          variant: "destructive",
        });
        
        throw new Error(response.message || "Ошибка входа");
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка входа",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Мутация для регистрации
  const register = useMutation({
    mutationFn: (data: RegisterData) => authAPI.register(data),
    onSuccess: (response) => {
      if (response.success && response.user) {
        setIsAuthenticated(true);
        setCurrentUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        toast({
          title: "Регистрация успешна",
          description: `Добро пожаловать, ${response.user.firstName}!`,
          variant: "default",
        });
        
        return response.user;
      } else {
        toast({
          title: "Ошибка регистрации",
          description: response.message || "Не удалось зарегистрироваться",
          variant: "destructive",
        });
        
        throw new Error(response.message || "Ошибка регистрации");
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка регистрации",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Мутация для сброса пароля
  const resetPassword = useMutation({
    mutationFn: (email: string) => authAPI.resetPassword(email),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Сброс пароля",
          description: response.message,
          variant: "default",
        });
        
        return true;
      } else {
        toast({
          title: "Ошибка сброса пароля",
          description: response.message || "Не удалось сбросить пароль",
          variant: "destructive",
        });
        
        throw new Error(response.message || "Ошибка сброса пароля");
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка сброса пароля",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Выход из системы
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из аккаунта",
      variant: "default",
    });
  };
  
  return {
    isAuthenticated,
    currentUser,
    login,
    register,
    resetPassword,
    logout
  };
};
