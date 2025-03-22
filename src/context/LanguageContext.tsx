
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getCurrency, Currency } from '@/api/currency';

// Define available languages
export type Language = 'ru' | 'en';

// Interface for translation keys
export interface TranslationKeys {
  // Navigation
  'home': string;
  'marketplace': string;
  'profile': string;
  'messages': string;
  'notifications': string;
  'add_product': string;
  'logout': string;
  'login': string;
  'register': string;
  'language': string;
  'search': string;
  'search_placeholder': string;
  'categories': string;
  'all_categories': string;
  'admin': string;
  'light_mode': string;
  'dark_mode': string;
  
  // Home page
  'explore_digital_marketplace': string;
  'marketplace_description': string;
  'get_started': string;
  'trending_now': string;
  'view_all': string;
  'popular_categories': string;
  'stars': string;
  'gifts': string;
  'sets': string;
  'premium': string;
  'see_more': string;
  
  // Product card
  'view_details': string;
  'seller': string;
  'user': string;
  
  // User/Profile
  'account_settings': string;
  'personal_info': string;
  'payment_methods': string;
  'my_orders': string;
  'my_products': string;
  'saved_items': string;
  'become_seller': string;
  'member_since': string;
  'products': string;
  'orders': string;
  'browse_marketplace': string;
  'no_messages': string;
  'no_messages_desc': string;
  'about': string;
  'rating': string;
  
  // Product
  'product_name': string;
  'product_name_ru': string;
  'product_name_en': string;
  'category': string;
  'price': string;
  'quantity': string;
  'description': string;
  'description_ru': string;
  'description_en': string;
  'images': string;
  'submit': string;
  'cancel': string;
  'product_added': string;
  'product_added_desc': string;
  'product_add_error': string;
  'title_ru': string;
  'title_en': string;
  'comments': string;
  'features': string;
  'buy_now': string;
  'contact_seller': string;
  'currency': string;
  'payment_method': string;
  'product_logo': string;
  'upload': string;
  'screenshots': string;
  'add': string;
  'add_product_button': string;
  'add_product_title': string;
  'add_product_subtitle': string;
  
  // Authentication
  'sign_in': string;
  'sign_up': string;
  'forgot_password': string;
  'email': string;
  'password': string;
  'confirm_password': string;
  'first_name': string;
  'last_name': string;
  'birth_date': string;
  'store_name': string;
  'continue': string;
  'have_account': string;
  'no_account': string;
  'logging_in': string;
  'username': string;
  'enter_username': string;
  'enter_password': string;
  'login_successful': string;
  'login_failed': string;
  'login_error': string;
  'invalid_credentials': string;
  'try_again_later': string;
  'welcome_admin': string;
  
  // Admin panel
  'dashboard': string;
  'users': string;
  'statistics': string;
  'settings_admin': string;
  'showing': string;
  'to': string;
  'of': string;
  'total_users': string;
  'total_products': string;
  'total_sales': string;
  'recent_activity': string;
  'back_to_site': string;
  'user_management': string;
  'search_users': string;
  'role': string;
  'status': string;
  'actions': string;
  'user_details': string;
  'user_details_desc': string;
  'user_id': string;
  'name': string;
  'registration_date': string;
  'last_login': string;
  'products_count': string;
  'orders_count': string;
  'ban_user': string;
  'unban_user': string;
  'change_role': string;
  'send_email': string;
  'close': string;
  'ban_reason': string;
  'ban_duration': string;
  'enter_ban_reason': string;
  'select_duration': string;
  'one_day': string;
  'one_week': string;
  'one_month': string;
  'three_months': string;
  'one_year': string;
  'permanent': string;
  'notify_user_email': string;
  'confirm_unban_user': string;
  'user_email': string;
  'confirm_ban': string;
  'confirm_unban': string;
  'unban_user_desc': string;
  'ban_user_desc': string;
  'user_banned': string;
  'user_banned_success': string;
  'email_notification': string;
  'email_sent_success': string;
  'error': string;
  'reason_required': string;
  'admin_portal': string;
  'admin_login_required': string;
  'return_to': string;
  'main_site': string;
  
