
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
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react';

// Mock news data (same as in the main News page)
const mockNews = [
  {
    id: 1,
    title: {
      en: "New Categories Added",
      ru: "Добавлены новые категории"
    },
    content: {
      en: "We've added several new product categories to help you find what you're looking for faster. Check out the marketplace to see all the new options!",
      ru: "Мы добавили несколько новых категорий товаров, чтобы помочь вам быстрее найти то, что вы ищете. Посетите маркетплейс, чтобы увидеть все новые возможности!"
    },
    date: "2023-12-15T10:30:00",
    category: {
      en: "Announcement",
      ru: "Объявление"
    },
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1000",
    status: "published"
  },
  {
    id: 2,
    title: {
      en: "Holiday Season Sale",
      ru: "Праздничная распродажа"
    },
    content: {
      en: "Get ready for our biggest sale of the year! From December 20th to January 10th, enjoy discounts of up to 50% on selected items.",
      ru: "Готовьтесь к нашей самой большой распродаже года! С 20 декабря по 10 января наслаждайтесь скидками до 50% на избранные товары."
    },
    date: "2023-12-10T14:45:00",
    category: {
      en: "Promotion",
      ru: "Акция"
    },
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000",
    status: "published"
  },
  {
    id: 3,
    title: {
      en: "New Payment Methods",
      ru: "Новые способы оплаты"
    },
    content: {
      en: "We're excited to announce that we've added new payment methods to make your shopping experience even more convenient. Now you can pay with cryptocurrencies and international payment systems.",
      ru: "Мы рады сообщить, что добавили новые способы оплаты, чтобы сделать ваш шоппинг еще более удобным. Теперь вы можете оплачивать криптовалютами и международными платежными системами."
    },
    date: "2023-12-05T09:20:00",
    category: {
      en: "Feature",
      ru: "Новая функция"
    },
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000",
    status: "draft"
  }
];

const NewsManagement = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const handleCreateNews = () => {
    toast({
      title: t('feature_not_available'),
      description: t('feature_coming_soon'),
    });
  };
  
  const handleEditNews = (newsId: number) => {
    toast({
      title: t('feature_not_available'),
      description: t('feature_coming_soon'),
    });
  };
  
  const handleDeleteNews = (newsId: number) => {
    toast({
      title: t('feature_not_available'),
      description: t('feature_coming_soon'),
    });
  };
  
  const handlePreviewNews = (newsId: number) => {
    toast({
      title: t('feature_not_available'),
      description: t('feature_coming_soon'),
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('news_management')}</h1>
          
          <Button onClick={handleCreateNews}>
            <Plus className="mr-2 h-4 w-4" />
            {t('create_news')}
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">{t('all_news')}</TabsTrigger>
            <TabsTrigger value="published">{t('published')}</TabsTrigger>
            <TabsTrigger value="drafts">{t('drafts')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {mockNews.map((news) => (
              <Card key={news.id}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{news.title[language as keyof typeof news.title] || news.title.en}</CardTitle>
                      <CardDescription className="mt-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(news.date)}
                        <span className="mx-2">•</span>
                        <Tag className="h-4 w-4 mr-1" />
                        {news.category[language as keyof typeof news.category] || news.category.en}
                      </CardDescription>
                    </div>
                    <div className="bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary">
                      {news.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                      <img 
                        src={news.image} 
                        alt={news.title[language as keyof typeof news.title] || news.title.en}
                        className="w-full h-auto rounded-md object-cover aspect-video"
                      />
                    </div>
                    <div className="w-full md:w-3/4">
                      <p className="line-clamp-3 text-foreground/80">
                        {news.content[language as keyof typeof news.content] || news.content.en}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreviewNews(news.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {t('preview')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditNews(news.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {t('edit')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteNews(news.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('delete')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="published" className="space-y-4">
            {mockNews.filter(news => news.status === 'published').map((news) => (
              <Card key={news.id}>
                {/* Similar card content as above */}
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{news.title[language as keyof typeof news.title] || news.title.en}</CardTitle>
                      <CardDescription className="mt-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(news.date)}
                        <span className="mx-2">•</span>
                        <Tag className="h-4 w-4 mr-1" />
                        {news.category[language as keyof typeof news.category] || news.category.en}
                      </CardDescription>
                    </div>
                    <div className="bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary">
                      {news.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                      <img 
                        src={news.image} 
                        alt={news.title[language as keyof typeof news.title] || news.title.en}
                        className="w-full h-auto rounded-md object-cover aspect-video"
                      />
                    </div>
                    <div className="w-full md:w-3/4">
                      <p className="line-clamp-3 text-foreground/80">
                        {news.content[language as keyof typeof news.content] || news.content.en}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreviewNews(news.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {t('preview')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditNews(news.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {t('edit')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteNews(news.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('delete')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-4">
            {mockNews.filter(news => news.status === 'draft').map((news) => (
              <Card key={news.id}>
                {/* Similar card content as above */}
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{news.title[language as keyof typeof news.title] || news.title.en}</CardTitle>
                      <CardDescription className="mt-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(news.date)}
                        <span className="mx-2">•</span>
                        <Tag className="h-4 w-4 mr-1" />
                        {news.category[language as keyof typeof news.category] || news.category.en}
                      </CardDescription>
                    </div>
                    <div className="bg-muted rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
                      {news.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                      <img 
                        src={news.image} 
                        alt={news.title[language as keyof typeof news.title] || news.title.en}
                        className="w-full h-auto rounded-md object-cover aspect-video"
                      />
                    </div>
                    <div className="w-full md:w-3/4">
                      <p className="line-clamp-3 text-foreground/80">
                        {news.content[language as keyof typeof news.content] || news.content.en}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreviewNews(news.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {t('preview')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditNews(news.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {t('edit')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteNews(news.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('delete')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default NewsManagement;
