import React, { Component } from 'react';
import { Container } from './styles';
import { signin } from './../../services/authentication';

class Authentication extends Component {
  state = {
    email: '',
    password: '',
  };

  doLogin = async (e) => {
    // const x = await api.get('/api/signin', {
    //   email: this.state.email,
    //   password: this.state.password,
    // });

    try {
      e.preventDefault();
      const { data } = await signin({
        email: this.state.email,
        password: this.state.password,
      });

      if (data.success) {
        this.props.history.goBack();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
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
        <a href="/account">Criar uma conta</a>
      </Container>
    );
  }
}

export default Authentication;