  // News section
  'news_and_updates': string;
  'latest_news_desc': string;
  'read_more': string;
  'news_management': string;
  'create_news': string;
  'all_news': string;
  'published': string;
  'drafts': string;
  'preview': string;
  'edit': string;
  'delete': string;
  
  // Comments section
  'comments_management': string;
  'search_comments': string;
  'comment': string;
  'reports': string;
  'comment_deleted': string;
  'comment_deleted_success': string;
  'comment_updated': string;
  'comment_updated_success': string;
  'comment_approved': string;
  'comment_flagged': string;
  'comment_status_updated': string;
  'view_edit_comment': string;
  'comment_id': string;
  'comment_content': string;
  'save_changes': string;
  'delete_comment': string;
  'delete_comment_confirmation': string;
  'delete_comment_warning': string;
  'confirm_delete': string;
  
  // Orders section
  'orders_management': string;
  'search_orders': string;
  'export': string;
  'order_number': string;
  'customer': string;
  'date': string;
  'items': string;
  'total': string;
  
  // Settings
  'admin_settings': string;
  'general': string;
  'security': string;
  'general_settings': string;
  'general_settings_desc': string;
  'site_name': string;
  'site_description': string;
  'maintenance_mode': string;
  'maintenance_mode_desc': string;
  'user_registration': string;
  'user_registration_desc': string;
  'email_settings': string;
  'email_settings_desc': string;
  'smtp_host': string;
  'smtp_port': string;
  'smtp_username': string;
  'smtp_password': string;
  'from_email': string;
  'from_email_desc': string;
  'test_email': string;
  'security_settings': string;
  'security_settings_desc': string;
  'two_factor_auth': string;
  'two_factor_auth_desc': string;
  'session_timeout': string;
  'minutes': string;
  'session_timeout_desc': string;
  'password_policy': string;
  'low': string;
  'medium': string;
  'high': string;
  'password_policy_desc': string;
  'settings_saved': string;
  'settings_saved_success': string;
  
  // Statistics
  'select_period': string;
  'last_week': string;
  'last_month': string;
  'last_quarter': string;
  'last_year': string;
  'all_time': string;
  'export_report': string;
  'from_last_period': string;
  'total_orders': string;
  'new_users': string;
  'conversion_rate': string;
  'sales': string;
  'sales_overview': string;
  'sales_overview_desc': string;
  'user_activity': string;
  'user_activity_desc': string;
  'products_by_category': string;
  'products_by_category_desc': string;
  
  // Notifications
  'mark_all_read': string;
  'no_notifications': string;
  
