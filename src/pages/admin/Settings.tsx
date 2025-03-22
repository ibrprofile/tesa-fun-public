
import React, { useState } from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // General settings
  const [siteName, setSiteName] = useState('Digital Marketplace');
  const [siteDescription, setSiteDescription] = useState('Buy and sell digital goods');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  
  // Email settings
  const [smtpHost, setSmtpHost] = useState('smtp.example.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('user@example.com');
  const [smtpPass, setSmtpPass] = useState('');
  const [fromEmail, setFromEmail] = useState('noreply@example.com');
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [passwordPolicy, setPasswordPolicy] = useState('medium');
  
  const handleSave = (section: string) => {
    // In a real app, this would save the settings to the server
    toast({
      title: t('settings_saved'),
      description: `${section} ${t('settings_saved_success')}`,
    });
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{t('admin_settings')}</h1>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">{t('general')}</TabsTrigger>
            <TabsTrigger value="email">{t('email')}</TabsTrigger>
            <TabsTrigger value="security">{t('security')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>{t('general_settings')}</CardTitle>
                <CardDescription>
                  {t('general_settings_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">{t('site_name')}</Label>
                  <Input
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">{t('site_description')}</Label>
                  <Input
                    id="site-description"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">{t('maintenance_mode')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('maintenance_mode_desc')}
                      </p>
                    </div>
                    <Switch
                      id="maintenance-mode"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="user-registration">{t('user_registration')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('user_registration_desc')}
                      </p>
                    </div>
                    <Switch
                      id="user-registration"
                      checked={userRegistration}
                      onCheckedChange={setUserRegistration}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSave('General')}>
                  {t('save_changes')}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>{t('email_settings')}</CardTitle>
                <CardDescription>
                  {t('email_settings_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">{t('smtp_host')}</Label>
                    <Input
                      id="smtp-host"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">{t('smtp_port')}</Label>
                    <Input
                      id="smtp-port"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">{t('smtp_username')}</Label>
                    <Input
                      id="smtp-user"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">{t('smtp_password')}</Label>
                    <Input
                      id="smtp-pass"
                      type="password"
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from-email">{t('from_email')}</Label>
                  <Input
                    id="from-email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('from_email_desc')}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="mr-2">
                    {t('test_email')}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSave('Email')}>
                  {t('save_changes')}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>{t('security_settings')}</CardTitle>
                <CardDescription>
                  {t('security_settings_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">{t('two_factor_auth')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('two_factor_auth_desc')}
                    </p>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">{t('session_timeout')}</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="session-timeout"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      type="number"
                      min="1"
                      className="w-20"
                    />
                    <span>{t('minutes')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('session_timeout_desc')}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>{t('password_policy')}</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="password-low" className="flex items-center space-x-2 cursor-pointer">
                      <input
                        id="password-low"
                        type="radio"
                        name="password-policy"
                        value="low"
                        checked={passwordPolicy === 'low'}
                        onChange={() => setPasswordPolicy('low')}
                        className="h-4 w-4"
                      />
                      <span>{t('low')}</span>
                    </Label>
                    
                    <Label htmlFor="password-medium" className="flex items-center space-x-2 cursor-pointer">
                      <input
                        id="password-medium"
                        type="radio"
                        name="password-policy"
                        value="medium"
                        checked={passwordPolicy === 'medium'}
                        onChange={() => setPasswordPolicy('medium')}
                        className="h-4 w-4"
                      />
                      <span>{t('medium')}</span>
                    </Label>
                    
                    <Label htmlFor="password-high" className="flex items-center space-x-2 cursor-pointer">
                      <input
                        id="password-high"
                        type="radio"
                        name="password-policy"
                        value="high"
                        checked={passwordPolicy === 'high'}
                        onChange={() => setPasswordPolicy('high')}
                        className="h-4 w-4"
                      />
                      <span>{t('high')}</span>
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('password_policy_desc')}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSave('Security')}>
                  {t('save_changes')}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
