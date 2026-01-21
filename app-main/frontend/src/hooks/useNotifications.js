import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load notifications from localStorage or API
    const savedNotifications = JSON.parse(localStorage.getItem('veritas-notifications')) || [
      {
        id: 1,
        title: 'New scam alert detected',
        message: 'Fake news detected in financial sector',
        type: 'alert',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        unread: true,
        link: '/alerts/1'
      },
      {
        id: 2,
        title: 'Weekly report generated',
        message: 'Your weekly analysis report is ready',
        type: 'success',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
        unread: true,
        link: '/reports/weekly'
      },
      {
        id: 3,
        title: 'System update completed',
        message: 'Veritas AI system updated to v2.1.0',
        type: 'info',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
        unread: false,
        link: '/changelog'
      }
    ];
    setNotifications(savedNotifications);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id) => {
    const updated = notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    );
    setNotifications(updated);
    localStorage.setItem('veritas-notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, unread: false }));
    setNotifications(updated);
    localStorage.setItem('veritas-notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(notif => notif.id !== id);
    setNotifications(updated);
    localStorage.setItem('veritas-notifications', JSON.stringify(updated));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
};

export default useNotifications;