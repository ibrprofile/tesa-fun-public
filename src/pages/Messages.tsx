
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Chat from '@/components/Messenger/Chat';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'online' | 'offline';
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

const currentUserId = 101;

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Алексей Смирнов",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastMessage: "Спасибо за покупку! Буду рад снова вас видеть.",
    lastMessageTime: "2023-10-15T14:30:00",
    unreadCount: 0,
    status: 'online'
  },
  {
    id: 2,
    name: "Елена Петрова",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    lastMessage: "У вас есть еще такие звезды?",
    lastMessageTime: "2023-10-14T18:45:00",
    unreadCount: 2,
    status: 'offline'
  },
  {
    id: 3,
    name: "Иван Козлов",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    lastMessage: "Когда будут новые товары?",
    lastMessageTime: "2023-10-13T09:15:00",
    unreadCount: 0,
    status: 'online'
  }
];

// Mock conversation data
const mockMessages: { [contactId: number]: Message[] } = {
  1: [
    {
      id: 1,
      senderId: 1,
      content: "Здравствуйте! Я заинтересован в покупке вашего товара 'Премиум звезда'.",
      timestamp: "2023-10-15T14:25:00",
      read: true
    },
    {
      id: 2,
      senderId: currentUserId,
      content: "Здравствуйте! Да, этот товар доступен. Есть ли у вас вопросы по нему?",
      timestamp: "2023-10-15T14:27:00",
      read: true
    },
    {
      id: 3,
      senderId: 1,
      content: "Отлично! Я бы хотел приобрести его. Как мы можем это сделать?",
      timestamp: "2023-10-15T14:28:00",
      read: true
    },
    {
      id: 4,
      senderId: currentUserId,
      content: "Вы можете произвести оплату через нашу платежную систему. После оплаты вы получите товар автоматически.",
      timestamp: "2023-10-15T14:29:00",
      read: true
    },
    {
      id: 5,
      senderId: 1,
      content: "Спасибо за покупку! Буду рад снова вас видеть.",
      timestamp: "2023-10-15T14:30:00",
      read: true
    }
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      content: "Здравствуйте! Мне понравились ваши звезды. Они очень красивые.",
      timestamp: "2023-10-14T18:40:00",
      read: true
    },
    {
      id: 2,
      senderId: currentUserId,
      content: "Спасибо большое! Я рад, что вам нравится мой товар.",
      timestamp: "2023-10-14T18:42:00",
      read: true
    },
    {
      id: 3,
      senderId: 2,
      content: "У вас есть еще такие звезды?",
      timestamp: "2023-10-14T18:45:00",
      read: false
    },
    {
      id: 4,
      senderId: 2,
      content: "Также интересует, есть ли скидки при покупке набора?",
      timestamp: "2023-10-14T18:46:00",
      read: false
    }
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      content: "Привет! Видел твои товары, очень круто!",
      timestamp: "2023-10-13T09:10:00",
      read: true
    },
    {
      id: 2,
      senderId: currentUserId,
      content: "Привет! Спасибо за комплимент. Рад, что тебе нравится.",
      timestamp: "2023-10-13T09:12:00",
      read: true
    },
    {
      id: 3,
      senderId: 3,
      content: "Когда будут новые товары?",
      timestamp: "2023-10-13T09:15:00",
      read: true
    }
  ]
};

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<{ [contactId: number]: Message[] }>(mockMessages);
  
  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;
    
    const newMessage: Message = {
      id: Date.now(),
      senderId: currentUserId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));
  };
  
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-32 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 page-transition-in">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Сообщения</h1>
            <p className="text-foreground/70">Общайтесь с другими пользователями платформы.</p>
          </div>
          
          <div className="glass rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3 h-[70vh]">
            {/* Contacts sidebar */}
            <div className="border-r border-border">
              <div className="p-3 border-b">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Поиск контактов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(70vh-61px)]">
                {filteredContacts.length === 0 ? (
                  <div className="p-6 text-center text-foreground/70">
                    Контакты не найдены
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      className={`w-full text-left p-3 border-b border-border hover:bg-secondary/30 transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-secondary/40' : ''
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.status === 'online' && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{contact.name}</h3>
                            <p className="text-xs text-foreground/60">
                              {new Date(contact.lastMessageTime).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-foreground/70 truncate w-40">{contact.lastMessage}</p>
                            {contact.unreadCount > 0 && (
                              <Badge variant="destructive" className="ml-2">
                                {contact.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
                
                <button className="w-full text-left p-3 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-center text-foreground/70">
                    <Plus size={18} className="mr-2" />
                    <span>Новый чат</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Chat area */}
            <div className="md:col-span-2">
              {selectedContact ? (
                <Chat
                  currentUserId={currentUserId}
                  recipient={selectedContact}
                  messages={messages[selectedContact.id] || []}
                  onSendMessage={handleSendMessage}
                  onClose={() => setSelectedContact(null)}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-foreground/70">
                  <div className="w-20 h-20 rounded-full bg-secondary/60 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Выберите чат</h3>
                  <p className="max-w-md">Выберите существующий чат из списка слева или начните новый разговор</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
