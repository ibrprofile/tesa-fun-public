
import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, MapPin, Calendar as CalendarIcon, Package, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard, { Product } from '../Home/ProductCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock user data
const mockUser = {
  id: 201,
  name: "Maria Smith",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  location: "Moscow, Russia",
  joined: "2023-01-15T10:30:00",
  bio: "Digital artist and designer. Creator of unique digital collectibles and virtual items.",
  stats: {
    products: 24,
    sales: 156,
    rating: 4.8
  }
};

// Mock user products
const mockProducts: Product[] = [
  {
    id: 101,
    title: "Diamond Star Collection",
    titleRu: "Коллекция Бриллиантовых Звезд",
    titleEn: "Diamond Star Collection",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1000",
    seller: {
      name: mockUser.name,
      avatar: mockUser.avatar
    },
    likes: 312,
    views: 1567,
    category: "Stars",
    categoryRu: "Звезды",
    categoryEn: "Stars"
  },
  {
    id: 102,
    title: "Celebration Gift Set",
    titleRu: "Праздничный Подарочный Набор",
    titleEn: "Celebration Gift Set",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000",
    seller: {
      name: mockUser.name,
      avatar: mockUser.avatar
    },
    likes: 178,
    views: 845,
    category: "Gifts",
    categoryRu: "Подарки",
    categoryEn: "Gifts"
  },
  {
    id: 103,
    title: "Premium VIP Package",
    titleRu: "Премиальный VIP-Пакет",
    titleEn: "Premium VIP Package",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000",
    seller: {
      name: mockUser.name,
      avatar: mockUser.avatar
    },
    likes: 231,
    views: 1089,
    category: "Premium",
    categoryRu: "Премиум",
    categoryEn: "Premium"
  }
];

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { t, language } = useLanguage();
  
  // In a real app, we would fetch user data based on userId
  // For now, we'll use the mock data
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 py-8">
      {/* User Profile Header */}
      <div className="glass rounded-xl overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-primary/30 to-primary/10"></div>
        
        <div className="px-6 py-6 -mt-16">
          <div className="flex flex-col md:flex-row md:items-end">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="mt-4 md:mt-0 md:ml-6 md:mb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                <Badge variant="outline" className="w-fit">
                  {t('seller')}
                </Badge>
              </div>
              <p className="text-foreground/70 mt-1 flex items-center">
                <MapPin size={16} className="mr-1" /> {mockUser.location}
              </p>
              <p className="text-sm text-foreground/60 mt-1 flex items-center">
                <CalendarIcon size={16} className="mr-1" /> 
                {`${t('member_since')} ${new Date(mockUser.joined).toLocaleDateString(
                  language === 'ru' ? 'ru-RU' : 'en-US', 
                  { year: 'numeric', month: 'long' }
                )}`}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-auto">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare size={16} className="mr-2" /> 
                  {t('messages')}
                </Button>
                <Button size="sm">
                  {t('view_details')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* User stats */}
        <div className="flex border-t border-border">
          <div className="flex-1 py-3 text-center">
            <p className="text-lg font-semibold">{mockUser.stats.products}</p>
            <p className="text-xs text-foreground/70">{t('products')}</p>
          </div>
          <div className="flex-1 py-3 text-center border-x border-border">
            <p className="text-lg font-semibold">{mockUser.stats.sales}</p>
            <p className="text-xs text-foreground/70">{t('orders')}</p>
          </div>
          <div className="flex-1 py-3 text-center">
            <p className="text-lg font-semibold">{mockUser.stats.rating}</p>
            <p className="text-xs text-foreground/70">{t('rating')}</p>
          </div>
        </div>
      </div>
      
      {/* User bio */}
      <div className="glass rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">{t('about')}</h2>
        <p className="text-foreground/80">{mockUser.bio}</p>
      </div>
      
      {/* User products */}
      <div>
        <h2 className="text-xl font-bold mb-6">{t('products')}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
