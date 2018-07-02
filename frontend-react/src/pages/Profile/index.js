import React, { Component } from "react";
import { updateUser } from "../../services/profile";

class Profile extends Component {
    state = {
        user: {},
        name: "",
        newPassword: "",
        oldPassword: "",
        isLoading: false,
        showEvents: true
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        let user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        if (user) {
            this.setState({ user, name: user.name });
        }
    };

    save = async e => {
        try {
            e.preventDefault();
            const { name, newPassword, oldPassword, user } = this.state;

            this.setState({ isLoading: true });
            const response = await updateUser({
                email: user.email,
                name,
                oldPassword,
                newPassword
            });

            if (response.data.success) {
                this.setState({ isLoading: false });
                user.name = this.state.name;
                sessionStorage.setItem("user", JSON.stringify(user));
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
            <section className="section-profile">
                <header className="header">
                    <nav className="header__nav">
                        <div className="header__box">
                            <a href="/calendar">Voltar</a>
                        </div>
                    </nav>
                </header>

                <form
                    className="form"
                    onSubmit={this.save}
                >
                    <div className="form__group center">
                        <input
                            id="name"
                            type="text"
                            className="form__input"
                            placeholder="Nome"
                            required
                            value={this.state.name}
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
                            id="oldPassword"
                            type="text"
                            className="form__input"
                            placeholder="Senha antiga"
                            required
                            value={this.state.oldPassword}
                            autoComplete="off"
                            onChange={e =>
                                this.setState({ oldPassword: e.target.value })
                            }
                        />
                        <label htmlFor="oldPassword" className="form__label">
                            Senha antiga
                        </label>
                    </div>

                    <div className="form__group center">
                        <input
                            id="newPassword"
                            type="text"
                            className="form__input"
                            placeholder="Nova senha"
                            required
                            value={this.state.newPassword}
                            autoComplete="off"
                            onChange={e =>
                                this.setState({ newPassword: e.target.value })
                            }
                        />
                        <label htmlFor="newPassword" className="form__label">
                            Nova senha
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn--primary u-float-right"
                    >
                        {this.state.isLoading ? (
                            <i className="fa fa-spinner fa-pulse" />
                        ) : (
                            "Atualizar"
                        )}
                    </button>
                </form>
            </section>
        );
    }
}

export default Profile;
