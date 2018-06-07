import api from './api';

export async function signin(post) {
  console.log(post);
  const response = await api.post('/api/signin', post);
  return response;
}

export async function signup(post) {
  console.log(post);
  const response = api.post('/api/signup', post);

  //   const response = api.post('/api/signup', post, {
  //     headers: { Authorization: '' },
  //   });

  return response;
}
