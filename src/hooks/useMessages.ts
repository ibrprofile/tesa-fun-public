
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageAPI } from '@/api';

export const useConversations = (userId: number) => {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => messageAPI.getConversations(userId),
    staleTime: 1 * 60 * 1000, // 1 минута
  });
};

export const useMessages = (conversationId: number) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => messageAPI.getMessages(conversationId),
    staleTime: 30 * 1000, // 30 секунд
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: number, content: string }) => {
      return messageAPI.sendMessage(conversationId, content);
    },
    onSuccess: (_, variables) => {
      // Инвалидируем кэш сообщений для этого разговора
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      // Инвалидируем кэш списка разговоров
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
