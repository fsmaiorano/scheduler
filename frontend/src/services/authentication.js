import api from './api';

export const signin = async (post) => {
  const response = await api.post('/api/signin', post);
  return response;
};

export const signup = async (post) => {
  const response = await api.post('/api/signup', post);
  return response;
};
