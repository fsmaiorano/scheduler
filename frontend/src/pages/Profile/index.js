import React, { Component } from 'react';

import { Container } from './styles';
import { updateUser } from '../../services/profile';

import Error from './../../components/Error';

class Profile extends Component {
  state = {
    user: {},
    name: '',
    newPassword: '',
    oldPassword: '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      this.setState({ user, name: user.name });
    }
  };

  save = async (e) => {
    try {
      e.preventDefault();
      const {
        name, newPassword, oldPassword, user,
      } = this.state;

      this.setState({ isLoading: true });
      const response = await updateUser({
        email: user.email,
        name,
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        this.setState({ isLoading: false });
        user.name = this.state.name;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.props.history.goBack();
      } else {
        this.setState({ isLoading: false, error: response.data.msg });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <Container>
        <h1>Editar usuário</h1>
        <form onSubmit={this.save}>
          <input
            type="text"
            placeholder="Nome"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Senha antiga"
            value={this.state.user.oldPassword}
            onChange={e => this.setState({ oldPassword: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nova senha"
            value={this.state.user.newPassword}
            onChange={e => this.setState({ newPassword: e.target.value })}
          />
          <button type="submit">
            {this.state.isLoading ? <i className="fa fa-spinner fa-pulse" /> : 'Salvar cadastro'}
          </button>
        </form>
        <a href="/calendar">Voltar</a>
        {this.state.error !== null ? <Error error={this.state.error} /> : null}
      </Container>
    );
  }
}

export default Profile;
