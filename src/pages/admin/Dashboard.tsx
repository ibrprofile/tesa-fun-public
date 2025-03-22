
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminLayout from '@/components/Admin/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ShoppingBag, DollarSign, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{t('dashboard')}</h1>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('total_users')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,354</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('total_products')}</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,876</div>
              <p className="text-xs text-muted-foreground mt-1">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('total_sales')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$23,456</div>
              <p className="text-xs text-muted-foreground mt-1">
                +17.9% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent activity section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('recent_activity')}</CardTitle>
            <CardDescription>
              Recent transactions and user activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-start gap-4 pb-4 last:pb-0 last:border-0 border-b border-border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New order #{1000 + i} received
                    </p>
                    <p className="text-sm text-muted-foreground">
                      User {['John D.', 'Alice S.', 'Robert M.', 'Emma L.', 'Michael K.'][i]} ordered Premium Package
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 3600000).toLocaleString()}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(49.99 + i * 10).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <button className="text-sm text-primary">View all activity</button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
