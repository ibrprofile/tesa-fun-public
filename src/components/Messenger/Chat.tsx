
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatProps {
  currentUserId: number;
  recipient: {
    id: number;
    name: string;
    avatar: string;
    status?: 'online' | 'offline';
  };
  messages: Message[];
  onSendMessage: (content: string) => void;
  onClose?: () => void;
}

const Chat: React.FC<ChatProps> = ({ 
  currentUserId, 
  recipient, 
  messages, 
  onSendMessage,
  onClose 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };
  
  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString('ru-RU');
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src={recipient.avatar} alt={recipient.name} />
            <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium">{recipient.name}</h3>
            <p className="text-xs text-foreground/60">
              {recipient.status === 'online' ? 'В сети' : 'Не в сети'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={18} />
                <span className="sr-only">Опции</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Заблокировать пользователя</DropdownMenuItem>
              <DropdownMenuItem>Пожаловаться</DropdownMenuItem>
              <DropdownMenuItem>Очистить историю</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X size={18} />
              <span className="sr-only">Закрыть</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {Object.entries(groupedMessages).map(([date, dayMessages]) => (
            <div key={date} className="space-y-3">
              <div className="flex justify-center">
                <span className="text-xs bg-secondary px-2 py-1 rounded-full text-foreground/70">
                  {formatDate(dayMessages[0].timestamp)}
                </span>
              </div>
              
              {dayMessages.map((message) => {
                const isCurrentUser = message.senderId === currentUserId;
                
                return (
                  <div 
                    key={message.id} 
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isCurrentUser ? 'bg-primary/10 rounded-l-xl rounded-tr-xl' : 'bg-secondary rounded-r-xl rounded-tl-xl'} px-3 py-2`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-primary/70' : 'text-foreground/50'}`}>
                        {formatTime(message.timestamp)}
                        {isCurrentUser && (
                          <span className="ml-1">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <div className="p-3 border-t">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button variant="ghost" size="icon" type="button" className="text-foreground/60">
            <Paperclip size={18} />
            <span className="sr-only">Прикрепить файл</span>
          </Button>
          
          <Input
            type="text"
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send size={18} />
            <span className="sr-only">Отправить</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
