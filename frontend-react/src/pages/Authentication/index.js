import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { signin } from "../../services/authentication"

class Authentication extends Component {
    static propTypes = {
        history: PropTypes.func.isRequired
    };

    state = {
        email: "",
        password: "",
        validations: {
            isLoading: false,
            isError: false
        }
    };

    doLogin = async e => {
        try {
            e.preventDefault();
            this.setState({ isLoading: true });

            const { email, password } = this.state;

            const { data } = await signin({
                email: email,
                passord: password
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
            }
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <section className="authentication">
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
                        <button type="submit" className="btn btn--primary">
                            Entrar
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default Authentication;
