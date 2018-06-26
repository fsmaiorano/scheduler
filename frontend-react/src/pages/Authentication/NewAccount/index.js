import React, { Component } from "react";
import Toastr from "toastr";

import { signup } from '../../../services/authentication';

class NewAccount extends Component {
    state = {
        isLoading: false
    };

    createAccount = async e => {
        try {
            e.preventDefault();
            this.setState({ isLoading: true });
            const { data } = await signup({
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            if (data.success) {
                sessionStorage.setItem("user", "");
                sessionStorage.setItem("token", `Bearer ${data.result.token}`);
                this.props.history.goBack();
            } else {
                this.setState({ error: data.msg });
            }
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
            Toastr.error(error.msg);
        }
    };

    render() {
        return (
            <section className="section-new-account">
                <form className="form" onSubmit={this.createAccount}>
                    <div className="u-center-text u-margin-bottom-small">
                        <h2 className="heading-secondary">Novo usuário</h2>
                    </div>
                    <div className="form__group center">
                        <input
                            id="name"
                            type="name"
                            className="form__input"
                            placeholder="Nome"
                            required
                            autoComplete="off"
                            onChange={e =>
                                this.setState({ name: e.target.value })
                            }
                        />
                        <label htmlFor="name" className="form__label">
                            Nome
                        </label>
                    </div>
                    <div className="form__group center">
                        <input
                            id="username"
                            type="username"
                            className="form__input"
                            placeholder="Nome de usuário"
                            required
                            autoComplete="off"
                            onChange={e =>
                                this.setState({ username: e.target.value })
                            }
                        />
                        <label htmlFor="username" className="form__label">
                            Nome de usuário
                        </label>
                    </div>
                    <div className="form__group center">
                        <input
                            id="email"
                            type="email"
                            className="form__input"
                            placeholder="E-mail"
                            required
                            autoComplete="off"
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                        />
                        <label htmlFor="email" className="form__label">
                            E-mail
                        </label>
                    </div>
                    <div className="form__group center">
                        <input
                            id="password"
                            type="text"
                            className="form__input"
                            placeholder="Senha"
                            required
                            autoComplete="off"
                            onChange={e =>
                                this.setState({ password: e.target.value })
                            }
                        />
                        <label htmlFor="password" className="form__label">
                            Senha
                        </label>
                    </div>
                    <div className="form__group u-float-right">
                        <button
                            type="submit"
                            className="btn btn--primary btn--loading"
                        >
                            {this.state.isLoading ? (
                                <i className="fa fa-spinner fa-pulse" />
                            ) : (
                                "Criar"
                            )}
                        </button>
                        <a className="section-new-account__link" href="/">
                            cancelar
                        </a>
                    </div>
                </form>
            </section>
        );
    }
}

export default NewAccount;
