
import React from 'react';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useNotifications, Notification } from '@/context/NotificationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { language, t } = useLanguage();
  
  // Get the appropriate locale for date-fns
  const locale = language === 'ru' ? ru : enUS;
  
  // Format the time of notification
  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale });
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return '💬';
      case 'order':
        return '🛒';
      case 'comment':
        return '💬';
      case 'system':
        return '🔔';
      default:
        return '📣';
    }
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Handle navigation based on notification type
    switch (notification.type) {
      case 'message':
        // Navigate to conversation
        if (notification.data?.conversationId) {
          // Router navigation code here
          console.log('Navigate to conversation', notification.data.conversationId);
        }
        break;
      case 'order':
        // Navigate to order details
        if (notification.data?.orderId) {
          console.log('Navigate to order', notification.data.orderId);
        }
        break;
      case 'comment':
        // Navigate to product with comment
        if (notification.data?.productId) {
          console.log('Navigate to product', notification.data.productId);
        }
        break;
      default:
        break;
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center text-xs p-0 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-medium">{t('notifications')}</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
              {t('mark_all_read')}
            </Button>
          )}
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className={`px-4 py-3 cursor-pointer hover:bg-muted ${!notification.read ? 'bg-muted/50' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-3 w-full">
                  <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-foreground/70 truncate">{notification.description}</p>
                    <p className="text-xs text-foreground/50 mt-1">{formatTime(notification.createdAt)}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary self-start mt-1.5" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-foreground/70">
              <p>{t('no_notifications')}</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
