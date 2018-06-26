import React, { Component } from "react";
import Toastr from 'toastr';
import { PropTypes } from "prop-types";

import { signin } from "../../services/authentication";

class Authentication extends Component {
    static propTypes = {
        history: PropTypes.func.isRequired
    };

    state = {
        email: "",
        password: "",
        isLoading: false,
        isError: false
    };

    componentDidMount() {
        const user = sessionStorage.getItem("user");

        if(user === "") {
            Toastr.success("Usuário criado com sucesso");
        }
    }

    doLogin = async e => {
        try {
            e.preventDefault();
            this.setState({ isLoading: true });

            const { email, password } = this.state;

            const { data } = await signin({
                email: email,
                password: password
            });

            if (data.success) {
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(data.result.user)
                );
                sessionStorage.setItem("token", `Bearer ${data.result.token}`);
                // this.props.history.push("/calendar");
            } else {
                this.setState({ isLoading: false });
                Toastr.warning(data.msg);
            }
            this.setState({ isLoading: false });
        } catch (error) {
            if(!error) {
                Toastr.error("Server Offline");
            }
            Toastr.error(error.msg);
            sessionStorage.setItem("user", "");
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <section className="section-authentication">
                <div className="bg-video">
                    <video className="bg-video__content" autoPlay muted loop>
                        <source
                            src="/assets/videos/Office-Day.mp4"
                            type="video/mp4"
                        />
                        <source
                            src="assets/videos/Office-Day.webm"
                            type="video/webm"
                        />
                        Your browser is not supported!
                    </video>
                </div>

                <form className="form" onSubmit={this.doLogin}>
                    <div className="u-center-text u-margin-bottom-small">
                        <h2 className="heading-secondary">Scheduler</h2>
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
                        <button type="submit" className="btn btn--primary btn--loading">
                            {this.state.isLoading ? (
                                <i className="fa fa-spinner fa-pulse" />
                            ) : (
                                "Entrar"
                            )}
                        </button>
                        <a className="section-authentication__link" href="/account">Criar uma nova conta</a>
                    </div>
                </form>
            </section>
        );
    }
}

export default Authentication;
