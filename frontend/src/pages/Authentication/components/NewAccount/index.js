import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { signup } from './../../../../services/authentication';
import { Container } from './styles';
import Error from './../../../../components/Error';

class NewAccount extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    username: '',
    password: '',
    email: '',
    isLoading: false,
    error: null,
  };

  createAccount = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isLoading: true });
      const { data } = await signup({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });
      if (data.success) {
        sessionStorage.setItem('token', `Bearer ${data.result.token}`);
        this.props.history.goBack();
      } else {
        this.setState({ error: data.msg });
      }
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false, error: 'Try again...' });
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
          <button type="submit">
            {this.state.isLoading ? <i className="fa fa-spinner fa-pulse" /> : 'Cadastrar'}
          </button>
        </form>
        <a href="/">Voltar</a>
        {this.state.error !== null ? <Error error={this.state.error} /> : null}
      </Container>
    );
  }
}

export default NewAccount;
