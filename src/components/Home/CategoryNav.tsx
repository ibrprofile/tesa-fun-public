
import React from 'react';
import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="overflow-x-auto pb-2 mb-6">
      <div className="flex space-x-2 min-w-max">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
            selectedCategory === null
              ? "bg-primary text-white border-primary"
              : "bg-background/50 hover:bg-background/80 border-border"
          )}
        >
          Все товары
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
              selectedCategory === category.id
                ? "bg-primary text-white border-primary"
                : "bg-background/50 hover:bg-background/80 border-border"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
