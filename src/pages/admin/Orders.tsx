
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Download
} from 'lucide-react';

// Mock orders data
const mockOrders = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  orderNumber: `ORD-${100000 + i}`,
  customerId: Math.floor(Math.random() * 100) + 1,
  customerName: `Customer ${Math.floor(Math.random() * 100) + 1}`,
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  total: parseFloat((10 + Math.random() * 200).toFixed(2)),
  status: ['completed', 'processing', 'pending', 'cancelled'][Math.floor(Math.random() * 4)],
  items: Math.floor(Math.random() * 5) + 1,
  paymentMethod: ['Credit Card', 'PayPal', 'Bank Transfer', 'Crypto'][Math.floor(Math.random() * 4)],
}));

const ITEMS_PER_PAGE = 10;

const Orders = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  
  // Filter orders based on search term
  const filteredOrders = mockOrders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
    }
  };
  
  const handleViewOrder = (orderId: number) => {
    // В реальном приложении здесь был бы переход к деталям заказа
    navigate(`/admin/orders/${orderId}`);
  };
  
  const handleExportOrders = async () => {
    try {
      setIsExporting(true);
      
      // Имитация экспорта данных в CSV
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Создаем CSV содержимое
      const headers = ["Order Number", "Customer", "Date", "Items", "Total", "Payment Method", "Status"];
      const rows = filteredOrders.map(order => [
        order.orderNumber,
        order.customerName,
        new Date(order.date).toLocaleDateString(),
        order.items.toString(),
        `$${order.total.toFixed(2)}`,
        order.paymentMethod,
        order.status
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // Создаем и скачиваем файл
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: t('export_success'),
        description: t('export_completed_successfully'),
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: t('export_error'),
        description: t('export_failed_try_again'),
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const navigate = useNavigate();
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('orders_management')}</h1>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search_orders')}
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleExportOrders}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {t('exporting')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {t('export')}
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('order_number')}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('items')}</TableHead>
                <TableHead>{t('total')}</TableHead>
                <TableHead>{t('payment_method')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeStyles(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {t('showing')} {startIndex + 1} {t('to')} {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} {t('of')} {filteredOrders.length} {t('orders')}
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
    </AdminLayout>
  );
};

export default Orders;
