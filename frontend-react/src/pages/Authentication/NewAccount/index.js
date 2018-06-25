import React, { Component } from "react";

class NewAccount extends Component {
    state = {
        isLoading: false
    };

    createAccount = async e => {
        e.preventDefault();
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
