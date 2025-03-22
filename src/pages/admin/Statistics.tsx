
import React, { useState } from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Calendar
} from 'lucide-react';

// Mock data for charts
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
  { name: 'Aug', sales: 4000 },
  { name: 'Sep', sales: 4500 },
  { name: 'Oct', sales: 5200 },
  { name: 'Nov', sales: 6000 },
  { name: 'Dec', sales: 7000 },
];

const categoryData = [
  { name: 'Stars', value: 400 },
  { name: 'Gifts', value: 300 },
  { name: 'Sets', value: 200 },
  { name: 'Premium', value: 278 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const userActivityData = [
  { name: 'Mon', visits: 4000, purchases: 2400 },
  { name: 'Tue', visits: 3000, purchases: 1398 },
  { name: 'Wed', visits: 2000, purchases: 9800 },
  { name: 'Thu', visits: 2780, purchases: 3908 },
  { name: 'Fri', visits: 1890, purchases: 4800 },
  { name: 'Sat', visits: 2390, purchases: 3800 },
  { name: 'Sun', visits: 3490, purchases: 4300 },
];

const Statistics = () => {
  const { t } = useLanguage();
  const [period, setPeriod] = useState('month');
  
  // In a real app, we would fetch data based on the selected period
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('statistics')}</h1>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('select_period')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">{t('last_week')}</SelectItem>
                <SelectItem value="month">{t('last_month')}</SelectItem>
                <SelectItem value="quarter">{t('last_quarter')}</SelectItem>
                <SelectItem value="year">{t('last_year')}</SelectItem>
                <SelectItem value="all">{t('all_time')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {t('export_report')}
            </Button>
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('total_sales')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$23,456</div>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-green-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  17.9%
                </span>
                <span className="text-muted-foreground">
                  {t('from_last_period')}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('total_orders')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-green-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.2%
                </span>
                <span className="text-muted-foreground">
                  {t('from_last_period')}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('new_users')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-green-500 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12.5%
                </span>
                <span className="text-muted-foreground">
                  {t('from_last_period')}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('conversion_rate')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6%</div>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-red-500 flex items-center mr-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  0.8%
                </span>
                <span className="text-muted-foreground">
                  {t('from_last_period')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="sales" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="sales">{t('sales')}</TabsTrigger>
            <TabsTrigger value="users">{t('users')}</TabsTrigger>
            <TabsTrigger value="products">{t('products')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>{t('sales_overview')}</CardTitle>
                <CardDescription>
                  {t('sales_overview_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>{t('user_activity')}</CardTitle>
                <CardDescription>
                  {t('user_activity_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visits" fill="#8884d8" />
                      <Bar dataKey="purchases" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>{t('products_by_category')}</CardTitle>
                <CardDescription>
                  {t('products_by_category_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Statistics;
