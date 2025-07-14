import axios from './axios';

export const fetchNotifications = () => axios.get('/notifications');
export const markAsRead = (id) => axios.patch(`/notifications/${id}/read`);
export const deleteNotification = (id) => axios.delete(`/notifications/${id}`);
