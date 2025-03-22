
# Руководство по развертыванию TESA Fun

Это руководство поможет вам развернуть проект TESA Fun на сервере.

## Требования

- Node.js (версия 16 или выше)
- npm или yarn
- Сервер (VPS, выделенный сервер или хостинг с поддержкой Node.js)
- База данных MySQL или PostgreSQL
- (Опционально) Nginx для проксирования запросов

## Шаг 1: Подготовка проекта

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Создайте файл `.env` на основе `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Отредактируйте `.env` и настройте переменные окружения согласно вашему окружению.

4. Соберите проект:
   ```bash
   npm run build
   ```

## Шаг 2: Настройка базы данных

1. Создайте новую базу данных на вашем сервере.

2. Импортируйте схему базы данных (если у вас есть SQL-файл) или используйте ORM для создания таблиц.

## Шаг 3: Развертывание на сервере

### Вариант 1: Прямое развертывание

1. Скопируйте содержимое папки `dist` на ваш сервер:
   ```bash
   scp -r dist/* user@your-server:/path/to/app
   ```

2. Скопируйте файл `.env` и `package.json`:
   ```bash
   scp .env package.json user@your-server:/path/to/app
   ```

3. На сервере установите production-зависимости:
   ```bash
   cd /path/to/app
   npm install --production
   ```

4. Запустите приложение:
   ```bash
   node server.js
   ```

### Вариант 2: Использование PM2 (рекомендуется)

1. Установите PM2 глобально на вашем сервере:
   ```bash
   npm install -g pm2
   ```

2. Создайте файл конфигурации `ecosystem.config.js`:
   ```javascript
   module.exports = {
     apps: [{
       name: "tesa-fun",
       script: "server.js",
       env: {
         NODE_ENV: "production",
       }
     }]
   }
   ```

3. Запустите приложение с PM2:
   ```bash
   pm2 start ecosystem.config.js
   ```

4. Настройте автозапуск PM2:
   ```bash
   pm2 startup
   pm2 save
   ```

### Вариант 3: Использование Docker

1. Создайте `Dockerfile` в корне проекта:
   ```dockerfile
   FROM node:16-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install --production

   COPY dist ./dist
   COPY .env ./

   EXPOSE 8080

   CMD ["node", "dist/server.js"]
   ```

2. Создайте `docker-compose.yml`:
   ```yaml
   version: '3'
   services:
     app:
       build: .
       ports:
         - "8080:8080"
       depends_on:
         - db
       environment:
         - DB_HOST=db
         - NODE_ENV=production
     db:
       image: mysql:8
       environment:
         - MYSQL_ROOT_PASSWORD=your_root_password
         - MYSQL_DATABASE=tesa_fun
       volumes:
         - db_data:/var/lib/mysql

   volumes:
     db_data:
   ```

3. Запустите с Docker Compose:
   ```bash
   docker-compose up -d
   ```

## Шаг 4: Настройка Nginx (опционально, но рекомендуется)

1. Установите Nginx:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Создайте конфигурационный файл:
   ```bash
   sudo nano /etc/nginx/sites-available/tesa-fun
   ```

3. Добавьте следующую конфигурацию:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Активируйте конфигурацию:
   ```bash
   sudo ln -s /etc/nginx/sites-available/tesa-fun /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. Настройте SSL с Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Шаг 5: Регулярное обслуживание

1. Настройте регулярные резервные копии базы данных:
   ```bash
   # Создайте скрипт для бэкапа
   nano backup.sh
   ```

2. Содержимое скрипта:
   ```bash
   #!/bin/bash
   DATE=$(date +%Y-%m-%d)
   mysqldump -u username -p'password' tesa_fun > /path/to/backups/tesa_fun_$DATE.sql
   ```

3. Сделайте скрипт исполняемым и добавьте в cron:
   ```bash
   chmod +x backup.sh
   crontab -e
   ```

4. Добавьте строку для запуска скрипта каждый день в 3 часа ночи:
   ```
   0 3 * * * /path/to/backup.sh
   ```

## Шаг 6: Мониторинг

1. Настройте мониторинг с помощью PM2:
   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   pm2 set pm2-logrotate:retain 7
   ```

2. Мониторинг с PM2 Plus (опционально):
   ```bash
   pm2 plus
   ```

## Устранение неполадок

Если у вас возникли проблемы с развертыванием, проверьте:

1. Логи приложения:
   ```bash
   pm2 logs
   ```

2. Журналы Nginx:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. Проверьте соединение с базой данных:
   ```bash
   mysql -u your_username -p -h localhost tesa_fun
   ```

4. Проверьте настройки брандмауэра:
   ```bash
   sudo ufw status
   ```
