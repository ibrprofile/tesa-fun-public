
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock news data
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
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1000"
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
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000"
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
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000"
  }
];

const News = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const handleReadMore = (newsId: number) => {
    toast({
      title: t('feature_not_available'),
      description: t('feature_coming_soon'),
    });
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-24 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 page-transition-in">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">{t('news_and_updates')}</h1>
          <p className="text-muted-foreground">
            {t('latest_news_desc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {mockNews.map((news) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title[language as keyof typeof news.title] || news.title.en}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {news.title[language as keyof typeof news.title] || news.title.en}
                  </CardTitle>
                  <Badge>
                    {news.category[language as keyof typeof news.category] || news.category.en}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(news.date).toLocaleDateString(
                    language === 'ru' ? 'ru-RU' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="line-clamp-3 text-foreground/80">
                  {news.content[language as keyof typeof news.content] || news.content.en}
                </p>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => handleReadMore(news.id)}
                  className="w-full"
                >
                  {t('read_more')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default News;
