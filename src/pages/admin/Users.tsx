
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Edit, 
  UserX, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Info,
  CheckCircle,
  XCircle,
  Mail
} from 'lucide-react';

// Mock user data
const mockUsers = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['user', 'seller', 'moderator'][Math.floor(Math.random() * 3)],
  status: ['active', 'inactive', 'banned'][Math.floor(Math.random() * 3)],
  registrationDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  lastLogin: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  productsCount: Math.floor(Math.random() * 20),
  ordersCount: Math.floor(Math.random() * 50),
}));

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check admin auth
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/auth');
    }
  }, [navigate]);
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [banDuration, setBanDuration] = useState('7'); // days
  
  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'banned':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
    }
  };
  
  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'seller':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800/20 dark:text-slate-300';
    }
  };
  
  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };
  
  const handleBanUser = (user: any) => {
    setSelectedUser(user);
    setIsBanDialogOpen(true);
  };
  
  const handleSubmitBan = () => {
    if (!banReason.trim()) {
      toast({
        title: t('error'),
        description: t('reason_required'),
        variant: 'destructive',
      });
      return;
    }
    
    // In a real app, this would call the API to ban the user
    toast({
      title: t('user_banned'),
      description: t('user_banned_success'),
    });
    
    setIsBanDialogOpen(false);
    setBanReason('');
    setBanDuration('7');
  };
  
  const handleSendEmail = (userId: number) => {
    toast({
      title: t('email_notification'),
      description: t('email_sent_success'),
    });
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('user_management')}</h1>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search_users')}
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>{t('user')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('products')}</TableHead>
                <TableHead>{t('orders')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeStyles(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeStyles(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.productsCount}</TableCell>
                  <TableCell>{user.ordersCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(user)}>
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleBanUser(user)}>
                        <UserX className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleSendEmail(user.id)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {t('showing')} {startIndex + 1} {t('to')} {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} {t('of')} {filteredUsers.length} {t('users')}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNumber = i + 1;
                  if (totalPages > 5 && page > 3) {
                    pageNumber = Math.min(page + i - 2, totalPages - 4 + i);
                  }
                  return (
                    <Button
                      key={pageNumber}
                      variant={page === pageNumber ? "default" : "outline"}
                      size="icon"
                      onClick={() => setPage(pageNumber)}
                      className="h-8 w-8"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* User Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('user_details')}</DialogTitle>
            <DialogDescription>
              {t('user_details_desc')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('user_id')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('name')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('email')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('role')}:</p>
                  <Badge className={getRoleBadgeStyles(selectedUser.role)}>
                    {selectedUser.role}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('status')}:</p>
                  <Badge className={getStatusBadgeStyles(selectedUser.status)}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('registration_date')}:</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedUser.registrationDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('last_login')}:</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedUser.lastLogin).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('products_count')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.productsCount}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('orders_count')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.ordersCount}</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium">{t('actions')}:</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      handleBanUser(selectedUser);
                    }}
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    {selectedUser.status === 'banned' ? t('unban_user') : t('ban_user')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: t('change_role'),
                        description: t('feature_coming_soon'),
                      });
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    {t('change_role')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSendEmail(selectedUser.id)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {t('send_email')}
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              {t('close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Ban User Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.status === 'banned' ? t('unban_user') : t('ban_user')}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === 'banned' 
                ? t('unban_user_desc') 
                : t('ban_user_desc')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-4">
              {selectedUser.status !== 'banned' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('ban_reason')}:</label>
                    <Textarea
                      placeholder={t('enter_ban_reason')}
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('ban_duration')}:</label>
                    <Select 
                      value={banDuration} 
                      onValueChange={setBanDuration}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_duration')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">{t('one_day')}</SelectItem>
                        <SelectItem value="7">{t('one_week')}</SelectItem>
                        <SelectItem value="30">{t('one_month')}</SelectItem>
                        <SelectItem value="90">{t('three_months')}</SelectItem>
                        <SelectItem value="365">{t('one_year')}</SelectItem>
                        <SelectItem value="permanent">{t('permanent')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium">
                      <input type="checkbox" className="mr-2" />
                      {t('notify_user_email')}
                    </label>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <p>{t('confirm_unban_user')}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('user_email')}: {selectedUser.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
              <XCircle className="mr-2 h-4 w-4" />
              {t('cancel')}
            </Button>
            <Button 
              variant={selectedUser?.status === 'banned' ? "default" : "destructive"} 
              onClick={handleSubmitBan}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {selectedUser?.status === 'banned' ? t('confirm_unban') : t('confirm_ban')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Users;
