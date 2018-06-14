import api from './api';

export const add = async (post) => {
  const response = await api.post('/api/calendar/add', post, {
    headers: { Authorization: sessionStorage.getItem('token') },
  });
  return response;
};
