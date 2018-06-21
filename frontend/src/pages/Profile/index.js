import React, { Component } from 'react';

class Profile extends Component {
  state = {
    user: {},
    name: '',
    newPassword: '',
    oldPassword: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      this.setState({ user });
    }
  };

  save = () => {
    const { name, newPassword, oldPassword } = this.state;
  };

  render() {
    return (
      <div>
        <h1>Editar usuário</h1>
        <input
          type="text"
          value={this.state.user.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="text"
          value={this.state.user.password}
          onChange={e => this.setState({ oldPassword: e.target.value })}
        />
        <input
          type="text"
          value={this.state.user.newPassword}
          onChange={e => this.setState({ newPassword: e.target.value })}
        />
      </div>
    );
  }
}

export default Profile;
