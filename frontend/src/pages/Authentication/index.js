import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Container } from './styles';
import { signin } from './../../services/authentication';

class Authentication extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  doLogin = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isLoading: true });
      const { data } = await signin({
        email: this.state.email,
        password: this.state.password,
      });

      if (data.success) {
        sessionStorage.setItem('user', data.result.user);
        sessionStorage.setItem('token', `Bearer ${data.result.token}`);
        this.props.history.push('/calendar');
      } else {
        // TODO - show error
        console.log('error');
      }
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      // TODO - show error
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
          <button type="submit">
            {this.state.isLoading ? <i className="fa fa-spinner fa-pulse" /> : 'Entrar'}
          </button>
        </form>
        <a href="/account">Criar uma conta</a>
      </Container>
    );
  }
}

export default Authentication;
