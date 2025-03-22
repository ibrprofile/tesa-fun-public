
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, User, ShieldCheck } from 'lucide-react';

// Form schema
const formSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const AdminAuth = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call a backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, hardcoded admin credentials
      if (data.username === 'admin' && data.password === 'admin123') {
        // Login successful
        toast({
          title: t('login_successful'),
          description: t('welcome_admin'),
        });
        
        // Store admin session (in a real app, would use JWT tokens, etc.)
        localStorage.setItem('adminSession', JSON.stringify({
          username: data.username,
          role: 'admin',
          timestamp: new Date().toISOString(),
        }));
        
        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        // Invalid credentials
        toast({
          title: t('login_failed'),
          description: t('invalid_credentials'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('login_error'),
        description: t('try_again_later'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center">{t('admin_portal')}</h1>
          <p className="text-muted-foreground text-center mt-2">
            {t('admin_login_required')}
          </p>
        </div>
        
        <div className="glass p-6 rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('username')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder={t('enter_username')} 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder={t('enter_password')} 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={isLoading}
              >
                {isLoading ? t('logging_in') : t('login')}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('return_to')} <a href="/" className="text-primary hover:underline">{t('main_site')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
