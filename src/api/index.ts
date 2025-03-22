
import { Product } from '@/components/Home/ProductCard';

// Типы данных для бэкенда
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  storeName: string | null;
  avatar: string;
  registrationDate: string;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
}

export interface ProductComment {
  id: number;
  productId: number;
  userId: number;
  text: string;
  parentCommentId: number | null;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  replies?: ProductComment[];
}

export interface ProductDetail extends Product {
  description: string;
  quantity: number;
  screenshots: string[];
  createdAt: string;
  comments: ProductComment[];
}

// Фиктивные данные для имитации API
const mockCategories: Category[] = [
  { id: 1, name: "Звезды", description: "Виртуальные звезды различного дизайна и размера" },
  { id: 2, name: "Подарки", description: "Виртуальные подарки для особых случаев" },
  { id: 3, name: "Наборы", description: "Наборы звезд и подарков со скидкой" },
  { id: 4, name: "Премиум", description: "Эксклюзивные товары премиум-класса" }
];

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Золотая звезда",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000",
    seller: {
      name: "Star Shop",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    likes: 245,
    views: 1204,
    category: "Звезды"
  },
  {
    id: 2,
    title: "Подарочный набор",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000",
    seller: {
      name: "Gift Master",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    likes: 189,
    views: 876,
    category: "Подарки"
  },
  {
    id: 3,
    title: "Премиум звезда",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000",
    seller: {
      name: "VIP Stars",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    likes: 421,
    views: 2304,
    category: "Премиум"
  },
  {
    id: 4,
    title: "Набор из 10 звезд",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000",
    seller: {
      name: "Star Collection",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    likes: 156,
    views: 945,
    category: "Наборы"
  },
  {
    id: 5,
    title: "Праздничный набор",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
    seller: {
      name: "Holiday Gifts",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    likes: 287,
    views: 1432,
    category: "Подарки"
  }
];

const mockProductDetails: { [key: number]: ProductDetail } = {
  1: {
    ...mockProducts[0],
    description: "Эксклюзивная золотая звезда премиум-качества. Идеально подходит для особых случаев и VIP-подарков. Этот цифровой товар добавит элегантности и стиля вашей коллекции.",
    quantity: 50,
    screenshots: [
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000",
      "https://images.unsplash.com/photo-1532673492-1b3cdb05d51b?q=80&w=1000",
      "https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=1000"
    ],
    createdAt: "2023-09-15T10:30:00",
    comments: [
      {
        id: 1,
        productId: 1,
        userId: 2,
        text: "Отличный товар! Я очень доволен покупкой.",
        parentCommentId: null,
        createdAt: "2023-10-10T14:25:00",
        author: {
          id: 2,
          name: "Александр",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        }
      },
      {
        id: 2,
        productId: 1,
        userId: 3,
        text: "Качество звезды просто потрясающее!",
        parentCommentId: null,
        createdAt: "2023-10-11T09:15:00",
        author: {
          id: 3,
          name: "Мария",
          avatar: "https://randomuser.me/api/portraits/women/23.jpg"
        },
        replies: [
          {
            id: 3,
            productId: 1,
            userId: 1,
            text: "Спасибо за отзыв! Мы стараемся делать лучшие товары.",
            parentCommentId: 2,
            createdAt: "2023-10-11T10:30:00",
            author: {
              id: 1,
              name: "Star Shop",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg"
            }
          }
        ]
      }
    ]
  }
};

// Создаем имитацию API запросов
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API для авторизации
export const authAPI = {
  login: async (email: string, password: string) => {
    await delay(1000); // Имитация задержки сети
    
    if (email === 'user@example.com' && password === 'password') {
      return { 
        success: true, 
        user: {
          id: 101,
          email: 'user@example.com',
          firstName: 'Иван',
          lastName: 'Петров',
          birthDate: '1990-05-15',
          storeName: 'My Digital Store',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          registrationDate: '2023-01-15T12:00:00'
        }
      };
    }
    
    return { success: false, message: 'Неверный email или пароль' };
  },
  
  register: async (userData: Partial<User>) => {
    await delay(1500); // Имитация задержки сети
    
    // Проверка на уже существующий email
    if (userData.email === 'user@example.com') {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    return { 
      success: true, 
      user: {
        id: 102,
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        birthDate: userData.birthDate || '',
        storeName: null,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // Дефолтный аватар
        registrationDate: new Date().toISOString()
      }
    };
  },
  
  resetPassword: async (email: string) => {
    await delay(1000);
    
    // Проверка существования email
    if (email !== 'user@example.com') {
      return { success: false, message: 'Пользователь с таким email не найден' };
    }
    
    return { success: true, message: 'Инструкции по сбросу пароля отправлены на ваш email' };
  }
};

// API для работы с категориями
export const categoryAPI = {
  getCategories: async () => {
    await delay(500);
    return mockCategories;
  },
  
  getCategoryById: async (id: number) => {
    await delay(300);
    const category = mockCategories.find(c => c.id === id);
    
    if (!category) {
      throw new Error('Категория не найдена');
    }
    
    return category;
  }
};

// API для работы с товарами
export const productAPI = {
  getProducts: async (options?: { categoryId?: number, searchQuery?: string, page?: number, limit?: number }) => {
    await delay(800);
    
    let filtered = [...mockProducts];
    
    // Фильтрация по категории
    if (options?.categoryId) {
      const category = mockCategories.find(c => c.id === options.categoryId);
      if (category) {
        filtered = filtered.filter(p => p.category === category.name);
      }
    }
    
    // Фильтрация по поисковому запросу
    if (options?.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }
    
    // Пагинация
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      products: filtered.slice(startIndex, endIndex),
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      }
    };
  },
  
  getProductById: async (id: number) => {
    await delay(600);
    const product = mockProductDetails[id] || null;
    
    if (!product) {
      throw new Error('Товар не найден');
    }
    
    return product;
  },
  
  createProduct: async (productData: Partial<ProductDetail>) => {
    await delay(1200);
    
    const newId = Math.max(...mockProducts.map(p => p.id)) + 1;
    
    const newProduct: Product = {
      id: newId,
      title: productData.title || 'Новый товар',
      price: productData.price || 0,
      image: productData.image || 'https://via.placeholder.com/400',
      seller: productData.seller || {
        name: 'Ваш магазин',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      likes: 0,
      views: 0,
      category: productData.category || 'Прочее'
    };
    
    // Добавляем в массив товаров
    mockProducts.push(newProduct);
    
    return { success: true, product: newProduct };
  },
  
  addComment: async (productId: number, userId: number, text: string, parentCommentId?: number) => {
    await delay(500);
    
    const product = mockProductDetails[productId];
    if (!product) {
      throw new Error('Товар не найден');
    }
    
    const newComment: ProductComment = {
      id: Math.max(0, ...product.comments.map(c => c.id)) + 1,
      productId,
      userId,
      text,
      parentCommentId: parentCommentId || null,
      createdAt: new Date().toISOString(),
      author: {
        id: userId,
        name: 'Вы', // В реальном приложении здесь будет имя пользователя
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    };
    
    if (parentCommentId) {
      // Добавляем ответ к комментарию
      const parentComment = product.comments.find(c => c.id === parentCommentId);
      if (parentComment) {
        parentComment.replies = parentComment.replies || [];
        parentComment.replies.push(newComment);
      }
    } else {
      // Добавляем комментарий к товару
      product.comments.push(newComment);
    }
    
    return { success: true, comment: newComment };
  }
};

// API для работы с пользователями
export const userAPI = {
  getUserProfile: async (userId: number) => {
    await delay(700);
    
    // Имитация данных пользователя
    if (userId === 101) {
      return {
        id: 101,
        email: 'user@example.com',
        firstName: 'Иван',
        lastName: 'Петров',
        birthDate: '1990-05-15',
        storeName: 'My Digital Store',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        registrationDate: '2023-01-15T12:00:00'
      };
    }
    
    throw new Error('Пользователь не найден');
  },
  
  updateUserProfile: async (userId: number, userData: Partial<User>) => {
    await delay(1000);
    
    // Имитация обновления данных
    return { 
      success: true, 
      user: {
        id: userId,
        email: userData.email || 'user@example.com',
        firstName: userData.firstName || 'Иван',
        lastName: userData.lastName || 'Петров',
        birthDate: userData.birthDate || '1990-05-15',
        storeName: userData.storeName || 'My Digital Store',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        registrationDate: '2023-01-15T12:00:00'
      }
    };
  },
  
  getUserProducts: async (userId: number) => {
    await delay(800);
    
    // Фильтруем товары этого пользователя (в данном случае все товары принадлежат разным пользователям)
    const userProducts = mockProducts.filter(p => p.seller.name === 'My Digital Store');
    
    return userProducts;
  }
};

// API для работы с сообщениями
export const messageAPI = {
  getConversations: async (userId: number) => {
    await delay(600);
    
    // Имитация списка контактов
    return [
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
      }
    ];
  },
  
  getMessages: async (conversationId: number) => {
    await delay(700);
    
    // Имитация истории сообщений
    return [
      {
        id: 1,
        senderId: conversationId,
        content: "Здравствуйте! Я заинтересован в покупке вашего товара.",
        timestamp: "2023-10-15T14:25:00",
        read: true
      },
      {
        id: 2,
        senderId: 101, // Текущий пользователь
        content: "Здравствуйте! Да, этот товар доступен. Есть ли у вас вопросы по нему?",
        timestamp: "2023-10-15T14:27:00",
        read: true
      },
      {
        id: 3,
        senderId: conversationId,
        content: "Отлично! Я бы хотел приобрести его. Как мы можем это сделать?",
        timestamp: "2023-10-15T14:28:00",
        read: true
      }
    ];
  },
  
  sendMessage: async (conversationId: number, content: string) => {
    await delay(500);
    
    const newMessage = {
      id: Date.now(),
      senderId: 101, // Текущий пользователь
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    return { success: true, message: newMessage };
  }
};
