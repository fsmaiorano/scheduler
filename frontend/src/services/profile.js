import api from './api';

export const updateUser = async (post) => {
  const response = await api.post('/api/update', post, {
    headers: { Authorization: sessionStorage.getItem('token') },
  });
  return response;
};
