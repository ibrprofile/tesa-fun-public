
// Конфигурация проекта
interface Config {
  // Настройки базы данных
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  // Настройки сервера
  server: {
    port: number;
    host: string;
  };
  // Настройки JWT
  jwt: {
    secret: string;
    expiresIn: string;
  };
  // Настройки почты
  mail: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    from: string;
  };
  // Настройки внешних API
  api: {
    google: {
      clientId: string;
      clientSecret: string;
    };
    vk: {
      clientId: string;
      clientSecret: string;
    };
  };
}

// Значения по умолчанию будут заменены значениями из .env
const config: Config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'tesa_fun',
  },
  server: {
    port: parseInt(process.env.PORT || '8080'),
    host: process.env.HOST || 'localhost',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.MAIL_PORT || '587'),
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASSWORD || '',
    },
    from: process.env.MAIL_FROM || 'noreply@tesafun.com',
  },
  api: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    vk: {
      clientId: process.env.VK_CLIENT_ID || '',
      clientSecret: process.env.VK_CLIENT_SECRET || '',
    },
  },
};

export default config;
