import React, { Component } from 'react';

import { Container } from './styles';

class Authentication extends Component {
  state = {
    email: '',
    password: '',
  };

  doLogin = async () => {
    const x = this.state.email;
    const y = this.state.password;
    console.log(x);
    console.log(y);
  };

  render() {
    return (
      <Container>
        <h1>Scheduler</h1>
        <form onSubmit={this.doLogin}>
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
        </form>
      </Container>
    );
  }
}

export default Authentication;
