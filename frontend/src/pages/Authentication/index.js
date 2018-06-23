import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Container } from './styles';
import { signin } from './../../services/authentication';
import Error from './../../components/Error';

class Authentication extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    sessionStorage.removeItem('user');
  }

  doLogin = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isLoading: true });
      const response = await signin({
        email: this.state.email,
        password: this.state.password,
      });

      if (response.data.success) {
        sessionStorage.setItem('user', JSON.stringify(response.data.result.user));
        sessionStorage.setItem('token', `Bearer ${response.data.result.token}`);
        this.props.history.push('/calendar');
      } else {
        this.setState({ error: response.data.msg });
      }
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false, error: 'Try again...' });
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

        {this.state.error !== null ? <Error error={this.state.error} /> : null}
      </Container>
    );
  }
}

export default Authentication;
