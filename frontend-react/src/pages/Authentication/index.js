import React, { Component } from "react";

class Authentication extends Component {
    render() {
        return (
            <section className="authentication">
                <div className="bg-video">
                    <video className="bg-video__content" autoPlay muted loop>
                        <source src="/assets/videos/Office-Day.mp4" type="video/mp4" />
                        <source src="assets/videos/Office-Day.webm" type="video/webm" />
                        Your browser is not supported!
                    </video>
                </div>

                <form className="form">
                    <div className="u-center-text u-margin-bottom-small">
                        <h2 className="heading-secondary">Scheduler</h2>
                    </div>
                    <div className="form__group">
                        <input
                            id="email"
                            type="email"
                            className="form__input"
                            placeholder="E-mail"
                            required
                            autoComplete="off"
                        />
                        <label htmlFor="email" className="form__label">
                            E-mail
                        </label>
                    </div>
                    <div className="form__group">
                        <input
                            id="password"
                            type="text"
                            className="form__input"
                            placeholder="Senha"
                            required
                            autoComplete="off"
                        />
                        <label htmlFor="password" className="form__label">
                            Senha
                        </label>
                    </div>
                    <div className="form__group">
                        <button className="btn">Entrar</button>
                    </div>
                </form>
            </section>
        );
    }
}

export default Authentication;
