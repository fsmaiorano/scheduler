import React from 'react';

import { Container } from './styles';

const Authentication = () => (
  <Container>
    <h1>Scheduler</h1>
    <form>
      <input type="email" placeholder="Login" />
      <input type="password" placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  </Container>
);

export default Authentication;
