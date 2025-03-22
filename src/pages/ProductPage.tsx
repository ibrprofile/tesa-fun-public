
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import CommentSection from '@/components/Products/CommentSection';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Share2, ShoppingCart, MessageCircle, Star, ExternalLink } from 'lucide-react';

// Mock data for a product
const getMockProduct = (id: string) => ({
  id,
  title: {
    en: "Premium Digital Asset Bundle",
    ru: "Набор цифровых премиум-ассетов"
  },
  description: {
    en: "A comprehensive bundle of high-quality digital assets including templates, icons, fonts, and more. Perfect for designers and digital creators.",
    ru: "Полный набор высококачественных цифровых ассетов, включая шаблоны, иконки, шрифты и многое другое. Идеально подходит для дизайнеров и цифровых креаторов."
  },
  price: 49.99,
  category: {
    id: 1,
    name: {
      en: "Premium",
      ru: "Премиум"
    }
  },
  currency: "USD",
  rating: 4.9,
  reviewCount: 127,
  inStock: true,
  features: [
    {
      en: "500+ unique premium assets",
      ru: "Более 500 уникальных премиум-ассетов"
    },
    {
      en: "Regular updates with new content",
      ru: "Регулярные обновления с новым контентом"
    },
    {
      en: "Commercial usage license included",
      ru: "Включена лицензия на коммерческое использование"
    },
    {
      en: "Compatible with all major design software",
      ru: "Совместимость со всеми основными дизайнерскими программами"
    },
    {
      en: "24/7 customer support",
      ru: "Круглосуточная поддержка клиентов"
    }
  ],
  images: [
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVtcGxhdGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1611532736637-13a8bdf96127?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVtcGxhdGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlbXBsYXRlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1611075384322-d23bc5ceea11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlbXBsYXRlfGVufDB8fDB8fHww"
  ],
  seller: {
    id: "seller123",
    name: "DigitalCreationsLab",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4.8,
    productsCount: 34,
    since: "2019-06-15"
  },
  views: 2456,
  purchases: 789
});

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t, selectedCurrency } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  // Fetch product data
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getMockProduct(id || '1'),
    enabled: !!id,
  });
  
  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    });
  };
  
  const handleContactSeller = () => {
    // In a real app, this would navigate to a messaging interface with this seller pre-selected
    navigate(`/messages?seller=${product?.seller.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 container mx-auto px-4 md:px-8 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="mb-6">The product you are looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </main>
      </div>
    );
  }
  
  // Get the product title and description based on the current language
  const title = product.title[language as keyof typeof product.title] || product.title.en;
  const description = product.description[language as keyof typeof product.description] || product.description.en;
  const categoryName = product.category.name[language as keyof typeof product.category.name] || product.category.name.en;
  
  // Calculate the exchange rate (in a real app, use actual exchange rate)
  const exchangeRate = selectedCurrency && selectedCurrency.code !== 'USD' 
    ? selectedCurrency.rate 
    : 1;
  
  const formattedPrice = new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    style: 'currency',
    currency: selectedCurrency?.code || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(product.price * exchangeRate);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 pb-16 page-transition-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg overflow-hidden bg-background border aspect-video flex items-center justify-center">
              <img 
                src={selectedImage || product.images[0]} 
                alt={title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <div 
                  key={idx}
                  className={`aspect-video rounded-md overflow-hidden border cursor-pointer transition-all ${selectedImage === image ? 'ring-2 ring-primary ring-offset-2' : 'opacity-80 hover:opacity-100'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="capitalize">
                  {categoryName}
                </Badge>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
              
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Link to={`/seller/${product.seller.id}`} className="flex items-center hover:text-primary transition-colors">
                  <span className="mr-1">{t('seller')}:</span>
                  <span className="font-medium text-foreground hover:underline">{product.seller.name}</span>
                </Link>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{product.rating} ({product.reviewCount})</span>
                </div>
              </div>
            </div>
            
            <div className="text-3xl font-bold">{formattedPrice}</div>
            
            <div className="space-y-4">
              {product.inStock ? (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <Check size={18} className="mr-2" />
                  <span className="font-medium">In Stock</span>
                </div>
              ) : (
                <div className="text-red-500 font-medium">Out of Stock</div>
              )}
              
              <div className="flex flex-col space-y-2">
                <Button 
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t('buy_now')}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContactSeller}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t('contact_seller')}
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">{t('seller')}</h3>
              <Link to={`/seller/${product.seller.id}`} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <img 
                  src={product.seller.avatar} 
                  alt={product.seller.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.seller.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>{product.seller.rating} · {product.seller.productsCount} {t('products')}</span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Product Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="description">{t('description')}</TabsTrigger>
              <TabsTrigger value="features">{t('features')}</TabsTrigger>
              <TabsTrigger value="comments">{t('comments')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed">{description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>{feature[language as keyof typeof feature] || feature.en}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="comments" className="mt-6">
              <CommentSection productId={id || ''} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
