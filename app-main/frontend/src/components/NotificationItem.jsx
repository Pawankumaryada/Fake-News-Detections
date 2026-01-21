import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
      <div className="flex items-start space-x-3">
        <div className="mt-1">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
          <div className="flex items-center space-x-3 mt-2">
            <span className="text-xs text-gray-500">{getTimeAgo(notification.timestamp)}</span>
            {notification.unread && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onDelete(notification.id)}
        className="text-gray-400 hover:text-red-500 transition-colors"
        title="Delete notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationItem;