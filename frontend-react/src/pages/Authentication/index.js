import React, { Component } from "react";

class Authentication extends Component {
    render() {
        return (
            <section className="section-authentication">
                <form className="form">
                    <div className="u-center-text u-margin-bottom-small">
                        <h2 className="heading-secondary">Scheduler</h2>
                    </div>
                    <div class="form__group">
                        <input id="email" type="email" class="form__input" placeholder="E-mail" required autocomplete="off"/>
                        <label for="email" class="form__label">E-mail</label>
                    </div>
                     <div class="form__group">
                        <input id="password" type="text" class="form__input" placeholder="Senha" required autocomplete="off" />
                        <label for="password" class="form__label">Senha</label>
                    </div>
                </form>
            </section>
        );
    }
}

export default Authentication;
