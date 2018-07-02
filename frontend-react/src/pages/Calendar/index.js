import React, { Component } from "react";
import ReactCalendar from "react-calendar";
import Toastr from "toastr";
import TimePicker from "react-times";

import { add, getEvents, destroy, shareEvent } from "../../services/calendar";

import "../../../node_modules/react-times/css/material/default.css";
import "../../../node_modules/react-times/css/classic/default.css";

import ListEvents from "./components/ListEvents/index";

class Calendar extends Component {
    state = {
        selectedDate: new Date().toLocaleDateString(),
        selectedTime: new Date().toLocaleTimeString(),
        selectedEvents: [],
        showEvents: true,
        title: "",
        location: "",
        events: []
    };

    componentDidMount() {
        this.getEvents();
    }

    onChangeDate = date => {
        const formatedDate = date.toLocaleDateString();

        if (!this.state.showEvents) {
            this.setState({ showEvents: true });
        }

        if (this.state.events.length > 0) {
            const events = this.state.events.filter(
                ev => ev.date === formatedDate
            );
            this.setState({ selectedEvents: events });
        }

        this.setState({ selectedDate: formatedDate });
    };

    getEvents = async () => {
        const response = await getEvents();
        if (response.data.success) {
            this.setEvents(response.data.result);
        }
    };

    setEvents = events => {
        this.setState({ events });
    };

    addEvent = async e => {
        e.preventDefault();
        this.setState({ isLoading: true });
        const { title, location, selectedDate, selectedTime } = this.state;

        const newEvent = {
            title,
            location,
            date: selectedDate,
            hour: selectedTime.substring(0, 5)
        };

        const response = await add(newEvent);

        if (response.data.success) {
            const { events, selectedEvents } = this.state;
            events.push(response.data.result);
            selectedEvents.push(response.data.result);
            this.setState({
                events,
                selectedEvents,
                title: "",
                location: ""
            });
            Toastr.success("Evento adicionado com sucesso");
            this.setState({ isLoading: false });
        } else {
            Toastr.error(response.data.msg);
            this.setState({ isLoading: false });
        }
    };

    destroyEvent = async event => {
        const response = await destroy(event._id);
        if (!response.data.success) {
            this.setState({ error: response.data.msg });
        } else {
            const { events, selectedEvents } = this.state;
            this.setState({
                events: events.filter(ev => ev._id !== event._id),
                selectedEvents: selectedEvents.filter(
                    ev => ev._id !== event._id
                )
            });
        }
    };

    shareEvent = async event => {
        const share = {
            event: event,
            email: "fsmaiorano@gmail.com"
        };

        const response = await shareEvent(share);
        console.log(response);
    };

    onTimeChange(options) {
        this.setState({ selectedTime: `${options.hour}:${options.minute}` });
    }

    render() {
        return (
            <section className="section-calendar">
                <header className="header">
                    <nav className="header__nav">
                        <div className="header__box">
                            <a href="/profile" class="">
                                User
                            </a>
                        </div>
                    </nav>
                </header>
                <div className="calendar">
                    <ReactCalendar
                        onChange={this.onChangeDate}
                        value={this.state.date}
                        minDate={new Date()}
                    />
                </div>
                {!this.state.showEvents ? (
                    <div className="timepicker">
                        <TimePicker
                            time={this.state.selectedTime}
                            theme="classic"
                            onTimeChange={this.onTimeChange.bind(this)}
                        />
                    </div>
                ) : (
                    <div />
                )}

                <div className="actionHandler">
                    <button
                        className="btn"
                        onClick={() =>
                            this.setState({
                                showEvents: !this.state.showEvents
                            })
                        }
                    >
                        {this.state.showEvents ? "Novo evento" : "Cancelar"}
                    </button>
                </div>

                {this.state.showEvents ? (
                    <div className="events">
                        {this.state.selectedEvents.length > 0 ? (
                            <ListEvents
                                events={this.state.selectedEvents}
                                destroy={this.destroyEvent}
                                share={this.shareEvent}
                            />
                        ) : null}
                    </div>
                ) : (
                    <form
                        className="form u-margin-top-medium"
                        onSubmit={this.addEvent}
                    >
                        <div className="form__group center">
                            <input
                                id="title"
                                type="text"
                                className="form__input"
                                placeholder="Título"
                                required
                                value={this.state.title}
                                autoComplete="off"
                                onChange={e =>
                                    this.setState({ title: e.target.value })
                                }
                            />
                            <label htmlFor="title" className="form__label">
                                Título
                            </label>
                        </div>
                        <div className="form__group center">
                            <input
                                id="location"
                                type="text"
                                className="form__input"
                                placeholder="Localização"
                                required
                                value={this.state.location}
                                autoComplete="off"
                                onChange={e =>
                                    this.setState({ location: e.target.value })
                                }
                            />
                            <label htmlFor="location" className="form__label">
                                Location
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn--primary u-float-right"
                        >
                            {this.state.isLoading ? (
                                <i className="fa fa-spinner fa-pulse" />
                            ) : (
                                "Cadastrar"
                            )}
                        </button>
                    </form>
                )}
            </section>
        );
    }
}

export default Calendar;
