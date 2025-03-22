
import React, { useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Premium Star Package",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000",
    seller: {
      name: "StarShop",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    likes: 245,
    views: 1204,
    category: "Stars"
  },
  {
    id: 2,
    title: "Deluxe Gift Box",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000",
    seller: {
      name: "GiftMaster",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    likes: 189,
    views: 876,
    category: "Gifts"
  },
  {
    id: 3,
    title: "VIP Diamond Stars",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000",
    seller: {
      name: "DiamondVIP",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    likes: 421,
    views: 2304,
    category: "Stars"
  },
  {
    id: 4,
    title: "Birthday Surprise Pack",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?q=80&w=1000",
    seller: {
      name: "CelebrationPlus",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    likes: 156,
    views: 912,
    category: "Gifts"
  },
  {
    id: 5,
    title: "Golden Star Collection",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1000",
    seller: {
      name: "GoldenTouch",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    likes: 312,
    views: 1567,
    category: "Stars"
  },
  {
    id: 6,
    title: "Celebration Gift Set",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000",
    seller: {
      name: "PartyPlace",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg"
    },
    likes: 178,
    views: 845,
    category: "Gifts"
  }
];

// Categories for filter
const categories = ["All", "Stars", "Gifts"];

interface ProductGridProps {
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title = "Featured Products", 
  subtitle = "Discover our most popular virtual items" 
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      if (selectedCategory === "All") {
        setFilteredProducts(mockProducts);
      } else {
        setFilteredProducts(
          mockProducts.filter(product => product.category === selectedCategory)
        );
      }
      setLoading(false);
    }, 500);
  }, [selectedCategory]);
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{subtitle}</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mt-8 gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground/70 hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                featured={index === 0}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