  // General messages
  'location_placeholder': string;
  'bio_placeholder': string;
  'seller_products': string;
  'no_products': string;
  'profile_not_found': string;
  'profile_not_found_desc': string;
  'go_back': string;
  'feature_not_available': string;
  'feature_coming_soon': string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
  currencies: Currency[];
  selectedCurrency: Currency | null;
  setSelectedCurrency: (currency: Currency) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, TranslationKeys> = {
  ru: {
    // Navigation
    'home': 'Главная',
    'marketplace': 'Маркетплейс',
    'profile': 'Профиль',
    'messages': 'Сообщения',
    'notifications': 'Уведомления',
    'add_product': 'Добавить товар',
    'logout': 'Выйти',
    'login': 'Войти',
    'register': 'Регистрация',
    'language': 'Язык',
    'search': 'Поиск',
    'search_placeholder': 'Поиск товаров...',
    'categories': 'Категории',
    'all_categories': 'Все категории',
    'admin': 'Админ-панель',
    'light_mode': 'Светлый режим',
    'dark_mode': 'Темный режим',
    
    // Home page
    'explore_digital_marketplace': 'Исследуйте цифровой маркетплейс',
    'marketplace_description': 'Покупайте и продавайте цифровые товары. От уникальных виртуальных подарков до эксклюзивных премиум-коллекций.',
    'get_started': 'Начать',
    'trending_now': 'Популярное сейчас',
    'view_all': 'Смотреть все',
    'popular_categories': 'Популярные категории',
    'stars': 'Звезды',
    'gifts': 'Подарки',
    'sets': 'Наборы',
    'premium': 'Премиум',
    'see_more': 'Ещё',
    
    // Product card
    'view_details': 'Подробнее',
    'seller': 'Продавец',
    'user': 'Пользователь',
    
    // User/Profile
    'account_settings': 'Настройки аккаунта',
    'personal_info': 'Личная информация',
    'payment_methods': 'Способы оплаты',
    'my_orders': 'Мои заказы',
    'my_products': 'Мои товары',
    'saved_items': 'Сохраненные товары',
    'become_seller': 'Стать продавцом',
    'member_since': 'Участник с',
    'products': 'Товары',
    'orders': 'Заказы',
    'browse_marketplace': 'Перейти в маркетплейс',
    'no_messages': 'Нет сообщений',
    'no_messages_desc': 'Ваш почтовый ящик пуст. Сообщения от покупателей и продавцов появятся здесь',
    'about': 'О пользователе',
    'rating': 'Рейтинг',
    
    // Product
    'product_name': 'Название товара',
    'product_name_ru': 'Название товара (РУС)',
    'product_name_en': 'Название товара (АНГЛ)',
    'category': 'Категория',
    'price': 'Цена',
    'quantity': 'Количество',
    'description': 'Описание',
    'description_ru': 'Описание (РУС)',
    'description_en': 'Описание (АНГЛ)',
    'images': 'Изображения',
    'submit': 'Отправить',
    'cancel': 'Отмена',
    'product_added': 'Товар добавлен',
    'product_added_desc': 'Ваш товар был успешно добавлен в каталог',
    'product_add_error': 'Ошибка при добавлении товара',
    'title_ru': 'Название (RU)',
    'title_en': 'Название (EN)',
    'comments': 'Комментарии',
    'features': 'Характеристики',
    'buy_now': 'Купить сейчас',
    'contact_seller': 'Связаться с продавцом',
    'currency': 'Валюта',
    'payment_method': 'Способ оплаты',
    'product_logo': 'Логотип товара',
    'upload': 'Загрузить',
    'screenshots': 'Скриншоты',
    'add': 'Добавить',
    'add_product_button': 'Добавить товар',
    'add_product_title': 'Добавление нового товара',
    'add_product_subtitle': 'Заполните форму для добавления вашего товара на маркетплейс',
    
    // Authentication
    'sign_in': 'Вход',
    'sign_up': 'Регистрация',
    'forgot_password': 'Забыли пароль?',
    'email': 'Email',
    'password': 'Пароль',
    'confirm_password': 'Подтвердите пароль',
    'first_name': 'Имя',
    'last_name': 'Фамилия',
    'birth_date': 'Дата рождения',
    'store_name': 'Название магазина',
    'continue': 'Продолжить',
    'have_account': 'Уже есть аккаунт?',
    'no_account': 'Нет аккаунта?',
    'logging_in': 'Вход...',
    'username': 'Имя пользователя',
    'enter_username': 'Введите имя пользователя',
    'enter_password': 'Введите пароль',
    'login_successful': 'Вход выполнен успешно',
    'login_failed': 'Ошибка входа',
    'login_error': 'Ошибка при входе',
    'invalid_credentials': 'Неверное имя пользователя или пароль',
    'try_again_later': 'Пожалуйста, попробуйте позже',
    'welcome_admin': 'Добро пожаловать в панель администратора',
    
    // Admin panel
    'dashboard': 'Панель управления',
    'users': 'Пользователи',
    'statistics': 'Статистика',
    'settings_admin': 'Настройки',
    'showing': 'Показано',
    'to': 'по',
    'of': 'из',
    'total_users': 'Всего пользователей',
    'total_products': 'Всего товаров',
    'total_sales': 'Всего продаж',
    'recent_activity': 'Последняя активность',
    'back_to_site': 'Вернуться на сайт',
    'user_management': 'Управление пользователями',
    'search_users': 'Поиск пользователей...',
    'role': 'Роль',
    'status': 'Статус',
    'actions': 'Действия',
    'user_details': 'Детали пользователя',
    'user_details_desc': 'Просмотр и управление информацией о пользователе',
    'user_id': 'ID пользователя',
    'name': 'Имя',
    'registration_date': 'Дата регистрации',
    'last_login': 'Последний вход',
    'products_count': 'Количество товаров',
    'orders_count': 'Количество заказов',
    'ban_user': 'Заблокировать пользователя',
    'unban_user': 'Разблокировать пользователя',
    'change_role': 'Изменить роль',
    'send_email': 'Отправить email',
    'close': 'Закрыть',
    'ban_reason': 'Причина блокировки',
    'ban_duration': 'Срок блокировки',
    'enter_ban_reason': 'Введите причину блокировки...',
    'select_duration': 'Выберите срок',
    'one_day': '1 день',
    'one_week': '1 неделя',
    'one_month': '1 месяц',
    'three_months': '3 месяца',
    'one_year': '1 год',
    'permanent': 'Навсегда',
    'notify_user_email': 'Уведомить пользователя по email',
    'confirm_unban_user': 'Вы действительно хотите разблокировать этого пользователя?',
    'user_email': 'Email пользователя',
    'confirm_ban': 'Подтвердить блокировку',
    'confirm_unban': 'Подтвердить разблокировку',
    'unban_user_desc': 'Пользователь снова сможет использовать платформу',
    'ban_user_desc': 'Пользователь потеряет доступ к своему аккаунту',
    'user_banned': 'Пользователь заблокирован',
    'user_banned_success': 'Пользователь успешно заблокирован',
    'email_notification': 'Уведомление по email',
    'email_sent_success': 'Email успешно отправлен',
    'error': 'Ошибка',
    'reason_required': 'Требуется указать причину',
    'admin_portal': 'Панель администратора',
    'admin_login_required': 'Требуется вход для доступа к панели администратора',
    'return_to': 'Вернуться на',
    'main_site': 'основной сайт',
    
    // News section
    'news_and_updates': 'Новости и обновления',
    'latest_news_desc': 'Последние новости и обновления нашего маркетплейса',
    'read_more': 'Читать далее',
    'news_management': 'Управление новостями',
    'create_news': 'Создать новость',
    'all_news': 'Все новости',
    'published': 'Опубликовано',
    'drafts': 'Черновики',
    'preview': 'Предпросмотр',
    'edit': 'Редактировать',
    'delete': 'Удалить',
    
    // Comments section
    'comments_management': 'Управление комментариями',
    'search_comments': 'Поиск комментариев...',
    'comment': 'Комментарий',
    'reports': 'Жалобы',
    'comment_deleted': 'Комментарий удален',
    'comment_deleted_success': 'Комментарий был успешно удален',
    'comment_updated': 'Комментарий обновлен',
    'comment_updated_success': 'Комментарий был успешно обновлен',
    'comment_approved': 'Комментарий одобрен',
    'comment_flagged': 'Комментарий помечен',
    'comment_status_updated': 'Статус комментария обновлен',
    'view_edit_comment': 'Просмотр и редактирование комментария',
    'comment_id': 'ID комментария',
    'comment_content': 'Содержание комментария',
    'save_changes': 'Сохранить изменения',
    'delete_comment': 'Удалить комментарий',
    'delete_comment_confirmation': 'Вы уверены, что хотите удалить этот комментарий?',
    'delete_comment_warning': 'Это действие нельзя отменить',
    'confirm_delete': 'Подтвердить удаление',
    
    // Orders section
    'orders_management': 'Управление заказами',
    'search_orders': 'Поиск заказов...',
    'export': 'Экспорт',
    'order_number': 'Номер заказа',
    'customer': 'Покупатель',
    'date': 'Дата',
    'items': 'Товары',
    'total': 'Сумма',
    
    // Settings
    'admin_settings': 'Настройки администратора',
    'general': 'Общие',
    'security': 'Безопасность',
    'general_settings': 'Общие настройки',
    'general_settings_desc': 'Основные настройки сайта',
    'site_name': 'Название сайта',
    'site_description': 'Описание сайта',
    'maintenance_mode': 'Режим обслуживания',
    'maintenance_mode_desc': 'Включить режим обслуживания сайта',
    'user_registration': 'Регистрация пользователей',
    'user_registration_desc': 'Разрешить регистрацию новых пользователей',
    'email_settings': 'Настройки электронной почты',
    'email_settings_desc': 'Настройки для отправки уведомлений на почту',
    'smtp_host': 'SMTP хост',
    'smtp_port': 'SMTP порт',
    'smtp_username': 'SMTP имя пользователя',
    'smtp_password': 'SMTP пароль',
    'from_email': 'Email отправителя',
    'from_email_desc': 'Адрес, с которого будут отправляться письма',
    'test_email': 'Тестовое письмо',
    'security_settings': 'Настройки безопасности',
    'security_settings_desc': 'Настройки безопасности сайта',
    'two_factor_auth': 'Двухфакторная аутентификация',
    'two_factor_auth_desc': 'Требовать дополнительное подтверждение при входе',
    'session_timeout': 'Время сессии',
    'minutes': 'минут',
    'session_timeout_desc': 'Время бездействия до автоматического выхода',
    'password_policy': 'Политика паролей',
    'low': 'Низкая',
    'medium': 'Средняя',
    'high': 'Высокая',
    'password_policy_desc': 'Требования к сложности паролей пользователей',
    'settings_saved': 'Настройки сохранены',
    'settings_saved_success': 'Настройки успешно сохранены',
    
    // Statistics
    'select_period': 'Выберите период',
    'last_week': 'Последняя неделя',
    'last_month': 'Последний месяц',
    'last_quarter': 'Последний квартал',
    'last_year': 'Последний год',
    'all_time': 'Все время',
    'export_report': 'Экспорт отчета',
    'from_last_period': 'с прошлого периода',
    'total_orders': 'Всего заказов',
    'new_users': 'Новые пользователи',
    'conversion_rate': 'Коэффициент конверсии',
    'sales': 'Продажи',
    'sales_overview': 'Обзор продаж',
    'sales_overview_desc': 'Статистика продаж за выбранный период',
    'user_activity': 'Активность пользователей',
    'user_activity_desc': 'Статистика активности пользователей',
    'products_by_category': 'Товары по категориям',
    'products_by_category_desc': 'Распределение товаров по категориям',
    
    // Notifications
    'mark_all_read': 'Отметить все как прочитанные',
    'no_notifications': 'Нет уведомлений',
    
    // General messages
    'location_placeholder': 'Местоположение не указано',
    'bio_placeholder': 'Пользователь не добавил информацию о себе',
    'seller_products': 'Товары продавца',
    'no_products': 'У этого продавца пока нет товаров',
    'profile_not_found': 'Профиль не найден',
    'profile_not_found_desc': 'Запрашиваемый профиль не существует или был удален',
    'go_back': 'Вернуться назад',
    'feature_not_available': 'Функция недоступна',
    'feature_coming_soon': 'Эта функция скоро появится'
  },
  en: {
    'home': 'Home',
    'marketplace': 'Marketplace',
    'profile': 'Profile',
    'messages': 'Messages',
    'notifications': 'Notifications',
    'add_product': 'Add Product',
    'logout': 'Logout',
    'login': 'Login',
    'register': 'Register',
    'language': 'Language',
    'search': 'Search',
    'search_placeholder': 'Search products...',
    'categories': 'Categories',
    'all_categories': 'All Categories',
    'admin': 'Admin Panel',
    'light_mode': 'Light Mode',
    'dark_mode': 'Dark Mode',
    
    // Home page
    'explore_digital_marketplace': 'Explore Digital Marketplace',
    'marketplace_description': 'Buy and sell digital goods. From unique virtual gifts to exclusive premium collections.',
    'get_started': 'Get Started',
    'trending_now': 'Trending Now',
    'view_all': 'View All',
    'popular_categories': 'Popular Categories',
    'stars': 'Stars',
    'gifts': 'Gifts',
    'sets': 'Sets',
    'premium': 'Premium',
    'see_more': 'See More',
    
    // Product card
    'view_details': 'View Details',
    'seller': 'Seller',
    'user': 'User',
    
    // User/Profile
    'account_settings': 'Account Settings',
    'personal_info': 'Personal Info',
    'payment_methods': 'Payment Methods',
    'my_orders': 'My Orders',
    'my_products': 'My Products',
    'saved_items': 'Saved Items',
    'become_seller': 'Become a Seller',
    'member_since': 'Member since',
    'products': 'Products',
    'orders': 'Orders',
    'browse_marketplace': 'Browse Marketplace',
    'no_messages': 'No Messages Yet',
    'no_messages_desc': 'Your inbox is empty. Messages from buyers and sellers will appear here',
    'about': 'About',
    'rating': 'Rating',
    
    // Product
    'product_name': 'Product Name',
    'product_name_ru': 'Product Name (RU)',
    'product_name_en': 'Product Name (EN)',
    'category': 'Category',
    'price': 'Price',
    'quantity': 'Quantity',
    'description': 'Description',
    'description_ru': 'Description (RU)',
    'description_en': 'Description (EN)',
    'images': 'Images',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'product_added': 'Product Added',
    'product_added_desc': 'Your product has been successfully added to the catalog',
    'product_add_error': 'Error Adding Product',
    'title_ru': 'Title (RU)',
    'title_en': 'Title (EN)',
    'comments': 'Comments',
    'features': 'Features',
    'buy_now': 'Buy Now',
    'contact_seller': 'Contact Seller',
    'currency': 'Currency',
    'payment_method': 'Payment Method',
    'product_logo': 'Product Logo',
    'upload': 'Upload',
    'screenshots': 'Screenshots',
    'add': 'Add',
    'add_product_button': 'Add Product',
    'add_product_title': 'Add New Product',
    'add_product_subtitle': 'Fill out the form to add your product to the marketplace',
    
    // Authentication
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'forgot_password': 'Forgot Password?',
    'email': 'Email',
    'password': 'Password',
    'confirm_password': 'Confirm Password',
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'birth_date': 'Birth Date',
    'store_name': 'Store Name',
    'continue': 'Continue',
    'have_account': 'Already have an account?',
    'no_account': 'Don\'t have an account?',
    'logging_in': 'Logging in...',
    'username': 'Username',
    'enter_username': 'Enter username',
    'enter_password': 'Enter password',
    'login_successful': 'Login Successful',
    'login_failed': 'Login Failed',
    'login_error': 'Login Error',
    'invalid_credentials': 'Invalid username or password',
    'try_again_later': 'Please try again later',
    'welcome_admin': 'Welcome to the admin panel',
    
    // Admin panel
    'dashboard': 'Dashboard',
    'users': 'Users',
    'statistics': 'Statistics',
    'settings_admin': 'Settings',
    'showing': 'Showing',
    'to': 'to',
    'of': 'of',
    'total_users': 'Total Users',
    'total_products': 'Total Products',
    'total_sales': 'Total Sales',
    'recent_activity': 'Recent Activity',
    'back_to_site': 'Back to Site',
    'user_management': 'User Management',
    'search_users': 'Search users...',
    'role': 'Role',
    'status': 'Status',
    'actions': 'Actions',
    'user_details': 'User Details',
    'user_details_desc': 'View and manage user information',
    'user_id': 'User ID',
    'name': 'Name',
    'registration_date': 'Registration Date',
    'last_login': 'Last Login',
    'products_count': 'Products Count',
    'orders_count': 'Orders Count',
    'ban_user': 'Ban User',
    'unban_user': 'Unban User',
    'change_role': 'Change Role',
    'send_email': 'Send Email',
    'close': 'Close',
    'ban_reason': 'Ban Reason',
    'ban_duration': 'Ban Duration',
    'enter_ban_reason': 'Enter ban reason...',
    'select_duration': 'Select duration',
    'one_day': '1 Day',
    'one_week': '1 Week',
    'one_month': '1 Month',
    'three_months': '3 Months',
    'one_year': '1 Year',
    'permanent': 'Permanent',
    'notify_user_email': 'Notify user via email',
    'confirm_unban_user': 'Are you sure you want to unban this user?',
    'user_email': 'User email',
    'confirm_ban': 'Confirm Ban',
    'confirm_unban': 'Confirm Unban',
    'unban_user_desc': 'The user will be able to use the platform again',
    'ban_user_desc': 'The user will lose access to their account',
    'user_banned': 'User Banned',
    'user_banned_success': 'User has been successfully banned',
    'email_notification': 'Email Notification',
    'email_sent_success': 'Email sent successfully',
    'error': 'Error',
    'reason_required': 'Reason is required',
    'admin_portal': 'Admin Portal',
    'admin_login_required': 'Login required to access the admin panel',
    'return_to': 'Return to',
    'main_site': 'main site',
    
    // News section
    'news_and_updates': 'News & Updates',
    'latest_news_desc': 'The latest news and updates from our marketplace',
    'read_more': 'Read More',
    'news_management': 'News Management',
    'create_news': 'Create News',
    'all_news': 'All News',
    'published': 'Published',
    'drafts': 'Drafts',
    'preview': 'Preview',
    'edit': 'Edit',
    'delete': 'Delete',
    
    // Comments section
    'comments_management': 'Comments Management',
    'search_comments': 'Search comments...',
    'comment': 'Comment',
    'reports': 'Reports',
    'comment_deleted': 'Comment Deleted',
    'comment_deleted_success': 'Comment has been successfully deleted',
    'comment_updated': 'Comment Updated',
    'comment_updated_success': 'Comment has been successfully updated',
    'comment_approved': 'Comment Approved',
    'comment_flagged': 'Comment Flagged',
    'comment_status_updated': 'Comment status has been updated',
    'view_edit_comment': 'View and edit comment',
    'comment_id': 'Comment ID',
    'comment_content': 'Comment Content',
    'save_changes': 'Save Changes',
    'delete_comment': 'Delete Comment',
    'delete_comment_confirmation': 'Are you sure you want to delete this comment?',
    'delete_comment_warning': 'This action cannot be undone',
    'confirm_delete': 'Confirm Delete',
    
    // Orders section
    'orders_management': 'Orders Management',
    'search_orders': 'Search orders...',
    'export': 'Export',
    'order_number': 'Order Number',
    'customer': 'Customer',
    'date': 'Date',
    'items': 'Items',
    'total': 'Total',
    
    // Settings
    'admin_settings': 'Admin Settings',
    'general': 'General',
    'security': 'Security',
    'general_settings': 'General Settings',
    'general_settings_desc': 'Basic site settings',
    'site_name': 'Site Name',
    'site_description': 'Site Description',
    'maintenance_mode': 'Maintenance Mode',
    'maintenance_mode_desc': 'Enable site maintenance mode',
    'user_registration': 'User Registration',
    'user_registration_desc': 'Allow new user registrations',
    'email_settings': 'Email Settings',
    'email_settings_desc': 'Settings for sending email notifications',
    'smtp_host': 'SMTP Host',
    'smtp_port': 'SMTP Port',
    'smtp_username': 'SMTP Username',
    'smtp_password': 'SMTP Password',
    'from_email': 'From Email',
    'from_email_desc': 'Email address used to send emails',
    'test_email': 'Send Test Email',
    'security_settings': 'Security Settings',
    'security_settings_desc': 'Site security settings',
    'two_factor_auth': 'Two-Factor Authentication',
    'two_factor_auth_desc': 'Require additional confirmation when logging in',
    'session_timeout': 'Session Timeout',
    'minutes': 'minutes',
    'session_timeout_desc': 'Idle time before automatic logout',
    'password_policy': 'Password Policy',
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'password_policy_desc': 'Requirements for user password complexity',
    'settings_saved': 'Settings Saved',
    'settings_saved_success': 'Settings have been successfully saved',
    
    // Statistics
    'select_period': 'Select Period',
    'last_week': 'Last Week',
    'last_month': 'Last Month',
    'last_quarter': 'Last Quarter',
    'last_year': 'Last Year',
    'all_time': 'All Time',
    'export_report': 'Export Report',
    'from_last_period': 'from last period',
    'total_orders': 'Total Orders',
    'new_users': 'New Users',
    'conversion_rate': 'Conversion Rate',
    'sales': 'Sales',
    'sales_overview': 'Sales Overview',
    'sales_overview_desc': 'Sales statistics for the selected period',
    'user_activity': 'User Activity',
    'user_activity_desc': 'User activity statistics',
    'products_by_category': 'Products by Category',
    'products_by_category_desc': 'Distribution of products by category',
    
    // Notifications
    'mark_all_read': 'Mark All As Read',
    'no_notifications': 'No Notifications',
    
    // General messages
    'location_placeholder': 'Location not specified',
    'bio_placeholder': 'This user hasn\'t added any information about themselves',
    'seller_products': 'Seller\'s Products',
    'no_products': 'This seller doesn\'t have any products yet',
    'profile_not_found': 'Profile Not Found',
    'profile_not_found_desc': 'The requested profile doesn\'t exist or has been removed',
    'go_back': 'Go Back',
    'feature_not_available': 'Feature Not Available',
    'feature_coming_soon': 'This feature will be available soon'
  }
};

// Function to check that all keys in the TranslationKeys interface are present in both language objects
const validateTranslations = () => {
  const allKeys = Object.keys(translations.en) as Array<keyof TranslationKeys>;
  const missingInRussian = allKeys.filter(key => !translations.ru[key]);
  
  if (missingInRussian.length > 0) {
    console.warn('Missing translations in Russian:', missingInRussian);
  }
  
  // Also check if there are any extra keys in Russian that aren't in the interface
  const interfaceKeys = Object.keys(translations.en) as Array<keyof TranslationKeys>;
  const extraInRussian = Object.keys(translations.ru).filter(
    key => !interfaceKeys.includes(key as keyof TranslationKeys)
  );
  
  if (extraInRussian.length > 0) {
    console.warn('Extra keys in Russian not in interface:', extraInRussian);
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  
  useEffect(() => {
    // Validate translations in development
    if (import.meta.env.DEV) {
      validateTranslations();
    }
    
    // Load currencies
    const loadCurrencies = async () => {
      try {
        const currencyData = await getCurrency();
        setCurrencies(currencyData);
        const defaultCurrency = currencyData.find(c => c.code === 'RUB') || currencyData[0];
        setSelectedCurrency(defaultCurrency);
      } catch (error) {
        console.error('Failed to load currencies:', error);
      }
    };
    
    loadCurrencies();
  }, []);
  
  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t,
      currencies,
      selectedCurrency,
      setSelectedCurrency
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
