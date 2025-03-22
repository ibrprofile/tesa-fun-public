
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productAPI, categoryAPI } from '@/api';
import { Product } from '@/components/Home/ProductCard';

interface UseProductsOptions {
  categoryId?: number;
  searchQuery?: string;
  page?: number;
  limit?: number;
}

export const useProducts = (options?: UseProductsOptions) => {
  const { categoryId, searchQuery, page = 1, limit = 10 } = options || {};
  
  return useQuery({
    queryKey: ['products', { categoryId, searchQuery, page, limit }],
    queryFn: () => productAPI.getProducts({ categoryId, searchQuery, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};

export const useProduct = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productAPI.getProductById(productId),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryAPI.getCategories(),
    staleTime: 60 * 60 * 1000, // 1 час
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productData: Partial<Product>) => productAPI.createProduct(productData),
    onSuccess: () => {
      // Инвалидируем кэш списка товаров
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, userId, text, parentCommentId }: { 
      productId: number, 
      userId: number, 
      text: string, 
      parentCommentId?: number 
    }) => productAPI.addComment(productId, userId, text, parentCommentId),
    onSuccess: (_, variables) => {
      // Инвалидируем кэш конкретного товара
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
};
