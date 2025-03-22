
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export interface Product {
  id: number;
  title: string;
  titleRu?: string;
  titleEn?: string;
  price: number;
  image: string;
  seller: {
    name: string;
    avatar: string;
  };
  likes: number;
  views: number;
  category: string;
  categoryRu?: string;
  categoryEn?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  featured?: boolean;
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className,
  featured = false,
  style
}) => {
  const { language, t, selectedCurrency } = useLanguage();
  
  // Get localized title and category
  const title = language === 'ru' 
    ? (product.titleRu || product.title) 
    : (product.titleEn || product.title);
    
  const category = language === 'ru'
    ? (product.categoryRu || product.category)
    : (product.categoryEn || product.category);
  
  // Format price with currency symbol if available
  const formattedPrice = selectedCurrency 
    ? `${selectedCurrency.symbol}${product.price.toFixed(2)}`
    : `$${product.price.toFixed(2)}`;
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group block overflow-hidden rounded-xl transition-all duration-300",
        featured ? "lg:row-span-2 lg:col-span-2" : "",
        className
      )}
      style={style}
    >
      <div className="relative h-full glass glass-hover border overflow-hidden">
        {/* Product Image */}
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img 
            src={product.image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs rounded-md bg-background/70 backdrop-blur-md">
            {category}
          </span>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img 
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-xs text-foreground/70">
                {product.seller.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-xs text-foreground/70">
                <Heart size={14} className="mr-1" />
                {product.likes}
              </span>
              <span className="flex items-center text-xs text-foreground/70">
                <Eye size={14} className="mr-1" />
                {product.views}
              </span>
            </div>
          </div>
          
          <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <p className="font-semibold">
              {formattedPrice}
            </p>
            
            <button className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors">
              {t('view_details')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
