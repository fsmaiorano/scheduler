import React, { Component } from 'react';
import { signup } from './../../../../services/authentication';
import { Container } from './styles';

class NewAccount extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    email: '',
  };

  createAccount = async (e) => {
    try {
      e.preventDefault();
      const { data } = await signup({
        name: this.state.name,
        username: this.state.username,
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
        <h1>Create Account</h1>
        <form onSubmit={this.createAccount}>
          <input
            type="text"
            placeholder="Nome"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nome de Usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
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
          <button type="submit">Cadastrar</button>
        </form>
        <a href="/">Voltar</a>
      </Container>
    );
  }
}

export default NewAccount;
