import api from './api';

export const add = async (post) => {
  const response = await api.post('/api/calendar/add', post, {
    headers: { Authorization: sessionStorage.getItem('token') },
  });
  return response;
};

export const getEvents = async () => {
  const response = await api.get('/api/calendar/getEvents', {
    headers: { Authorization: sessionStorage.getItem('token') },
  });
  return response;
};
